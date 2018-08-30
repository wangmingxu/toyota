import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../Reducer';

const logger = createLogger();

const middleware = [thunk, logger];

const initState = typeof window === 'object' ? window.REDUX_STATE : {};

export const configureStore = (state) => {
  const store = createStore(
    rootReducer,
    state || {},
    compose(applyMiddleware(...middleware)),
  );

  if (module.hot) {
    module.hot.accept('../Reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};

export default configureStore(initState);
