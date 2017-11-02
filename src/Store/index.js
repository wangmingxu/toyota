import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import reducers from '../Reducer';

const logger = createLogger({
  stateTransformer: state => state.toJS(),
});

export const rootReducer = combineReducers({
  ...reducers,
});

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    Immutable.fromJS(initialState) || Immutable.Map(),
    compose(applyMiddleware(thunk, logger)),
  );
  if (module.hot) {
    module.hot.accept('../Reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
}
