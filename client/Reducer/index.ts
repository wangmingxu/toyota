import { combineReducers } from 'redux';
import Global, { GlobalStateType } from './Global';

export interface ApplicationState {
  Global: GlobalStateType;
}

const rootReducer = combineReducers({
  Global,
});

export default rootReducer;
