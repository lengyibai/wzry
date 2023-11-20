<script setup lang="ts">
import { ref, onUnmounted } from "vue";

import sideItem from "./childComp/SideItem/index.vue";
import GameLogo from "./childComp/GameLogo/index.vue";

import { formatSidebarRoutes } from "@/router/helper/formatSidebarRoutes";
import { CollapseStore, RouterStore } from "@/store";
import { $bus } from "@/utils";

const $collapseStore = CollapseStore();
const $routerStore = RouterStore();

/** 滑块坐标 */
const top = ref(0);
/** 显示滑块 */
const show_slider = ref(false);

/** 路由数据 */
const options = $routerStore.routes;

/** 格式化后的路由数据 */
const routes = formatSidebarRoutes(options);

/* 设置坐标 */
const onCoord = (v: number) => {
  if (v === 0) {
    show_slider.value = false;
  } else {
    top.value = v;
    show_slider.value = true;
  }
};

$bus.on("resize", () => {
  $collapseStore.setCollapse(window.innerWidth < 960);
});

onUnmounted(() => {
  $bus.off("resize");
});
</script>

<template>
  <div class="side-bar" :class="{ collapse: $collapseStore.collapse }">
    <!-- 游戏logo -->
    <GameLogo />

    <!-- 侧边栏列表 -->
    <div class="side-item">
      <sideItem
        v-for="route in routes"
        :key="route.path"
        :route="route"
        :coord="top"
        @coord="onCoord"
      />
    </div>

    <!-- 滑块 -->
    <div
      class="slider"
      :style="{
        top: top + 'px',
        opacity: show_slider ? 1 : 0,
      }"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
