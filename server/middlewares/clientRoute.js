const express = require('express');

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../../client/Store';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route, Switch } from 'react-router';
import routes from '../../client/Route';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { CookiesProvider } from 'react-cookie';
import { axiosInstance } from '../../client/utils/api';
import { lzTokenKey, wxidKey } from '../../client/constant';
import { dev } from '../../config/build.config';
import { setToken, collectErrMsg } from 'Action/Global';
import { UseragentProvider, ClientDetect } from 'rc-useragent';

const router = express.Router();

router.use(async (req, res) => {
  const store = req.store || configureStore();
  const { universalCookies, useragent } = req;
  const client = new ClientDetect(useragent.source);
  axiosInstance.defaults.baseURL = `${req.protocol}://${req.hostname}:${dev.port}`;// 兼容客户端以相对路径进行请求的情况
  const axiosRequestHook = axiosInstance.interceptors.request.use(
    (config) => {
      const dataKey = config.method === 'get' ? 'params' : 'data';
      if (client.isLizhiFM) {
        const token = universalCookies.get(lzTokenKey);
        Object.assign(config, {
          [dataKey]: Object.assign(config[dataKey] || {}, { token }),
        });// 转发token
        store.dispatch(setToken(token));// 同步token回客户端
      } else if (client.isWeiXin) {
        const openid = universalCookies.get(wxidKey);
        Object.assign(config, {
          [dataKey]: Object.assign(config[dataKey] || {}, { openid }),
        });// 转发openid
        store.dispatch(setToken(openid));// 同步openid回客户端
      }
      config.headers.common['User-Agent'] = useragent.source;// 转发User-Agent
      return config;
    },
    err => Promise.reject(err),
  );

  const currentRoute = matchRoutes(routes, req.originalUrl.replace(/\?((\w+)\=(\w+)\&?)+/g, ''));
  // console.log(currentRoute);

  // 通过组件上的loadData静态方法获取数据
  const promises = currentRoute.map(({ route, match }) =>
    (route.component.loadData
      ? route.component.loadData(store.dispatch, match, req.query)
      : Promise.resolve(null)));
  // console.log(promises);

  try {
    await Promise.all(promises)
      .then(() => {
        const context = {};
        const html = ReactDOMServer.renderToString(<Provider store={store}>
          <UseragentProvider userAgent={client}>
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
          </UseragentProvider>
        </Provider>);
        // console.log(html);

        if (context.url) {
          res.writeHead(301, {
            Location: context.url,
          });
          return res.end();
        }
        return res.render('index', { root: html, store: serialize(store.getState()) });
      });
  } catch (error) {
    console.log(error);
    store.dispatch(collectErrMsg(error));// 同步错误信息到客户端
    res.render('index', { root: null, store: serialize(store.getState()) });
  } finally {
    axiosInstance.interceptors.request.eject(axiosRequestHook);
  }
});

module.exports = router;
