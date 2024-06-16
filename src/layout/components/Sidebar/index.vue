<script setup lang="ts">
import sideItem from "./components/SideItem/index.vue";
import GameLogo from "./components/GameLogo/index.vue";
import { formatSidebarRoutes } from "./helper";
import { useCollapse } from "./hooks/useCollapse";

import { RouterStore } from "@/store";
import { useHideLayout } from "@/layout/common/hooks/useHideLayout";
import { vScrollVirtualization } from "@/directives";

const $routerStore = RouterStore();

const { collapse } = useCollapse();
const { hide_all } = useHideLayout();

/** 路由数据 */
const options = $routerStore.routes;

/** 格式化后的路由数据 */
const routes = formatSidebarRoutes(options);
</script>

<template>
  <transition name="to-right" appear>
    <div v-show="!hide_all" class="side-bar" :class="{ collapse: collapse }">
      <!-- 游戏logo -->
      <GameLogo />

      <!-- 侧边栏列表 -->
      <div v-scroll-virtualization class="side-bar-list">
        <sideItem v-for="route in routes" :key="route.path" height="4rem" :route="route" />
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
