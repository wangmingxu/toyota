import React, { Component } from 'react';
import lz from '@lizhife/lz-jssdk';
import RouteView from './Component/RouterView';
import { withCookies } from 'react-cookie';
import { tokenKey, idKey, wxidKey, wbidKey, wxAuthUrl } from './constant';
import { connect } from 'react-redux';
import * as global from './Action/global';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import axios from 'axios';

@withCookies
@connect(
  state => ({ isLogin: get(state, ['Global', 'isLogin']) }),
  dispatch => bindActionCreators(global, dispatch),
)
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.configReady();
  }
  configReady() {
    const _t = this;
    const { cookies } = _t.props;
    if (window.isApp) {
      lz.ready(() => {
        lz.getSessionUser().then((r1) => {
          if (!r1.id) {
            lz.on('user:login', () => {
              window.location.reload();
            });

            lz.gotoLogin();
          } else {
            cookies.set(idKey, r1.id);
            lz.getToken({
              needRefresh: true,
            }).then((r3) => {
              if (r3.status === 'success') {
                cookies.set(tokenKey, r3.token);
                _t.props.toggleAuthStatus(true);
                axios.interceptors.request.use(config =>
                  Object.assign(config, {
                    params: Object.assign(config.params || {}, { token: r3.token }),
                  }));
              }
            });
          }
        });
      });
    } else if (window.isWX && !cookies.get(wxidKey)) {
      window.location.href = `${wxAuthUrl}&cookie_key=${wxidKey}&redirectURL=${encodeURIComponent(window.location.href)}`;
    } else if (window.isWeiBo && !cookies.get(wbidKey)) {
      window.location.href = `${wxAuthUrl}&cookie_key=${wbidKey}&redirectURL=${encodeURIComponent(window.location.href)}`;
    } else {
      _t.props.toggleAuthStatus(true);
    }
  }
  render() {
    return this.props.isLogin ? <RouteView /> : null;
  }
}

export default App;
