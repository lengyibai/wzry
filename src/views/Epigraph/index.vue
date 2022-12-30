<script setup lang="ts">
import { ref } from "vue";
import epigraphStore from "@/store/epigraph";
import EpigraphCategory from "./childComps/EpigraphCategory/index.vue"; //铭文类型分类
import EpigraphList from "./childComps/EpigraphList/index.vue"; //铭文列表

const $epigraphStore = epigraphStore();

const show_epigraph = ref(false); //显示铭文顶部分类

/* 获取铭文列表 */
$epigraphStore.getEpigraph().then(() => {
  show_epigraph.value = true;
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
