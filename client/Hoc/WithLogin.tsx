import React from 'react';
import { connect } from 'react-redux';
import * as Global from '../Action/Global';
import { bindActionCreators, Dispatch } from 'redux';
import PropTypes from 'prop-types';
import { AppStoreType } from '../Reducer';
// import { preventDefault } from 'utils/domHelper';

interface WithLoginProps {
  isLogin: boolean;
  checkAuthStatus: Function;
  login: Function;
  dispatch: Dispatch;
}

// interface WithLoginBtnProps {
//   isLogin: boolean;
//   login: Function;
//   render: () => React.ReactElement<any>;
// }

/**
 *
 * @param {*} force 如果未登录是否强制跳转登录页面
 * @param {*} cb 登录完之后的回调
 */
const WithLogin = (force= true, cb?) => (Wrapped: React.ComponentClass) => {
  class WithLoginComponent extends (Wrapped as React.ComponentClass<WithLoginProps>) {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    };
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      const isLogin = await this.props.checkAuthStatus();
      if (!isLogin) {
        if (force) {
          await this.props.login();
          cb && cb(this.props.dispatch);
        } else {
          lz.on('user:login', () => {
            cb && cb(this.props.dispatch);
          });
        }
      } else {
        cb && cb(this.props.dispatch);
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

// @connect(
//   (state: AppStoreType) => ({ isLogin: state.Global.isLogin }),
//   (dispatch: Dispatch) => bindActionCreators(Global, dispatch),
// )
// class WithLoginBtn extends React.Component<WithLoginBtnProps> {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { isLogin, login } = this.props;
//     return (<React.Fragment>
//       {
//         isLogin ?
//           this.props.render() :
//           React.cloneElement(this.props.render(), { onClick: preventDefault(login) })
//       }
//     </React.Fragment>);
//   }
// }

export default WithLogin;

// export { WithLoginBtn };
