const express = require('express');

import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../../client/Store/index.ts';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route, Switch } from 'react-router';
import routes from '../../client/Route/index.tsx';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';

const router = express.Router();

router.use((req, res) => {
  const currentRoute = matchRoutes(routes, req.originalUrl.replace(/\?((\w+)\=(\w+)\&?)+/g, ''));
  // console.log(currentRoute);

  const store = req.store || configureStore();

  // 通过组件上的loadData静态方法获取数据
  const promises = currentRoute.map(({ route, match }) =>
    (route.component.loadData
      ? route.component.loadData(store.dispatch, match, req.query)
      : Promise.resolve(null)));
  // console.log(promises);

  Promise
    .all(promises)
    .then(() => {
      const { errMsg } = store.getState().Global;
      if (errMsg && errMsg.length > 0) {
        return Promise.reject(new Error(JSON.stringify(errMsg)));
      }
      const context = {};

      const html = ReactDOMServer.renderToString(<Provider store={store}>
        <CookiesProvider cookies={req.universalCookies}>
          <StaticRouter location={req.originalUrl} context={context}>
            <Route
              render={() => (
                <div className="routerWrapper">
                  <Switch>
                    {renderRoutes(routes)}
                  </Switch>
                </div>
              )}
            />
          </StaticRouter>
        </CookiesProvider>
      </Provider>);
      // console.log(html);

      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        });
        return res.end();
      }
      return res.render('index', { root: html, store: serialize(store.getState()) });
    })
    .catch((error) => {
      console.log(error);
      res.render('index', { root: null, store: serialize(store.getState()) });
    })
    .finally(() => {
      axios.interceptors.request.eject(req.axiosRequestHook);
      axios.interceptors.response.eject(req.axiosResponseHook);
    });
});

module.exports = router;
