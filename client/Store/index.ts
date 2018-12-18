import rootReducer from '@/Reducer';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Injector from '../Service';

let middleware;

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires
  middleware = [thunk, require('redux-logger').createLogger()];
} else {
  middleware = [thunk];
}

const ssrState = typeof window === 'object' ? window.REDUX_STATE : {};

export const configureStore = (state = {}) => {
  const store = createStore(
    rootReducer,
    { ...state, ...ssrState },
    applyMiddleware(...middleware),
  );

  if (module.hot) {
    module.hot.accept('../Reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};

export default configureStore({ Injector });