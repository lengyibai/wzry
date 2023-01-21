<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";

import sideItem from "./childComp/SideItem.vue"; //子菜单

import { Route } from "@/router/interface";
import routerStore from "@/store/routes";
import otherStore from "@/store/other";

const $otherStore = otherStore();
const $routerStore = routerStore();

const options = $routerStore.routes; //路由数据

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

<template>
  <div class="side-bar" :class="{ collapse: $otherStore.collapse }">
    <!-- 游戏logo -->
    <div class="game">
      <transition-group name="fade-a">
        <i key="icon" class="iconfont wzry-logo" />
        <span v-show="!$otherStore.collapse" key="text">王者荣耀</span>
      </transition-group>
    </div>

    <!-- 侧边栏列表 -->
    <div class="side-item">
      <sideItem v-for="route in routes" :key="route.path" :route="route" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
