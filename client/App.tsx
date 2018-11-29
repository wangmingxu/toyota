import ShareService from '@lizhife/lz-market-service/package/ShareService';
import * as GlobalActions from 'Action/Global';
import { ActivityIndicator } from 'antd-mobile';
import RouteWrapper from 'Component/RouteWrapper';
import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { IApplicationState } from 'Reducer';
import { bindActionCreators, compose } from 'redux';
import routes from 'Route';

const Router = __ISOMORPHIC__ ? BrowserRouter : HashRouter;

const basename = process.env.BASE_PATH || '';

interface IProps {
  checkAuthStatus: () => boolean;
  shareServ: ShareService;
}

class App extends React.Component<IProps> {
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
          <Route render={props => <RouteWrapper {...props}>{renderRoutes(routes)}</RouteWrapper>} />
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
