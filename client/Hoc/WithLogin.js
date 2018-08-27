import React from 'react';
import { connect } from 'react-redux';
import * as Global from 'Action/Global';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { checkLogin, applyLogin } from 'utils/auth';

const WithLogin = (Wrapper) => {
  class WithLoginComponent extends Wrapper {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    }
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      const isLogin = await checkLogin();
      !isLogin && await applyLogin();
      this.props.toggleAuthStatus(true);
    }
    render() {
      const { isLogin } = this.props;
      return (isLogin ? <Wrapper {...this.props} /> : null);
    }
  }
  return connect(
    state => ({ isLogin: get(state, ['Global', 'isLogin']) }),
    dispatch => bindActionCreators(Global, dispatch),
  )(WithLoginComponent);
};

export default WithLogin;
