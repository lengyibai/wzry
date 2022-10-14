<template>
  <div class="menu" v-if="route">
    <div
      @click="fn(route.path)"
      class="menu-item cursor-pointer"
      :style="textStyle"
      :class="{
        active: route.path == $route.path,
        menuList: isList,
      }"
    >
      <i class="icon" v-html="icon[route.meta.icon]"></i>
      <span>{{ route.title }}</span>

      <img v-if="route.children" class="arrow" :class="{ 'arrow-active': show }" src="@/assets/img/part/icon/arrow.png" alt="" />
    </div>

    <!-- 二级菜单 -->
    <div v-if="route.children">
      <transition-group name="menuList" appear>
        <SideItem
          v-for="(r, i) in routes"
          :route="r"
          :style="{ transitionDelay: (routes.length - i) * 0.05 + 's' }"
          :isList="true"
          :key="r.path"
        />
      </transition-group>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import switchStore from '@/store/globalSwitch';
import SideItem from './SideItem.vue';
import icon from '@/assets/icon/svg/sidebar';

const $router = useRouter();
const $route = useRoute();
const props = defineProps({
  route: {
    type: Object,
    default() {
      return {};
    },
  },
  isList: {
    type: Boolean,
    default: false,
  },
});
const { route } = toRefs(props);

const show = ref(false);
show.value = $route.path.includes(route.value.path);
const textStyle = `padding-left: ${1 * route.value.zIndex}em !important;`;

const $store = switchStore();
const routes = reactive([]);
if (show.value && route.value.children) routes.push(...route.value.children);
const fn = (path) => {
  $store.$clickAudio(path);
  show.value = !show.value;
  if (!route.value.children) {
    $router.push(route.value.path);
  } else if (show.value) {
    routes.push(...route.value.children);
  } else {
    routes.length = 0;
  }
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
