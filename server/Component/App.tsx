import ServiceContext from '@/Context/ServiceContext';
import routes from '@/Route';
import { ReflectiveInjector } from 'injection-js';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { Route, StaticRouter, StaticRouterContext } from 'react-router';
import { renderRoutes } from 'react-router-config';

export interface IProps {
    injector: ReflectiveInjector;
    originalUrl: string;
    context: StaticRouterContext;
    initialData: any;
}

const basename = process.env.BASE_PATH || '';

class App extends React.Component<IProps> {
  public render() {
    const {injector, originalUrl, context, initialData} = this.props;
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
