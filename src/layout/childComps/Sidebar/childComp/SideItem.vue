<template>
  <div class="menu" v-if="route">
    <div
      @click="fn(route.path)"
      class="menu-item cursor-pointer menu-list"
      :style="textStyle"
      :class="{
        active: route.path === $route.path,
      }"
    >
      <i class="iconfont" :class="route.meta.icon" />
      <span>{{ route.title }}</span>

      <img
        v-if="route.children"
        class="arrow"
        :class="{ 'arrow-active': show }"
        src="https://lengyibai.gitee.io/wzry-material/image/arrow.png"
        alt=""
      />
    </div>

    <!-- 二级菜单 -->
    <div v-if="route.children">
      <transition-group name="menu-list" appear>
        <SideItem
          v-for="(r, i) in routes"
          :route="r"
          :style="{ transitionDelay: (routes.length - i) * 0.05 + 's' }"
          :key="r.path"
        />
      </transition-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Route } from "@/router/interface";
import switchStore from "@/store/globalSwitch";
import SideItem from "./SideItem.vue"; //调用自身

interface Props {
  route: any;
}

const props = withDefaults(defineProps<Props>(), {
  route: () => {
    return {};
  },
});

interface RouteFormat {
  path: string;
  title: string;
  meta: { title: string };
  children: RouteFormat[] | null;
  zIndex: number;
}

const $router = useRouter();
const $route = useRoute();
const $switchStore = switchStore();

const show = ref(false);
show.value = $route.path.includes(props.route.path);
const textStyle = `padding-left: ${1 * props.route.zIndex}em !important;`;

const routes = reactive<RouteFormat[]>([]);

if (show.value && props.route.children) routes.push(...props.route.children);

const fn = (path: string) => {
  $switchStore.$clickAudio(path);
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
        fn("item.path");
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
