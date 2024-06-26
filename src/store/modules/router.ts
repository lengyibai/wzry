import { ref } from "vue";
import { defineStore } from "pinia";
import type { RouteRecordName, RouteRecordRaw } from "vue-router";

import { router } from "@/router";
import { admin, user } from "@/router/modules/routeSheel";
import type { RouterSheel } from "@/router/interface";
import { sheelToRoute } from "@/router/helper/sheelToRoute";

/** @description 路由相关 */
const RouterStore = defineStore("route", () => {
  const ExposeData = {
    /** 当前路由列表，针对侧边栏，解决通过vue-router提供的方法获取的路由列表与侧边栏要求的格式不匹配 */
    routes: ref<RouteRecordRaw[]>([]),
    /** 添加的路由name组，用于匹配并删除路由 */
    routeNames: ref<RouteRecordName[]>([]),
  };
  const { routes, routeNames } = ExposeData;

  const ExposeMethods = {
    /**
     * @description: 添加路由及存储路由侧边栏
     * @param role 用户权限，默认为用户
     */
    addRoutes(role: 0 | 1 = 1) {
      if (routes.value.length) return;
      const dynamicRouter: RouteRecordRaw[] = [];

      //根据用户权限设置路由表
      const initDynamicRouter: RouterSheel[] = role === 0 ? admin : user;

      //获取路由 name 组
      routeNames.value = initDynamicRouter.map((item) => {
        return item.name as RouteRecordName;
      });

      //将路由表转换成真实路由
      sheelToRoute(initDynamicRouter, dynamicRouter);

      //动态添加路由
      dynamicRouter.forEach((item) => {
        router.addRoute(item);
        //存储属于侧边栏的路由
        routes.value.push(item);
      });
    },

    /** @description 通过路由 name 删除路由及路由侧边栏 */
    removeRoutes() {
      routeNames.value.forEach((item) => {
        router.removeRoute(item);
      });
      routes.value = [];
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { RouterStore };
