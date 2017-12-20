import React from 'react';
import Bundle from '../Component/Bundle'; // bundle模型用来异步加载组件

import Index from '../Page/index';

// components load their module for initial visit
// 这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
// 如果传入的就是组件的话就直接返回,兼容服务端渲染
const createComponent = Component =>
  (Component.name
    ? Component
    : props => (
      <Bundle load={Component}>
        {LoadedComponent => <LoadedComponent {...props} />}
      </Bundle>
    ));

const routes = [
  {
    path: '/',
    component: createComponent(Index),
    exact: true,
  },
];
export default routes;
