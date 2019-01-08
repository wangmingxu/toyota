import RouteWrapper from '@/Component/RouteWrapper';
import routes from '@/Route';
import { ActivityIndicator } from 'antd-mobile';
import React, { PureComponent, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';

const Router: any = __ISOMORPHIC__ ? BrowserRouter : HashRouter;

const basename = process.env.BASE_PATH || '';

interface IProps {
  initialData: any;
}

class App extends PureComponent<IProps> {

  public componentDidCatch(error, info) {
    fundebug.notifyError(error, {
      metaData: {
        info,
      },
    });
  }

  public render() {
    const {initialData} = this.props;
    return (
      <Router basename={basename}>
        <Suspense fallback={<ActivityIndicator toast={true} text="Loading..." />}>
          <Route
            render={props => (
              <RouteWrapper {...props}>
                {renderRoutes(routes, {__initialData__: initialData}, { location: props.location })}
              </RouteWrapper>
            )}
          />
        </Suspense>
      </Router>
    );
  }
}

export default App;
