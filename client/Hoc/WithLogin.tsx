import React from 'react';
import { connect } from 'react-redux';
import * as Global from '../Action/Global';
import { bindActionCreators, Dispatch } from 'redux';
import PropTypes from 'prop-types';
import { AppStoreType } from '../Reducer';
import { checkLogin, applyLogin } from 'utils/auth';

interface WithLoginProps {
  isLogin: boolean;
  toggleAuthStatus: Function;
  setToken: Function;
}

/**
 *
 * @param {*} force 如果未登录是否强制跳转登录页面
 */
const WithLogin = (force= true) => (Wrapped: React.ComponentClass) => {
  class WithLoginComponent extends (Wrapped as React.ComponentClass<WithLoginProps>) {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    };
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      const status = await checkLogin();
      if (status) {
        this.props.toggleAuthStatus(true);
      } else if (force) {
        await applyLogin();
        this.props.toggleAuthStatus(true);
      }
    }
    render() {
      const { isLogin } = this.props;
      return ((!isLogin && force) ? null : <Wrapped {...this.props} />);
    }
  }
  return connect(
    (state: AppStoreType) => ({ isLogin: state.Global.isLogin }),
    (dispatch: Dispatch) => bindActionCreators(Global, dispatch),
  )(WithLoginComponent);
};

export default WithLogin;
