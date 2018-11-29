import { combineReducers } from 'redux';
import Global, { IGlobalState } from './Global';
import Injector from './Injector';

export interface IApplicationState {
  Global: IGlobalState;
  Injector: any;
}

const rootReducer = combineReducers<IApplicationState>({
  Global,
  Injector
});

export default rootReducer;
