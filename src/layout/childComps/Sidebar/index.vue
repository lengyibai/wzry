<template>
  <div class="side-bar" :class="{ collapse: collapse }">
    <div class="game">
      <transition-group name="fade-a">
        <i class="iconfont wzry-logo" key="icon" />
        <span v-show="!collapse" key="text">王者荣耀</span>
      </transition-group>
    </div>
    <div class="side-item">
      <sideItem v-for="route in routes" :route="route" :key="route.path" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";
import { Route } from "@/router/interface";
import $bus from "@/utils/eventBus";
import routerStore from "@/store/routes";
import sideItem from "./childComp/SideItem.vue";
import { ref } from "vue";

const collapse = ref(false); //是否折叠
const options = routerStore().routes; //路由数据

$bus.on("collapse", (v) => {
  collapse.value = v as boolean;
});

const formatRoute = (a: RouteRecordRaw[]) => {
  const routes: Route[] = [];
  const fn = (b: Route[] | null | undefined, zIndex: number) => {
    const route: Route[] = [];
    if (b && b[0].path) {
      b.forEach((item) => {
        let index = zIndex;
        route.push({
          path: item.path,
          title: item.meta && item.meta.title,
          children: fn(item.children, ++index),
          meta: item.meta,
          zIndex: index,
        });
      });
      return route;
    }

    return null;
  };

  a.forEach((item) => {
    if (!item.meta) return;
    if (item?.meta?.hidden) return;
    routes.push({
      path: item.path,
      title: item.meta.title as string,
      meta: item.meta,
      children: fn(item.children as Route[], 1),
      zIndex: 1,
    });
  });

  return routes;
};

const routes = formatRoute(options); //格式化后的路由数据
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
