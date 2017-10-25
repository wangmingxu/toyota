import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../Reducer/Index';

// 创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
const store = createStore(
  combineReducers(reducer),
  compose(applyMiddleware(thunk, createLogger())),
);

export default store;
