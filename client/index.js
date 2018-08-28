import './common';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import store from './Store';
import { CookiesProvider } from 'react-cookie';
import { UseragentProvider } from 'rc-useragent';

const render = (Component) => {
  const rcRender = __isomorphic__ ? ReactDOM.hydrate : ReactDOM.render // eslint-disable-line
  rcRender(
    <AppContainer>
      <Provider store={store}>
        <UseragentProvider>
          <CookiesProvider>
            <Component />
          </CookiesProvider>
        </UseragentProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};
render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
