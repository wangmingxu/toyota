import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import routes from '../Route';
import RouteWrapper from './RouteWrapper';
import { renderRoutes } from 'react-router-config';
import { baseUrlPath } from '../constant';

const Router = location.hash.length > 0 ? HashRouter : BrowserRouter;

const basename = location.hash.length > 0 ? '' : baseUrlPath;

// 路由配置
const RouterView = () => (
  <Router basename={basename}>
    <Route
      render={props => (
        <RouteWrapper {...props}>
          {renderRoutes(routes)}
        </RouteWrapper>
      )}
    />
  </Router>
);

export default RouterView;
