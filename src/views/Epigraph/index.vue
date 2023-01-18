<script setup lang="ts">
import { ref, onMounted } from "vue";

import EpigraphCategory from "./childComps/EpigraphCategory/index.vue"; //铭文类型分类
import EpigraphList from "./childComps/EpigraphList/index.vue"; //铭文列表

import switchStore from "@/store/switch";
import epigraphStore from "@/store/epigraph";

const $epigraphStore = epigraphStore();
const $switchStore = switchStore();

const show_epigraph = ref(false); //显示铭文顶部分类

/* 获取铭文列表 */
$epigraphStore.getEpigraph().then(() => {
  show_epigraph.value = true;
});

onMounted(() => {
  $switchStore.$clickAudio("h7t9");
});
</script>

<template>
  <div class="epigraph">
    <transition name="epigraph">
      <EpigraphCategory v-show="show_epigraph" />
    </transition>
    <div class="epigraph-main">
      <EpigraphList :data="$epigraphStore.filter_list" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
