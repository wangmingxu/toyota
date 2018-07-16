import React from 'react';
import { Cookies } from 'react-cookie';
import { tokenKey, idKey, wxidKey, wbidKey, wxAuthUrl } from 'constant';
import { connect } from 'react-redux';
import { toggleAuthStatus, setToken } from 'Action/global';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import store from 'Store';

const cookies = new Cookies();

export const applyLogin = async () => {
  if (window.isApp) {
    await new Promise((resolve) => { lz.ready(resolve); });
    const r1 = await lz.getSessionUser();
    if (!r1.id) {
      const p = new Promise((resolve) => { lz.on('user:login', resolve); });
      lz.gotoLogin();
      await p;
      const token = await applyLogin();
      store.dispatch(toggleAuthStatus(true));
      store.dispatch(setToken(token));
    }
    cookies.set(idKey, r1.id);
    const r2 = await lz.getToken({ needRefresh: true });
    if (r2.status === 'success') {
      cookies.set(tokenKey, r2.token);
    }
  } else if (window.isWX && !cookies.get(wxidKey)) {
    window.location.href = `${wxAuthUrl}&cookie_key=${wxidKey}&redirectURL=${encodeURIComponent(window.location.href)}`;
  } else if (window.isWeiBo && !cookies.get(wbidKey)) {
    window.location.href = `${wxAuthUrl}&cookie_key=${wbidKey}&redirectURL=${encodeURIComponent(window.location.href)}`;
  }
};

const withLogin = (Wrapper) => {
  class withLoginComponent extends Wrapper {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    }
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      applyLogin();
    }
    render() {
      const { isLogin, ...otherProps } = this.props;
      return (
        isLogin ? (<Wrapper {...otherProps} />) : null
      );
    }
  }
  return connect(state => ({ isLogin: get(state, ['Global', 'isLogin']) }))(withLoginComponent);
};

export default withLogin;
