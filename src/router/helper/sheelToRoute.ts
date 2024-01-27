import { RouteRecordRaw } from "vue-router";

import type { RouterSheel } from "@/router/interface";

/** @description 路由组件 */
const routePath: Record<string, any> = {
  "@/layout": () => import("@/layout/index.vue"),
  "@/views/Hero": () => import("@/views/Hero/index.vue"),
  "@/views/Skin": () => import("@/views/Skin/index.vue"),
  "@/views/Savor": () => import("@/views/Savor/index.vue"),
  "@/views/Equip": () => import("@/views/Equip/index.vue"),
  "@/views/Epigraph": () => import("@/views/Epigraph/index.vue"),
  "@/views/SeizeTreasures": () => import("@/views/SeizeTreasures/index.vue"),
  "@/views/System/views/Data": () => import("@/views/System/views/Data/index.vue"),
};

/** @description 将路由表转换成真实路由 */
const sheelToRoute = (route: RouterSheel[], asyncRoutes: Partial<RouteRecordRaw>[]) => {
  route.forEach((item: RouterSheel, index: number) => {
    asyncRoutes[index] = {};
    for (const [key, value] of Object.entries(item)) {
      if (["title", "icon"].includes(key)) {
        Object.assign((asyncRoutes[index]["meta"] ??= {}), { [key]: value });
      } else if (key === "component") {
        asyncRoutes[index][key] = routePath[value];
      } else if (key === "children") {
        asyncRoutes[index][key] = [];
        sheelToRoute(value, asyncRoutes[index][key] as RouteRecordRaw[]);
      } else {
        const data = asyncRoutes[index] as Record<string, any>;
        data[key] = value;
      }
    }
  });
};

export { sheelToRoute };
