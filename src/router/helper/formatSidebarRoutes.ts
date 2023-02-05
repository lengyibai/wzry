import { RouteRecordRaw } from "vue-router";

import { Route } from "../interface";

/** @description 将Vue路由格式化，用于生成侧边栏 */
const formatSidebarRoutes = (rawRoutes: RouteRecordRaw[]) => {
  const formattedRoutes: Route[] = []; //格式化后的路由

  /**
   * @description
   * @param childRoutes 当前递归的子路由数组
   * @param zIndex 当前路由的层级，用于设置子菜单左边距
   */
  const formatChildren = (childRoutes: Route[] | null | undefined, zIndex: number) => {
    const formattedChildRoutes: Route[] = []; //子路由

    //判断是否存在子路由，否则返回 null
    if (childRoutes && childRoutes[0].path) {
      childRoutes.forEach((item) => {
        let index = zIndex;

        //将格式化后的子路由进行存储
        formattedChildRoutes.push({
          path: item.path,
          title: item.meta && item.meta.title,
          children: formatChildren(item.children, ++index),
          meta: item.meta,
          zIndex: index,
        });
      });
      return formattedChildRoutes;
    }
    return null;
  };

  rawRoutes.forEach((item) => {
    //如果不存在 meta 或者存在 hidden，意味着不需要展示在侧边栏
    if (!item.meta || item?.meta?.hidden) return;
    formattedRoutes.push({
      path: item.path,
      title: item.meta.title as string,
      meta: item.meta,
      children: formatChildren(item.children as Route[], 1),
      zIndex: 1,
    });
  });
  return formattedRoutes;
};

export default formatSidebarRoutes;
