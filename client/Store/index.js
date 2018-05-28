import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from 'Reducer';

const logger = createLogger();

export const rootReducer = combineReducers({
  ...reducers,
});

const middleware = [thunk].concat(process.env.NODE_ENV === 'development' ? [logger] : []);

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
