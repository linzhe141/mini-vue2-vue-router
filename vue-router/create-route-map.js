export function createRouteMap(routes) {
  const pathMap = {};
  routes.forEach((route) => addRouteRecord(route, pathMap));
  return { pathMap };
}

function addRouteRecord(route, pathMap, parent) {
  const { path, name } = route;
  let recordPath = "";
  const matched = [];
  if (parent) {
    recordPath = parent.path === "/" ? "/" + path : parent.path + "/" + path;
    matched.push(parent.component);
  } else {
    recordPath = path;
  }
  matched.push(route.component);
  const record = {
    path: recordPath,
    name,
    component: route.component,
    matched,
  };
  if (!pathMap[record.path]) {
    pathMap[record.path] = record;
  }
  if (Array.isArray(route.children)) {
    route.children.forEach((childRoute) =>
      addRouteRecord(childRoute, pathMap, route)
    );
  }
}
