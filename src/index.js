import 'babel-polyfill';

const fundebug = require('fundebug-javascript');

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
// import App from './App';
import App from './Route'; // 路由配置
import store from './Store'; // 引入Store

fundebug.apikey = '294a8593da2207207c592dcd7364e84e913b366ca32bd592002dfc068c568f58';
fundebug.releasestage = process.env.NODE_ENV;
// console.log(process.env.NODE_ENV);

const render = (Component) => {
  ReactDOM.render(<AppContainer>
    <Provider store={store}>
      <Component />
    </Provider>
  </AppContainer>, document.getElementById('app'));
};
render(App);

if (module.hot) {
  module.hot.accept('./Route', () => {
    render(App);
  });
}
