import ServiceContext from '@/Context/ServiceContext';
import routes from '@/Route';
import injector from '@/Service';
import { preloadRoute } from '@/utils/preload';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './common';

const render = __ISOMORPHIC__ ? ReactDOM.hydrate : ReactDOM.render;

const root = document.getElementById('app');

const dataEle = document.getElementById('server-app-state');

// tslint:disable-next-line:no-eval
const initialData = dataEle ? eval('(' + dataEle!.textContent + ')') : [];

const bootstrap = (AppComponent) => {
  render(
    <ServiceContext.Provider value={injector}>
      <AppComponent initialData={initialData}/>
    </ServiceContext.Provider>,
    root,
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
  module.hot.accept(['./Route', './App'], () => {
    ReactDOM.unmountComponentAtNode(root as HTMLElement);
    bootstrap(App);
  });
}
