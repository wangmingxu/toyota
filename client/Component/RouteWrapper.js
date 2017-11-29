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
  componentDidMount() {
    const observer = new MutationObserver(((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation.type);
        if (mutation.type === 'childList') {
          this.scaleHeight();
        }
      });
    }));
    observer.observe(this.wrapperEle, {
      childList: true,
    });
  }
  componentDidUpdate() {
    if (window.isWX) {
      wxConfig(wxJsConfUrl); // spa跳转之后重新获取wx-sdk授权
    }
  }
  scaleHeight() {
    const _wrapperEle = this.wrapperEle;
    const pageEle = _wrapperEle.firstChild;
    const wrapperHeight = _wrapperEle.clientHeight;
    const pageHeight = pageEle.clientHeight;
    const offsetHeight = Math.abs(pageHeight - wrapperHeight);
    if (offsetHeight > 150) return;
    const scale = wrapperHeight / pageHeight;
    pageEle.style['transform-origin'] = '0 0';
    pageEle.style.transform = `scaleY(${scale})`;
  }
  render() {
    const { location, history } = this.props;
    const animateCls = history.action === 'PUSH' ? 'left' : 'right';
    return (
      <ReactCSSTransitionGroup
        transitionName={animateCls}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <div key={location.pathname} className="routerWrapper" ref={(c) => { this.wrapperEle = c; }}>
          {this.props.children}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default RouteWrapper;
