import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// bundle模型用来异步加载组件
import Bundle from '../Component/Bundle';

// 导入各种组件
// // 同步加载
import Home from '../Page/App'; // 首页组件
import NotFoundPage from '../Page/NotFoundPage'; // NotFoundPage

// 异步加载
/*eslint-disable*/
import loadFrom from '../Page/From'; // 表单组件
import loadComment from '../Page/Comment'; // 评论组件
import loadLike from '../Page/Like'; // 状态 Like组件
import loadTodoList from '../Page/TodoList'; // TodoList组件
/* eslint-enable */

const Router = __isomorphic__ ? BrowserRouter : HashRouter;// eslint-disable-line

// components load their module for initial visit
// 这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
// 如果传入的就是组件的话就直接返回,兼容服务端渲染
const createComponent = Component => (
  Component.name ?
    Component :
    props => (<Bundle load={Component}>
      {LoadedComponent => <LoadedComponent {...props} />}
    </Bundle>)
);

const routes = [
  {
    path: '/',
    component: createComponent(Home),
    exact: true,
  },
  {
    path: '/home',
    component: createComponent(Home),
    exact: true,
  },
  {
    path: '/from',
    component: createComponent(loadFrom),
    exact: true,
  },
  {
    path: '/comment',
    component: createComponent(loadComment),
    exact: true,
  },
  {
    path: '/like',
    component: createComponent(loadLike),
    exact: true,
  },
  {
    path: '/list',
    component: createComponent(loadTodoList),
    exact: true,
  },
  {
    component: createComponent(NotFoundPage),
  },
];

// 路由配置
const RouteConfig = () => (
  <Router>
    <Route render={({ location }) => (
      <ReactCSSTransitionGroup
        transitionName="left"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div key={location.key} style={{ height: '100%', width: '100%', position: 'absolute' }}>
          <Switch location={location}>
            {routes.map((route, i) => (
              <Route {...route} key={i} />
            ))}
          </Switch>
        </div>
      </ReactCSSTransitionGroup>
    )}
    />
  </Router>
);

// 导出
export default RouteConfig;
export {
  routes,
};
