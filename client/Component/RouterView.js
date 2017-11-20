import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import routes from '../Route';
import RouteWrapper from './RouteWrapper';
import { renderRoutes } from 'react-router-config';

const Router =
  !__isomorphic__ && location.hash.length > 0 ? HashRouter : BrowserRouter; // eslint-disable-line

// 路由配置
const RouterView = () => (
  <Router>
    <Route
      render={({ location }) => (
        <RouteWrapper location={location}>
          {renderRoutes(routes, { location })}
        </RouteWrapper>
      )}
    />
  </Router>
);

export default RouterView;
