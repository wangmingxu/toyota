import './common';
import React from 'react';
import ReactDOM from 'react-dom';
import { preloadRoute } from '@/utils/preload';
import routes from '@/Route';
import App from './App';
import ServiceContext from '@/Context/ServiceContext';
import injector from '@/Service';

const render = __ISOMORPHIC__ ? ReactDOM.hydrate : ReactDOM.render;

const root = document.getElementById('app');

const dataEle = document.getElementById('server-app-state');

// eslint-disable-next-line no-eval
const initialData = dataEle ? eval('(' + dataEle.textContent + ')') : [];

const bootstrap = AppComponent => {
  render(
    <ServiceContext.Provider value={injector}>
      <AppComponent initialData={initialData} />
    </ServiceContext.Provider>,
    root
  );
};

if (__ISOMORPHIC__) {
  preloadRoute(window.location.pathname, routes).then(() => {
    bootstrap(App);
  });
} else {
  bootstrap(App);
}

if (module.hot) {
  module.hot.accept(['./Route', './App'], () => {
    ReactDOM.unmountComponentAtNode(root);
    bootstrap(App);
  });
}
