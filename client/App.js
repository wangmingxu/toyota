import React, { Suspense, PureComponent } from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import routes from '@/Route';
import RouteWrapper from '@/Component/RouteWrapper';
import { renderRoutes } from 'react-router-config';
import { ActivityIndicator } from 'antd-mobile';
import ServiceContext from '@/Context/ServiceContext';

const Router = __ISOMORPHIC__ ? BrowserRouter : HashRouter;

const basename = process.env.BASE_PATH || '';

class App extends PureComponent {
  static contextType = ServiceContext;

  componentDidCatch(error, info) {
    fundebug.notifyError(error, {
      metaData: {
        info: info,
      },
    });
  }

  render() {
    const { initialData } = this.props;
    return (
      <Router basename={basename}>
        <Suspense fallback={<ActivityIndicator toast text="Loading..." />}>
          <Route
            render={props => (
              <RouteWrapper {...props}>
                {renderRoutes(
                  routes,
                  { __initialData__: initialData },
                  { location: props.location }
                )}
              </RouteWrapper>
            )}
          />
        </Suspense>
      </Router>
    );
  }
}

export default App;
