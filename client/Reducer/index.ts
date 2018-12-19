import { IApplicationState } from '@/types';
import { combineReducers } from 'redux';
import Global from './Global';
import Injector from './Injector';

const rootReducer = combineReducers<IApplicationState>({
  Global,
  Injector
});

export default rootReducer;
