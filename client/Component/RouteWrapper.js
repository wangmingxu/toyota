import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { wxConfig } from '../config';
import { connect } from 'react-redux';
import { global } from '../Action';
import { bindActionCreators } from 'redux';
import { wxJsConfUrl } from '../constant';
import get from 'lodash/get';

/**
 * 1.添加路由过渡动画
 * 2.在路由跳转时执行某些操作，比如微信sdk授权
 */
@connect(
  state => ({
    animateCls: get(state, ['Global', 'animateCls']),
  }),
  dispatch => bindActionCreators(global, dispatch),
)
class RouteWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    // console.log(location.href);
    if (window.isWX) {
      wxConfig(wxJsConfUrl); // spa跳转之后重新获取wx-sdk授权
    }
    this.props.routeAnimate('fade'); // 跳转完之后重置路由动画
  }
  render() {
    const { location, animateCls } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName={animateCls}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <div key={location.key} className="routerWrapper">
          {this.props.children}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default RouteWrapper;
