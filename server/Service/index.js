import { createInjector } from '@/Service';
import { APP_USERAGENT_TOKEN } from '@common-service/ClientDetectService';
import { COOKIE_STR_TOKEN } from '@common-service/CookieService';
import { HTTP_REQUEST_INTERCEPTORS } from '@common-service/HttpService';
import { LocationService, URL_INJECT_TOKEN } from '@common-service/LocationService';
import RelPathInterceptor from '@common-service/RelpathReqInterceptor';
import UseragentInterceptor from '@common-service/WithUAReqInterceptor';

const createInjectorWithReq = (req) => {
  const {
    headers: { cookie },
    protocol,
    originalUrl,
  } = req;
  // Todo:如果有Nginx代理层,url可能会有异常
  const host = req.get('host');
  const useragent = req.get('User-Agent');
  const hostname = /localhost/.test(host) ? host.replace('localhost', '127.0.0.1') : host;
  const reqUrl = `${protocol}://${hostname}${originalUrl}`;
  const injector = createInjector([
    { provide: COOKIE_STR_TOKEN, useValue: cookie },
    { provide: APP_USERAGENT_TOKEN, useValue: useragent },
    { provide: URL_INJECT_TOKEN, useValue: reqUrl },
    LocationService,
    {
      provide: HTTP_REQUEST_INTERCEPTORS,
      useClass: UseragentInterceptor,
      multi: true,
    },
    {
      provide: HTTP_REQUEST_INTERCEPTORS,
      useClass: RelPathInterceptor,
      multi: true,
    },
  ]);
  return injector;
};

export default createInjectorWithReq;
