<script setup lang="ts">
import sideItem from "./childComp/SideItem.vue"; //子菜单

import formatSidebarRoutes from "@/router/helper/formatSidebarRoutes";
import routerStore from "@/store/routes";
import collapseStore from "@/store/collapse";

const $collapseStore = collapseStore();
const $routerStore = routerStore();

const options = $routerStore.routes; //路由数据

const routes = formatSidebarRoutes(options); //格式化后的路由数据
</script>

<template>
  <div class="side-bar" :class="{ collapse: $collapseStore.collapse }">
    <!-- 游戏logo -->
    <div class="game">
      <transition-group name="fade-a">
        <i key="icon" class="iconfont wzry-logo" />
        <span v-show="!$collapseStore.collapse" key="text">王者荣耀</span>
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
