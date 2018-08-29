import React from 'react';
import { connect } from 'react-redux';
import * as Global from 'Action/Global';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { checkLogin, applyLogin } from 'utils/auth';

/**
 *
 * @param {*} forceLogin 如果未登录是否强制跳转登录
 */
const WithLogin = (forceLogin = true) => (Wrapper) => {
  class WithLoginComponent extends Wrapper {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    }
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      const status = await checkLogin();
      if (status) {
        this.props.toggleAuthStatus(true);
      } else if (forceLogin) {
        await applyLogin();
        this.props.toggleAuthStatus(true);
      }
    }
    render() {
      const { isLogin } = this.props;
      return ((!isLogin && forceLogin) ? null : <Wrapper {...this.props} />);
    }
  }
  return connect(
    state => ({ isLogin: get(state, ['Global', 'isLogin']) }),
    dispatch => bindActionCreators(Global, dispatch),
  )(WithLoginComponent);
};

export default WithLogin;
