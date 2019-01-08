import Root from '@/Component/Root';
import index from '@/Page/index';
import { lazyWithPreload } from '@/utils/preload';
import { RouteConfig } from 'react-router-config';

const createComponent = (Component) => (
  (Component.displayName || Component.name)
    ? Component
    : lazyWithPreload(() => (new Promise(resolve => Component(resolve))))
);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Root,
    routes: [
      {
        path: '/test',
        component: createComponent(index),
        exact: true,
      },
    ]
  },
];
export default routes;
