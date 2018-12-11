import routes from '@/Route';
import store from '@/Store/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
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
  const currentRoute = matchRoutes(routes, location.pathname)[0];
  if (Object.prototype.hasOwnProperty.call(currentRoute.route.component, 'preload')) {
    (currentRoute.route.component as any).preload().then(() => {
      bootstrap(App);
    });
  } else {
    bootstrap(App);
  }
} else {
  bootstrap(App);
}

if (module.hot) {
  module.hot.accept('./Store', () => {
    ReactDOM.unmountComponentAtNode(root as HTMLElement);
    bootstrap(App);
  });
}
