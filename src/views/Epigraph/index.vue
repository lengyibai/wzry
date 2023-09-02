<script setup lang="ts">
import { ref, onActivated } from "vue";

import EpigraphCategory from "./childComps/EpigraphCategory/index.vue";
import EpigraphList from "./childComps/EpigraphList/index.vue";

import { EpigraphStore, AudioStore } from "@/store";

defineOptions({
  name: "epigraph",
});

const $epigraphStore = EpigraphStore();
const $audioStore = AudioStore();

/** 显示铭文顶部分类 */
const show_epigraph = ref(false);

/* 获取铭文列表 */
$epigraphStore.getEpigraph().then(() => {
  show_epigraph.value = true;
});

onActivated(() => {
  $audioStore.play("h7t9");
});
</script>

<template>
  <div class="epigraph">
    <!-- 铭文类型分类 -->
    <transition name="epigraph">
      <EpigraphCategory v-show="show_epigraph" />
    </transition>

    <!-- 铭文列表 -->
    <div class="epigraph-main">
      <EpigraphList :data="$epigraphStore.filter_list" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
