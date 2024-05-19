<script setup lang="ts">
import { onUnmounted } from "vue";

import sideItem from "./components/SideItem/index.vue";
import GameLogo from "./components/GameLogo/index.vue";
import { formatSidebarRoutes } from "./helper";

import { RouterStore } from "@/store";
import { useCollapse } from "@/hooks";
import { useHideLayout } from "@/layout/common/hooks/useHideLayout";

const $routerStore = RouterStore();

const { collapse, setCollapse } = useCollapse();
const { hide_all } = useHideLayout();

/** 路由数据 */
const options = $routerStore.routes;

/** 格式化后的路由数据 */
const routes = formatSidebarRoutes(options);

/* 监听浏览器尺寸设置侧边栏状态 */
const sidebarStatus = () => {
  setCollapse(window.innerWidth < 960);
};

window.addEventListener("resize", sidebarStatus);

onUnmounted(() => {
  window.removeEventListener("resize", sidebarStatus);
});
</script>

<template>
  <transition name="to-right" appear>
    <div v-show="!hide_all" class="side-bar" :class="{ collapse: collapse }">
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
