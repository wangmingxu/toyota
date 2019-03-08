import { ReflectiveInjector } from 'injection-js';
import { ClientDetectService, APP_USERAGENT_TOKEN } from '@common-service/ClientDetectService';
import {
  HttpService,
  // HTTP_REQUEST_INTERCEPTORS,
  // HTTP_RESPONSE_INTERCEPTORS,
} from '@common-service/HttpService';
import { CookieService, COOKIE_STR_TOKEN } from '@common-service/CookieService';

export const CommonService = [
  ClientDetectService,
  HttpService,
  CookieService,
  { provide: 'cdServ', useExisting: ClientDetectService },
  { provide: 'http', useExisting: HttpService },
  { provide: 'cookieServ', useExisting: CookieService },
];

export const ClientService =
  typeof window === 'object'
    ? [
        { provide: APP_USERAGENT_TOKEN, useValue: navigator.userAgent },
        { provide: COOKIE_STR_TOKEN, useValue: document.cookie },
      ]
    : [];

const injector =
  typeof window === 'object'
    ? ReflectiveInjector.resolveAndCreate([...CommonService, ...ClientService])
    : {};

export default injector;
