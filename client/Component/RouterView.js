import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import routes from '../Route';
import RouteWrapper from './RouteWrapper';
import { renderRoutes } from 'react-router-config';
import { baseUrlPath } from '../constant';

const Router = location.hash.length > 0 ? HashRouter : BrowserRouter;

// 路由配置
const RouterView = () => (
  <Router basename={baseUrlPath}>
    <Route
      render={props => (
        <RouteWrapper {...props}>
          <Switch {...props}>
            {renderRoutes(routes, { ...props })}
          </Switch>
        </RouteWrapper>
      )}
    />
  </Router>
);

export default RouterView;
