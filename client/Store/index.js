import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'Reducer';
import Injector from '../Service';

export const rootReducer = combineReducers(reducers);

let middleware;

if (process.env.NODE_ENV === 'development') {
  middleware = [thunk, require('redux-logger').createLogger()];
} else {
  middleware = [thunk];
}

const SSRState = typeof window === 'object' ? window.REDUX_STATE : {};

export const configureStore = (state = {}) => {
  const store = createStore(
    rootReducer,
    { ...state, ...SSRState },
    compose(applyMiddleware(...middleware))
  );

  if (module.hot) {
    module.hot.accept('../Reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};

export default configureStore({ Injector });
