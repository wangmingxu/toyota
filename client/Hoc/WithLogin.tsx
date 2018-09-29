import React from 'react';
import { connect } from 'Hoc/MyConnect';
import * as Global from '../Action/Global';
import { bindActionCreators, Dispatch } from 'redux';

type GlobalActions = typeof Global;

interface IStateProps {
    isLogin: boolean;
}

interface IDispatchProps extends GlobalActions {
    dispatch: Dispatch;
}

interface IProps extends IStateProps, IDispatchProps {}

/**
 *
 * @param {*} force 如果未登录是否强制跳转登录页面
 * @param {*} cb 登录完之后的回调
 */
const WithLogin = (force = true, cb?) => (Wrapped: React.ComponentClass) => {
    class WithLoginComponent extends React.Component<IProps> {
        constructor(props) {
            super(props);
        }
        async componentDidMount() {
            const isLogin = await this.props.checkAuthStatus();
            if (!isLogin) {
                if (force) {
                    await this.props.login();
                } else {
                    await new Promise(resolve => {
                        lz.on('user:login', resolve);
                    });
                }
            }
            cb && cb(this.props.dispatch);
        }
        render() {
            const { isLogin } = this.props;
            return !isLogin && force ? null : <Wrapped {...this.props} />;
        }
    }
    return connect<IStateProps, IDispatchProps>(
        state => ({ isLogin: state.Global.isLogin }),
        dispatch => ({ ...bindActionCreators(Global, dispatch), dispatch })
    )(WithLoginComponent);
};

export default WithLogin;
