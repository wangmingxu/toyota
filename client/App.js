import React, { Suspense } from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import routes from 'Route';
import RouteWrapper from 'Component/RouteWrapper';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';
import { ActivityIndicator } from 'antd-mobile';
import ServiceContext from './Context/ServiceContext';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as GlobalActions from 'Action/Global';

const Router = __ISOMORPHIC__ ? BrowserRouter : HashRouter;
const basename = process.env.BASE_PATH || '';

@hot(module)
@connect(
  state => ({ shareServ: state.Injector.get('shareServ') }),
  dispatch => bindActionCreators(GlobalActions, dispatch)
)
class App extends React.Component {
  static contextType = ServiceContext;
  componentDidMount() {
    this.props.checkAuthStatus();
    this.props.shareServ.configShareInfo();
  }
  componentDidCatch(error, info) {
    fundebug.notifyError(error, {
      metaData: {
        info: info,
      },
    });
  }
  render() {
    return (
      <Router basename={basename}>
        <Suspense fallback={<ActivityIndicator toast text="Loading..." />}>
          <Route
            render={props => (
              <RouteWrapper {...props}>{renderRoutes(routes)}</RouteWrapper>
            )}
          />
        </Suspense>
      </Router>
    );
  }
}

export default App;
