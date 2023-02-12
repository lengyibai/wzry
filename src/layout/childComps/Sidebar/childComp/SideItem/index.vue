<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

import SideItem from "./index.vue"; //调用自身

//import { Route } from "@/router/interface";
import switchStore from "@/store/switch";
import collapseStore from "@/store/collapse";

interface RouteFormat {
  path: string; //路由路径
  title: string; //路由标题
  meta: { title: string }; //路由元素
  children: RouteFormat[] | null; //子路由
  zIndex: number; //层级
}

interface Props {
  route: any;
  coord: number;
}
const props = defineProps<Props>();

interface Emits {
  (e: "coord", v: number): void;
}
const emit = defineEmits<Emits>();

const $router = useRouter();
const $route = useRoute();
const $collapseStore = collapseStore();
const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接
const textStyle = `padding-left: ${0.5 * props.route.zIndex}em !important;`; //设置子菜单与上级菜单水平间隔

const menuItem = ref();
const show = ref(false); //用于父级菜单专属
const routes = reactive<RouteFormat[]>([]); //父级菜单专属用于生成子菜单

//当前路由如果等于props路由，则父级菜单自动展开，前提当前组件为父级菜单
show.value = $route.path.includes(props.route.path);
nextTick(() => {
  setTimeout(() => {
    show.value && emit("coord", menuItem.value.getBoundingClientRect().top);
  }, 100);
});

//如果当前路由存在子路由，则添加进子菜单用于循环生成
if (show.value && props.route.children) routes.push(...props.route.children);

/* 点击后触发 */
const fn = () => {
  show.value = !show.value;

  //如果当前组件没有子路由，则直接跳转
  if (!props.route.children) {
    $router.push(props.route.path);
    return;
  } /* 如果父级菜单已经展开，则添加子路由去生成子菜单 */ else if (show.value) {
    routes.push(...props.route.children);
  } /* 否则移除子菜单 */ else {
    routes.length = 0;
  }
  $switchStore.$clickAudio();
};

/* 递归判断当前路由如果等于某个父级菜单的子路由，则父级菜单自动展开，暂时不需要 */
//const sidebarActive = (routes: Route) => {
//  if (routes.children && routes.children.length) {
//    routes.children.forEach((item) => {
//      if (item.path === $route.path) {
//        fn();
//        sidebarActive(item);
//      }
//    });
//  }
//};

//sidebarActive(props.route);

/* 发送坐标 */
const handleCoord = (e: Event) => {
  const el = e.target as HTMLElement;
  const coord = el.getBoundingClientRect().top;

  if (props.route.title === "系统管理") {
    if (show.value && props.coord > coord) {
      emit("coord", 0);
    } else {
      emit("coord", props.coord);
    }
  } else {
    emit("coord", coord);
  }
};

const handleChildCoord = (v: number) => {
  emit("coord", v);
};
</script>

<template>
  <div v-if="route" class="menu" :class="{ collapse: $collapseStore.collapse }">
    <button
      class="menu-item"
      :style="textStyle"
      :class="{
        active: route.path === $route.path,
      }"
      @click="handleCoord($event), fn()"
      ref="menuItem"
    >
      <!-- 图标 -->
      <i class="iconfont" :class="route.meta.icon" />

      <!-- 文字 -->
      <span class="name">{{ route.title }}</span>

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
          :route="r"
          :style="{ transitionDelay: (routes.length - i) * 0.05 + 's' }"
          :coord="coord"
          @coord="handleChildCoord"
          :key="r.path"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
