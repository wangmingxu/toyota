import { combineReducers } from 'redux';
import Global, { GlobalStateType } from './Global';

export interface AppStoreType {
  Global: GlobalStateType;
}

const rootReducer = combineReducers({
  Global,
});

export default rootReducer;
