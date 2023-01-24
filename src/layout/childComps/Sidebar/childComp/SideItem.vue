<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import SideItem from "./SideItem.vue"; //调用自身

import { Route } from "@/router/interface";
import switchStore from "@/store/switch";
import otherStore from "@/store/collapse";

interface RouteFormat {
  path: string; //路由路径
  title: string; //路由标题
  meta: { title: string }; //路由元素
  children: RouteFormat[] | null; //子路由
  zIndex: number; //层级
}

interface Props {
  route: any;
}
const props = defineProps<Props>();

const $router = useRouter();
const $route = useRoute();
const $otherStore = otherStore();
const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接
const textStyle = `padding-left: ${1 * props.route.zIndex}em !important;`;

const show = ref(false);
const routes = reactive<RouteFormat[]>([]);

show.value = $route.path.includes(props.route.path);

if (show.value && props.route.children) routes.push(...props.route.children);

const fn = () => {
  show.value = !show.value;
  if (!props.route.children) {
    $router.push(props.route.path);
    return;
  } else if (show.value) {
    routes.push(...props.route.children);
  } else {
    routes.length = 0;
  }
  $switchStore.$clickAudio();
};

const sidebarActive = (routes: Route) => {
  if (routes.children && routes.children.length) {
    routes.children.forEach((item) => {
      if (item.path === $route.path) {
        fn();
        sidebarActive(item);
      }
    });
  }
};

sidebarActive(props.route);
</script>

<template>
  <div v-if="route" class="menu" :class="{ collapse: $otherStore.collapse }">
    <button
      class="menu-item menu-list"
      :style="textStyle"
      :class="{
        active: route.path === $route.path,
      }"
      @click="fn"
    >
      <!-- 图标 -->
      <i class="iconfont" :class="route.meta.icon" />

      <!-- 文字 -->
      <span>{{ route.title }}</span>

      <!-- 下拉箭头 -->
      <img
        v-if="route.children"
        class="arrow"
        :class="{ 'arrow-active': show }"
        :src="IMGBED + '/image/arrow.png'"
        alt=""
        @dragstart.prevent
      />
    </button>

    <!-- 二级菜单 -->
    <div v-if="route.children">
      <transition-group name="menu-list" appear>
        <SideItem
          v-for="(r, i) in routes"
          :key="r.path"
          :route="r"
          :style="{ transitionDelay: (routes.length - i) * 0.05 + 's' }"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
