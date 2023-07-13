import { createRouteMap } from './create-route-map';
export function createMatcher(routes) {
  const { pathMap } = createRouteMap(routes);
  // Object.entries(pathMap).forEach(([path, record]) => {
  //   console.log(path, record);
  // });
  const match = path => {
    if (pathMap[path]) {
      return pathMap[path];
    }
    return null;
  };
  //! 官方 已废弃：使用 router.addRoute() 代替。
  const addRoutes = routes => {
    createRouteMap(routes, pathMap);
  };
  //! 添加一条新路由规则。
  //! 如果该路由规则有 name，并且已经存在一个与之相同的名字，则会覆盖它
  const addRoute = route => {
    createRouteMap([route], pathMap);
  };
  return {
    match,
    addRoutes,
    addRoute
  };
}
