import React from 'react';
import {createComponent} from 'Component/Bundle'; // bundle模型用来异步加载组件

import Index from 'Page/index';

const routes = [
  {
    path: '/',
    component: createComponent(Index),
    exact: true,
  },
];
export default routes;
