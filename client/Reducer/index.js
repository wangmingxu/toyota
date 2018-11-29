import { combineReducers } from 'redux';
import Global from './Global';
import Injector from './Injector';
import Demo from './Demo'; // 临时demo

const rootReducer = combineReducers({
  Global,
  Injector,
  Demo, // 临时demo
});

export default rootReducer;
