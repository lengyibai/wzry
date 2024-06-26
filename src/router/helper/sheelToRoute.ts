import type { RouteRecordRaw } from "vue-router";

import type { RouterSheel } from "@/router/interface";

/** @description 路由组件 */
const routePath: Record<string, any> = {
  "@/layout": () => import("@/layout/index.vue"),
  "@/views/Hero": () => import("@/views/Hero/index.vue"),
  "@/views/Skin": () => import("@/views/Skin/index.vue"),
  "@/views/Savor": () => import("@/views/Savor/index.vue"),
  "@/views/Equip": () => import("@/views/Equip/index.vue"),
  "@/views/Epigraph": () => import("@/views/Epigraph/index.vue"),
  "@/views/Knapsack": () => import("@/views/Knapsack/index.vue"),
  "@/views/Yibao": () => import("@/views/Yibao/index.vue"),
  "@/views/Lottery/Hero": () => import("@/views/Lottery/Hero/index.vue"),
  "@/views/Lottery/Skin": () => import("@/views/Lottery/Skin/index.vue"),
  "@/views/Shop/Crystal/King": () => import("@/views/Shop/Crystal/King/index.vue"),
  "@/views/Shop/Crystal/Honor": () => import("@/views/Shop/Crystal/Honor/index.vue"),
  "@/views/Shop/Debris/Hero": () => import("@/views/Shop/Debris/Hero/index.vue"),
  "@/views/Shop/Debris/Skin": () => import("@/views/Shop/Debris/Skin/index.vue"),
  "@/views/Shop/Prop": () => import("@/views/Shop/Prop/index.vue"),
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
