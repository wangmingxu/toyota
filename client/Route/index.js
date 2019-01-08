import Root from '@/Component/Root';
import { lazyWithPreload } from '@/utils/preload';
import index from '@/Page/index';

const createComponent = Component =>
  Component.displayName || Component.name
    ? Component
    : lazyWithPreload(() => new Promise(resolve => Component(resolve)));

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/test',
        component: createComponent(index),
        exact: true,
      },
    ],
  },
];
export default routes;
