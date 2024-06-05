<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useCollapse } from "../../hooks/useCollapse";

import SideItem from "./index.vue";
import type { RouteFormat } from "./interface";

import { vMouseTip } from "@/directives";
import { usePlayAudio } from "@/hooks";

interface Props {
  route: any;
}

const $props = defineProps<Props>();

const $router = useRouter();
const $route = useRoute();

const { playAudio } = usePlayAudio();
const { collapse, setCollapse } = useCollapse();

const menuItemRef = ref<HTMLElement>();

/** 用于父级菜单专属 */
const show = ref(false);
/** 父级菜单专属用于生成子菜单 */
const routes = reactive<RouteFormat[]>([]);

watch(
  () => $route.path,
  () => {
    show.value = $route.path.includes($props.route.path);

    //如果父级处于展开状态，并且有子路由，但没有生成子菜单，则生成子菜单
    if (show.value && $props.route.children && routes.length === 0) {
      routes.push(...$props.route.children);
    } /* 当点击了其他父菜单的子菜单，则移除当前子菜单 */ else if (!show.value) {
      routes.length = 0;
    }
  },
  {
    immediate: true,
  },
);

/** @description 点击侧边栏菜单 */
const handleClickSide = () => {
  show.value = !show.value;

  //如果当前组件没有子路由，则直接跳转
  if (!$props.route.children) {
    $router.push($props.route.path);

    //如果低于6400px，则折叠侧边栏
    if (window.innerWidth < 640) {
      setCollapse(true);
    }
    return;
  } /* 如果父级菜单已经展开，则生成子菜单 */ else if (show.value) {
    routes.push(...$props.route.children);
  } /* 否则移除子菜单 */ else {
    routes.length = 0;
  }

  playAudio();
};
</script>

<template>
  <div v-if="route" class="menu" :class="{ collapse: collapse }">
    <div
      ref="menuItemRef"
      v-mouse-tip="{
        text: '菜单：' + route.title,
      }"
      class="menu-item"
      :style="`padding-left: ${0.5 * $props.route.zIndex}em !important;`"
      :class="{
        active: route.path === $route.path,
      }"
      @click="handleClickSide"
    >
      <!-- 图标 -->
      <i class="iconfont" :class="route.meta.icon" />

      <!-- 文字 -->
      <span class="name">{{ $t(route.title) }}</span>

      <!-- 下拉箭头 -->
      <div v-if="route.children" class="arrow" :class="{ 'arrow-active': show }"></div>
    </div>

    <!-- 二级菜单 -->
    <template v-if="route.children">
      <transition-group name="menu-list" appear>
        <SideItem
          v-for="(r, i) in routes"
          :key="r.path"
          :route="r"
          :style="{ transitionDelay: (routes.length - i) * 0.05 + 's' }"
        />
      </transition-group>
    </template>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
