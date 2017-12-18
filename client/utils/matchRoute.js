import { matchRoutes } from 'react-router-config';
import routes from '../Route';
import last from 'lodash/last';
import first from 'lodash/first';

export function getRouteParams(location) {
  const currentRoute = matchRoutes(routes, location.pathname);
  const { params } = last(currentRoute).match;
  return params;
}

export function getCurrentRoutePath(location) {
  const currentRoute = matchRoutes(routes, location.pathname);
  return last(currentRoute).match.url;
}

export function getBaseRoutePath(location) {
  const currentRoute = matchRoutes(routes, location.pathname);
  return first(currentRoute).match.url;
}
