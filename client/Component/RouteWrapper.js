import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { wxConfig } from '../config';
import { wxJsConfUrl } from '../constant';

/**
 * 1.添加路由过渡动画
 * 2.在路由跳转时执行某些操作，比如微信sdk授权
 */
class RouteWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    if (window.isWX) {
      wxConfig(wxJsConfUrl); // spa跳转之后重新获取wx-sdk授权
    }
  }
  render() {
    const { location, history } = this.props;
    const animateCls = history.action === 'PUSH' ? 'left' : 'right';
    return (
      <ReactCSSTransitionGroup
        transitionName={animateCls}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        component={React.Fragment}
      >
        <div key={location.pathname} className="routerWrapper">
          {React.cloneElement(this.props.children, { location })}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default RouteWrapper;
