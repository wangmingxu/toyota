import { ReflectiveInjector } from 'injection-js';
import { combineReducers } from 'redux';
import Global, { IGlobalState } from './Global';
import Injector from './Injector';

export interface IApplicationState {
  Global: IGlobalState;
  Injector: ReflectiveInjector;
}

const rootReducer = combineReducers<IApplicationState>({
  Global,
  Injector
});

export default rootReducer;
