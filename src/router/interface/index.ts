/** @description 用于生成侧边栏的路由 */
export interface Route {
  path?: string;
  title?: string;
  meta?: { title?: string };
  children?: Route[] | null;
  zIndex?: number;
}

/** @description 自定义路由 */
export interface Routes {
  path?: string;
  name?: string;
  redirect?: string;
  meta?: {
    title?: string;
    icon?: string;
    hidden?: boolean;
    noVerify?: boolean;
  };
  leftHidden?: boolean;
  component?: typeof import("*.vue");
  children?: Routes[];
  [propName: string]: any;
}

/** @description 路由初始表 */
export interface RouterSheel {
  title?: string;
  icon?: string;
  path?: string;
  name?: string;
  redirect?: string;
  leftHidden?: Boolean;
  component?: string;
  children?: RouterSheel[];
}
