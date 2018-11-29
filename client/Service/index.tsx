import 'reflect-metadata';

import AuthService from '@lizhife/lz-market-service/package/AuthService';
import {
  APP_USERAGENT_TOKEN,
  ClientDetectService,
} from '@lizhife/lz-market-service/package/ClientDetectService';
import {
  APP_CONFIG_TOKEN,
  DEFAULT_APP_CONFIG,
} from '@lizhife/lz-market-service/package/ConfigService';
import DefaultResInterceptor from '@lizhife/lz-market-service/package/DefaultResInterceptor';
import JsBridgeService from '@lizhife/lz-market-service/package/JsBridgeService';
import JWTReqInterceptor from '@lizhife/lz-market-service/package/JWTReqInterceptor';
import ShareService from '@lizhife/lz-market-service/package/ShareService';
import { COOKIE_STR_TOKEN, CookieService } from 'di-sdk/package/CookieService';
// import { ClientDetectService, APP_USERAGENT_TOKEN } from 'di-sdk/package/ClientDetectService';
import {
  HTTP_ALIAS_TOKEN,
  HTTP_REQUEST_INTERCEPTORS,
  HTTP_RESPONSE_INTERCEPTORS,
  HttpService,
} from 'di-sdk/package/HttpService';
import { Provider, ReflectiveInjector } from 'injection-js';

const defaultProvider: Provider[] = [
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

const createInjector = (provider: Provider[]) => {
  const factory = ReflectiveInjector.resolveAndCreate([...defaultProvider, ...provider]);
  return factory;
};

const injector = typeof window === 'object'
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
