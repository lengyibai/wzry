import { getPathsNames } from "../helper/getSheelPath";

/** @description 静态路由 */
export const staticRouter = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    meta: {
      title: "登录",
      noVerify: true,
      hidden: true
    },
    component: () => import("@/views/Base/Login/index.vue")
  }
];

/** @description 错误页面路由 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/Base/Error/NotPermissions.vue"),
    meta: {
      title: "403",
      noVerify: true
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/Base/Error/NotFind.vue"),
    meta: {
      title: "404",
      noVerify: true
    }
  },
  {
    path: "/400",
    name: "400",
    component: () => import("@/views/Base/Error/NotVersion.vue"),
    meta: {
      title: "400",
      noVerify: true
    }
  }
];

/** @description 静态路由path组 */
export const static_paths = getPathsNames([...staticRouter, ...errorRouter])[0];
