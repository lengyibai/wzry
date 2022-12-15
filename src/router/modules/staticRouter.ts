import getSheelPath from "../helper/getSheelPath";

/** @description: 静态路由 */
export const staticRouter = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    meta: {
      title: "登录",
      noVerify: true,
      hidden: true,
    },
    component: () => import("@/views/Base/Login/index.vue"),
  },
];

/** @description: 错误页面路由 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404",
    },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500",
    },
  },
];

/** @description: 静态路由path组 */
export const static_paths = getSheelPath([...staticRouter, ...errorRouter])[0];
