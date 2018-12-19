import { ReflectiveInjector } from 'injection-js';

export * from './service';

export interface IGlobalState {
  isLogin: boolean;
  errMsg: string[];
}

export interface IApplicationState {
  Global: IGlobalState;
  Injector: ReflectiveInjector;
}
