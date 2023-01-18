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
      <i class="iconfont" :class="route.meta.icon" />
      <span>{{ route.title }}</span>

      <img
        v-if="route.children"
        class="arrow"
        :class="{ 'arrow-active': show }"
        :src="IMGBED + '/image/arrow.png'"
        alt=""
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
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import SideItem from "./SideItem.vue"; //调用自身

import { Route } from "@/router/interface";
import otherStore from "@/store/other";

interface RouteFormat {
  path: string;
  title: string;
  meta: { title: string };
  children: RouteFormat[] | null;
  zIndex: number;
}

interface Props {
  route: any;
}
const props = withDefaults(defineProps<Props>(), {
  route: () => {
    return {};
  },
});

const $router = useRouter();
const $route = useRoute();
const $otherStore = otherStore();

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
  } else if (show.value) {
    routes.push(...props.route.children);
  } else {
    routes.length = 0;
  }
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
<style scoped lang="less">
@import url("./index.less");
</style>
