import React, { Component } from 'react';
import lz from '@lizhife/lz-jssdk';
import RouteView from './Component/RouterView';
import { Cookies } from 'react-cookie';
import { tokenKey, idKey } from './constant';
import { connect } from 'react-redux';
import { global } from './Action';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

const cookieManager = new Cookies();

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
    if (window.isApp) {
      lz.ready(() => {
        lz.getSessionUser().then((r1) => {
          if (!r1.id) {
            lz.on('user:login', () => {
              window.location.reload();
            });

            lz.gotoLogin();
          } else {
            cookieManager.set(idKey, r1.id);
            lz.getToken({
              needRefresh: true,
            }).then((r3) => {
              window.alert('r3');
              if (r3.status === 'success') {
                cookieManager.set(tokenKey, r3.token);
                // window.alert(client.getCookie(tokenKey))

                _t.props.toggleAuth(true);
              }
            });
          }
        });
      });
    } else {
      _t.props.toggleAuth(true);
    }
  }
  render() {
    return this.props.isLogin ? <RouteView /> : null;
  }
}

export default App;
