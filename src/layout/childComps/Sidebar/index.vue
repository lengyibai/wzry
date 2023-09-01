<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";

import sideItem from "./childComp/SideItem/index.vue"; //子菜单
import GameLogo from "./childComp/GameLogo/index.vue"; //游戏logo

import formatSidebarRoutes from "@/router/helper/formatSidebarRoutes";
import { Util } from "@/utils";
import { CollapseStore, RouterStore } from "@/store";

const $collapseStore = CollapseStore();
const $routerStore = RouterStore();

const top = ref(0); //滑块坐标
const show_slider = ref(false); //显示滑块

const options = $routerStore.routes; //路由数据

const routes = formatSidebarRoutes(options); //格式化后的路由数据

/* 设置坐标 */
const onCoord = (v: number) => {
  if (v === 0) {
    show_slider.value = false;
  } else {
    top.value = v;
    show_slider.value = true;
  }
};

Util.$Bus.on("resize", () => {
  $collapseStore.setCollapse(window.innerWidth < 1380);
});

onBeforeUnmount(() => {
  Util.$Bus.off("resize");
});
</script>

<template>
  <div class="side-bar" :class="{ collapse: $collapseStore.collapse }">
    <!-- 游戏logo -->
    <GameLogo />

    <!-- 侧边栏列表 -->
    <div class="side-item">
      <sideItem v-for="route in routes" :key="route.path" :route="route" :coord="top" @coord="onCoord" />
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
