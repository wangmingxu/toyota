import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from '../Route';
import RouteWrapper from './RouteWrapper';
import { renderRoutes } from 'react-router-config';
import { baseUrlPath } from '../constant';

// 路由配置
const RouterView = () => (
  <Router basename={baseUrlPath}>
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
