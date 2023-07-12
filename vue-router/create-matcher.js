import { createRouteMap } from "./create-route-map";
export function createMatcher(routes) {
  const { pathMap } = createRouteMap(routes);
  // Object.entries(pathMap).forEach(([path, record]) => {
  //   console.log(path, record);
  // });
  function match(path) {
    if (pathMap[path]) {
      return pathMap[path];
    }
    return null;
  }
  return { match };
}
