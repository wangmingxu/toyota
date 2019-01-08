import ServiceContext from '@/Context/ServiceContext';
import routes from '@/Route';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { Route, StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';

const basename = process.env.BASE_PATH || '';

class App extends React.Component {
  render() {
    const { injector, originalUrl, context, initialData } = this.props;
    return (
      <ServiceContext.Provider value={injector}>
        <StaticRouter location={originalUrl} context={context} basename={basename}>
          <Route render={() => renderRoutes(routes, { __initialData__: cloneDeep(initialData) })} />
        </StaticRouter>
      </ServiceContext.Provider>
    );
  }
}

export default App;
