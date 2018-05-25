import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import routes from 'Route';
import RouteWrapper from 'Component/RouteWrapper';
import { renderRoutes } from 'react-router-config';
import { baseUrlPath } from './constant';
import withLogin from 'Hoc/withLogin';
import {withCookies} from 'react-cookie';

const Router = location.hash.length > 0 ? HashRouter : BrowserRouter;

const basename = location.hash.length > 0 ? '' : baseUrlPath;

@(withLogin as any)
class App extends React.Component<{},{}> {
  render() {
    return (<Router basename={basename}>
      <Route
        render={props => (
          <RouteWrapper {...props}>
            {renderRoutes(routes)}
          </RouteWrapper>
        )}
      />
    </Router>);
  }
}

export default App;
