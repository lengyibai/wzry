/** @description: 递归获取路由path组 */
const getPathsNames = (routes: any[]) => {
  const paths: string[] = [];
  const names: string[] = [];
  const fn = (routes: any[]) => {
    routes.forEach((item) => {
      item.path && paths.push(item.path);
      item.name && names.push(item.name);
      item.children && fn(item.children);
    });
  };
  fn(routes);
  return [paths, names];
};

export default getPathsNames;
