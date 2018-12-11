import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@/Reducer';
import Injector from '@/Service';

let middleware;

if (process.env.NODE_ENV === 'development') {
  middleware = [thunk, require('redux-logger').createLogger()];
} else {
  middleware = [thunk];
}

const SSRState = typeof window === 'object' ? window.REDUX_STATE : {};

export const configureStore = (state = {}) => {
  const store = createStore(rootReducer, { ...state, ...SSRState }, applyMiddleware(...middleware));

  if (module.hot) {
    module.hot.accept('../Reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};

export default configureStore({ Injector });
