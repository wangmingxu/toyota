import './common';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
// import App from './App';
import App from './Route'; // 路由配置
import configureStore from './Store';
import { CookiesProvider } from 'react-cookie';

const store = configureStore(window.REDUX_STATE);

const render = (Component) => {
  ReactDOM.hydrate(<AppContainer>
    <Provider store={store}>
      <CookiesProvider>
        <Component />
      </CookiesProvider>
    </Provider>
  </AppContainer>, document.getElementById('app'));
};
render(App);

if (module.hot) {
  module.hot.accept('./Route', () => {
    render(App);
  });
}
