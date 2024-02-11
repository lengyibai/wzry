/** @description 生成子菜单 */
export interface RouteFormat {
  /** 路由路径 */
  path: string;
  /** 路由标题 */
  title: string;
  /** 路由元素 */
  meta: { title: string };
  /** 子路由 */
  children: RouteFormat[] | null;
  /** 层级 */
  zIndex: number;
}
