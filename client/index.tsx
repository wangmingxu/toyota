import './common';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import store from 'Store/index';
import { CookiesProvider } from 'react-cookie';
import { UseragentProvider } from 'rc-useragent';

const render = (Component) => {
  const rcRender = __isomorphic__ ? ReactDOM.hydrate : ReactDOM.render;
  rcRender(
    <AppContainer>
      <UseragentProvider>
        <CookiesProvider>
          <Provider store={store}>
              <Component />
          </Provider>
        </CookiesProvider>
      </UseragentProvider>
    </AppContainer>,
    document.getElementById('app') as HTMLElement,
  );
};
render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
