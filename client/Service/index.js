import 'reflect-metadata';
import { ReflectiveInjector } from 'injection-js';
// import { ClientDetectService, APP_USERAGENT_TOKEN } from 'di-sdk/package/ClientDetectService';
import {
  HttpService,
  HTTP_REQUEST_INTERCEPTORS,
  HTTP_RESPONSE_INTERCEPTORS,
  HTTP_ALIAS_TOKEN,
} from 'di-sdk/package/HttpService';
import { CookieService, COOKIE_STR_TOKEN } from 'di-sdk/package/CookieService';
import {
  ClientDetectService,
  APP_USERAGENT_TOKEN,
} from '@lizhife/lz-market-service/package/ClientDetectService';
import DefaultResInterceptor from '@lizhife/lz-market-service/package/DefaultResInterceptor';
import AuthService from '@lizhife/lz-market-service/package/AuthService';
import JWTReqInterceptor from '@lizhife/lz-market-service/package/JWTReqInterceptor';
import {
  APP_CONFIG_TOKEN,
  DEFAULT_APP_CONFIG,
} from '@lizhife/lz-market-service/package/ConfigService';
import ShareService from '@lizhife/lz-market-service/package/ShareService';
import JsBridgeService from '@lizhife/lz-market-service/package/JsBridgeService';

const defaultProvider = [
  ClientDetectService,
  HttpService,
  CookieService,
  AuthService,
  { provide: 'cdServ', useExisting: ClientDetectService },
  { provide: '$http', useExisting: HttpService },
  { provide: 'cookieServ', useExisting: CookieService },
  { provide: 'AuthServ', useExisting: AuthService },
  { provide: APP_CONFIG_TOKEN, useValue: DEFAULT_APP_CONFIG },
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
    useValue: {
      getCity: 'GET /hangzhou/singleDog/getCity',
    },
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
        JsBridgeService,
        { provide: 'jsbServ', useExisting: JsBridgeService },
        ShareService,
        { provide: 'shareServ', useExisting: ShareService },
      ])
    : null;

export { createInjector };

export default injector;
