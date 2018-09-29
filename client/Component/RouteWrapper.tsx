import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { wxConfig } from '../config';
import { Location, History } from 'history';
import { withUserAgent, ReactUserAgentProps } from 'rc-useragent';

interface RouteWrapperPropType extends ReactUserAgentProps {
  location: Location;
  history: History;
  children: React.ReactElement<Location>;
}

/**
 * 1.添加路由过渡动画
 * 2.在路由跳转时执行某些操作，比如微信sdk授权
 * 3.恢复滚动条到最顶部
 */
@(withUserAgent as any)
 class RouteWrapper extends React.Component<RouteWrapperPropType> {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      if (this.props.ua.isWeiXin) {
        wxConfig(); // spa跳转之后重新获取wx-sdk授权
      }
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
        <div key={location.pathname} className='routerWrapper'>
          {React.cloneElement(this.props.children, { location })}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default RouteWrapper;
