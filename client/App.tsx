import * as GlobalActions from '@/Action/Global';
import RouteWrapper from '@/Component/RouteWrapper';
import routes from '@/Route';
import { IApplicationState } from '@/types';
import ShareService from '@lz-service/ShareService';
import { ActivityIndicator } from 'antd-mobile';
import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';

const Router: any = __ISOMORPHIC__ ? BrowserRouter : HashRouter;

const basename = process.env.BASE_PATH || '';

interface IStateProps {
  shareServ: ShareService;
}

interface IDispatchProps {
  checkAuthStatus: () => any;
}

type IProps = IStateProps & IDispatchProps;

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

export default connect<IStateProps, IDispatchProps>(
  (state: IApplicationState) => ({ shareServ: state.Injector.get('shareServ') }),
  dispatch => bindActionCreators({
    checkAuthStatus: GlobalActions.checkAuthStatus
  }, dispatch),
)(App);
