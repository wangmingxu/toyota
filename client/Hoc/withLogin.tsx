import React from 'react';
import lz from '@lizhife/lz-jssdk';
import { withCookies,Cookies } from 'react-cookie';
import { tokenKey, idKey, wxidKey, wbidKey, wxAuthUrl } from '../constant';
import { connect } from 'react-redux';
import * as global from '../Action/global';
import { bindActionCreators,Dispatch,compose } from 'redux';
import PropTypes,{ instanceOf } from 'prop-types';
import { AppStoreType } from '../Reducer';

interface withLoginProps{
  isLogin: boolean;
  cookies: Cookies;
  toggleAuthStatus: Function;
  setToken: Function;
}

const withLogin = (Wrapped:React.ComponentClass)=>{
  class withLoginComponent extends (Wrapped as React.ComponentClass<withLoginProps>) {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
      cookies: instanceOf(Cookies).isRequired
    }
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.configReady();
    }
    async configReady() {
      const _t = this;
      const { cookies } = _t.props;
      if ((window as any).isApp) {
        await new Promise((resolve)=>{lz.ready(resolve)});
        const r1 = await lz.getSessionUser();
        if (!r1.id) {
          lz.on('user:login', () => {
            window.location.reload();
          });
          lz.gotoLogin();
        } else {
          cookies.set(idKey, r1.id);
          const r2 = await lz.getToken({needRefresh: true})
          if (r2.status === 'success') {
            cookies.set(tokenKey, r2.token);
            _t.props.toggleAuthStatus(true);
            _t.props.setToken(r2.token);
          }
        }
      } else if ((window as any).isWX && !cookies.get(wxidKey)) {
        window.location.href = `${wxAuthUrl}&cookie_key=${wxidKey}&redirectURL=${encodeURIComponent(window.location.href)}`;
      } else if ((window as any).isWeiBo && !cookies.get(wbidKey)) {
        window.location.href = `${wxAuthUrl}&cookie_key=${wbidKey}&redirectURL=${encodeURIComponent(window.location.href)}`;
      } else {
        _t.props.toggleAuthStatus(true);
      }
    }
    render() {
      const { isLogin } = this.props;
      if(isLogin){
        return super.render();
      } else {
        return null;
      }
    }
  }
  return compose(
    withCookies,
    connect(
      (state:AppStoreType) => ({ isLogin: state.Global.isLogin }),
      (dispatch: Dispatch) => bindActionCreators(global, dispatch),
    )
  )(withLoginComponent)
};

export default withLogin;