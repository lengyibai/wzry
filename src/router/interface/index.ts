export interface Route {
  path?: string;
  title?: string;
  meta?: { title?: string };
  children?: Route[] | null;
  zIndex?: number;
}

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

/** @description: 路由初始表 */
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
