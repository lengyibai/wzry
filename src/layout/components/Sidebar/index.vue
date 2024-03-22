<script setup lang="ts">
import { onUnmounted } from "vue";

import sideItem from "./components/SideItem/index.vue";
import GameLogo from "./components/GameLogo/index.vue";

import { formatSidebarRoutes } from "@/router/helper/formatSidebarRoutes";
import { CollapseStore, RouterStore } from "@/store";

const $collapseStore = CollapseStore();
const $routerStore = RouterStore();

/** 路由数据 */
const options = $routerStore.routes;

/** 格式化后的路由数据 */
const routes = formatSidebarRoutes(options);

/* 监听浏览器尺寸设置侧边栏状态 */
const sidebarStatus = () => {
  $collapseStore.setCollapse(window.innerWidth < 960);
};

window.addEventListener("resize", sidebarStatus);

onUnmounted(() => {
  window.removeEventListener("resize", sidebarStatus);
});
</script>

<template>
  <transition name="sidebar" appear>
    <div class="side-bar" :class="{ collapse: $collapseStore.collapse }">
      <!-- 游戏logo -->
      <GameLogo />

      <!-- 侧边栏列表 -->
      <div class="side-bar-list">
        <sideItem v-for="route in routes" :key="route.path" height="4rem" :route="route" />
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
