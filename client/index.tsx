import routes from '@/Route';
import store from '@/Store/index';
import { preloadRoute } from '@/utils/preload';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './common';

const render = __ISOMORPHIC__ ? ReactDOM.hydrate : ReactDOM.render;

const root = document.getElementById('app');

const bootstrap = AppComponent => {
  render(
    <Provider store={store}>
      <AppComponent />
    </Provider>,
    root
  );
};

if (__ISOMORPHIC__) {
  preloadRoute(location.pathname, routes).then(() => {
    bootstrap(App);
  });
} else {
  bootstrap(App);
}

if (module.hot) {
  module.hot.accept(['./Store', './Route'], () => {
    ReactDOM.unmountComponentAtNode(root as HTMLElement);
    bootstrap(App);
  });
}
