import { defineStore } from "pinia";
import router from "@/router";
import { admin, user, errorRoute } from "@/router/sheel";
import sheelToRoute from "@/config/sheelToRoute";
import { RouterSheel } from "@/router/interface";
import { RoutesStore } from "./interface";
import { RouteRecordName, RouteRecordRaw } from "vue-router";

export default defineStore("router", {
  state: (): RoutesStore.State => ({
    routes: [], //当前路由列表，针对侧边栏，解决通过vue-router提供的方法获取的路由列表与侧边栏要求的格式不匹配
    asyncRoutesName: [], //动态路由 name
  }),
  actions: {
    /** @description: 添加路由及存储路由侧边栏 */
    addRoutes(role: 0 | 1) {
      const dynamicRouter: RouteRecordRaw[] = [];
      //根据用户权限设置路由表
      const initDynamicRouter: RouterSheel[] = role === 0 ? [...admin, errorRoute] : [...user, errorRoute];
      //获取路由 name 组
      this.asyncRoutesName = initDynamicRouter.map((item) => {
        return item.name as RouteRecordName;
      });
      //将路由表转换成真实路由
      sheelToRoute(initDynamicRouter, dynamicRouter);
      //动态添加路由
      dynamicRouter.forEach((item) => {
        router.addRoute(item);
        this.routes.push(item); //存储属于侧边栏的路由
      });
    },

    /** @description: 通过路由 name 删除路由及路由侧边栏 */
    removeRoutes() {
      this.asyncRoutesName.forEach((item) => {
        router.removeRoute(item);
        //删除侧边栏
        this.routes.forEach((route, index) => {
          if (route.name === item) {
            this.routes.splice(index, 1);
          }
        });
      });
    },
  },
});
