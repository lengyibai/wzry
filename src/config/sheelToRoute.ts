import { RouteRecordRaw } from "vue-router";
import { RouterSheel } from "@/router/interface";

/** @description: 路由组件 */
const routePath: Record<string, any> = {
  "@/layout": () => import("@/layout/index.vue"),
  "@/views/Base/Home": () => import("@/views/Base/Home/index.vue"),
  "@/views/Hero": () => import("@/views/Hero/index.vue"),
  "@/views/Equip": () => import("@/views/Equip/index.vue"),
  "@/views/Epigraph": () => import("@/views/Epigraph/index.vue"),
  "@/views/System/childViews/Add": () => import("@/views/System/childViews/Add/index.vue"),
  "@/views/System/childViews/Edit": () => import("@/views/System/childViews/Edit/index.vue"),
  "@/views/System/childViews/Delete": () => import("@/views/System/childViews/Delete/index.vue"),
};

/** @description: 将路由表转换成真实路由 */
const sheelToRoute = (route: RouterSheel[], asyncRoutes: RouteRecordRaw[]) => {
  route.forEach((item: RouterSheel, index: number) => {
    asyncRoutes[index] = {} as RouteRecordRaw;
    for (const [key, value] of Object.entries(item)) {
      if (["title", "icon"].includes(key)) {
        asyncRoutes[index]["meta"] ??= {};
        const meta = asyncRoutes[index]["meta"] as Record<string, any>;
        meta[key] = value;
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

export default sheelToRoute;
