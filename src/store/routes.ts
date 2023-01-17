import { ref } from "vue";
import { defineStore } from "pinia";
import { RouteRecordName, RouteRecordRaw } from "vue-router";

import router from "@/router";
import { admin, user } from "@/router/modules/routeSheel";
import { RouterSheel } from "@/router/interface";
import sheelToRoute from "@/router/helper/sheelToRoute";

const routeStore = defineStore("route", () => {
  const routes = ref<RouteRecordRaw[]>([]); //当前路由列表，针对侧边栏，解决通过vue-router提供的方法获取的路由列表与侧边栏要求的格式不匹配
  const asyncRoutesName = ref<RouteRecordName[]>([]); //添加的路由name组，用于匹配并删除路由

  /** @description: 添加路由及存储路由侧边栏 */
  const addRoutes = (role: 0 | 1) => {
    if (routes.value.length) return;
    const dynamicRouter: RouteRecordRaw[] = [];
    //根据用户权限设置路由表
    const initDynamicRouter: RouterSheel[] = role === 0 ? admin : user;
    //获取路由 name 组
    asyncRoutesName.value = initDynamicRouter.map((item) => {
      return item.name as RouteRecordName;
    });
    //将路由表转换成真实路由
    sheelToRoute(initDynamicRouter, dynamicRouter);
    //动态添加路由
    dynamicRouter.forEach((item) => {
      router.addRoute(item);
      routes.value.push(item); //存储属于侧边栏的路由
    });
  };

  /** @description: 通过路由 name 删除路由及路由侧边栏 */
  const removeRoutes = () => {
    asyncRoutesName.value.forEach((item) => {
      router.removeRoute(item);
      //删除侧边栏
      routes.value.forEach((route, index) => {
        if (route.name === item) {
          routes.value.splice(index, 1);
        }
      });
    });
  };

  return {
    routes,
    asyncRoutesName,
    addRoutes,
    removeRoutes,
  };
});

export default routeStore;
export type RouteStore = ReturnType<typeof routeStore>;
