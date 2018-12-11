import 'reflect-metadata';
import { ReflectiveInjector } from 'injection-js';
// import { ClientDetectService, APP_USERAGENT_TOKEN } from '@common-service/ClientDetectService';
import {
  HttpService,
  HTTP_REQUEST_INTERCEPTORS,
  HTTP_RESPONSE_INTERCEPTORS,
  HTTP_ALIAS_TOKEN,
} from '@common-service/HttpService';
import { CookieService, COOKIE_STR_TOKEN } from '@common-service/CookieService';
import { ClientDetectService, APP_USERAGENT_TOKEN } from '@lz-service/ClientDetectService';
import DefaultResInterceptor from '@lz-service/DefaultResInterceptor';
import AuthService from '@lz-service/AuthService';
import JWTReqInterceptor from '@lz-service/JWTReqInterceptor';
import { APP_CONFIG_TOKEN } from '@lz-service/ConfigService';
import ShareService from '@lz-service/ShareService';
import JsBridgeService, { JSB_SERVICE_TOKEN } from '@lz-service/JsBridgeService';
import config from './config';
import httpAlias from './http-alias';

const defaultProvider = [
  ClientDetectService,
  HttpService,
  CookieService,
  AuthService,
  { provide: 'cdServ', useExisting: ClientDetectService },
  { provide: '$http', useExisting: HttpService },
  { provide: 'cookieServ', useExisting: CookieService },
  { provide: 'AuthServ', useExisting: AuthService },
  { provide: APP_CONFIG_TOKEN, useValue: config },
  {
    provide: HTTP_RESPONSE_INTERCEPTORS,
    useClass: DefaultResInterceptor,
    multi: true,
  },
  {
    provide: HTTP_REQUEST_INTERCEPTORS,
    useClass: JWTReqInterceptor,
    multi: true,
  },
  {
    provide: HTTP_ALIAS_TOKEN,
    useValue: httpAlias,
  },
];

const createInjector = (provider = []) => {
  const injector = ReflectiveInjector.resolveAndCreate([...defaultProvider, ...provider]);
  return injector;
};

const injector =
  typeof window === 'object'
    ? createInjector([
        { provide: APP_USERAGENT_TOKEN, useValue: navigator.userAgent },
        { provide: COOKIE_STR_TOKEN, useValue: document.cookie },
        { provide: JSB_SERVICE_TOKEN, useClass: JsBridgeService },
        { provide: 'jsbServ', useExisting: JSB_SERVICE_TOKEN },
        ShareService,
        { provide: 'shareServ', useExisting: ShareService },
      ])
    : {};

export { createInjector };

export default injector;
