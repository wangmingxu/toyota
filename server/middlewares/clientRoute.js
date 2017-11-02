const express = require('express');

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../src/Store';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route } from 'react-router';
import { routes } from '../../src/Route';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { CookiesProvider } from 'react-cookie';

const store = configureStore();

const router = express.Router();

router.use((req, res) => {
  const currentRoute = matchRoutes(routes, req.originalUrl);
  // console.log(currentRoute);

  const promises = currentRoute.map(({ route, match }) => (
    route.component.loadData
      ? route.component.loadData(store.dispatch, match)
      : Promise.resolve(null)
  ));
  // console.log(promises);

  Promise.all(promises).then(() => {
    const context = {};

    const html = ReactDOMServer.renderToString(<Provider store={store}>
      <CookiesProvider cookies={req.universalCookies}>
        <StaticRouter
          location={req.originalUrl}
          context={context}
        >
          <Route render={() => (
            <span>
              <div style={{ height: '100%', width: '100%', position: 'absolute' }}>
                {renderRoutes(routes)}
              </div>
            </span>
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
      res.end();
    } else {
      res.render('index', { root: html, store: serialize(store.getState()) });
    }
  });
});

module.exports = router;
