import { lazy } from 'react';
import { matchRoutes } from 'react-router-config';

export const preloadResource = url => {
  const isPreload = checkIsPreloaded(url);
  if (isPreload) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.getElementsByTagName('head')[0].appendChild(link);
};

const checkIsPreloaded = url => {
  return !!document.querySelector(`link[href="${url}"]`);
};

export const lazyWithPreload = factory => {
  const Component = lazy(factory);
  Component.preload = async () => {
    const mod = await factory();
    Component._result = mod.default; // unsafe code
    Component._status = 1; // unsafe code
    return mod;
  };
  return Component;
};

export const preloadRoute = async (pathname, routes) => {
  const currentRoute = matchRoutes(routes, pathname)[0];
  if (Object.prototype.hasOwnProperty.call(currentRoute.route.component, 'preload')) {
    await currentRoute.route.component.preload();
  }
};
