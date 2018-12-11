import * as GlobalActions from '@/Action/Global';
import RouteWrapper from '@/Component/RouteWrapper';
import { IApplicationState } from '@/Reducer';
import routes from '@/Route';
import ShareService from '@lz-service/ShareService';
import { ActivityIndicator } from 'antd-mobile';
import React, { PureComponent, Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';

const Router: any = __ISOMORPHIC__ ? BrowserRouter : HashRouter;

const basename = process.env.BASE_PATH || '';

interface IProps {
  checkAuthStatus: () => boolean;
  shareServ: ShareService;
}

class App extends PureComponent<IProps> {
  public componentDidMount() {
    this.props.checkAuthStatus();
    this.props.shareServ.configShareInfo();
  }

  public componentDidCatch(error, info) {
    fundebug.notifyError(error, {
      metaData: {
        info,
      },
    });
  }

  public render() {
    return (
      <Router basename={basename}>
        <Suspense fallback={<ActivityIndicator toast={true} text="Loading..." />}>
          <Route
            render={props => (
              <RouteWrapper {...props}>
                {renderRoutes(routes, null, { location: props.location })}
              </RouteWrapper>
            )}
          />
        </Suspense>
      </Router>
    );
  }
}

export default compose(
  hot(module),
  connect(
    (state: IApplicationState) => ({ shareServ: state.Injector.get('shareServ') }),
    dispatch => bindActionCreators(GlobalActions, dispatch),
  ),
)(App);
