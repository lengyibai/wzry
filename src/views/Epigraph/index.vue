<script setup lang="ts">
import { onActivated } from "vue";

import EpigraphCategory from "./childComps/EpigraphCategory/index.vue";
import EpigraphList from "./childComps/EpigraphList/index.vue";

import { EpigraphStore, AudioStore } from "@/store";

defineOptions({
  name: "Epigraph",
});

const $epigraphStore = EpigraphStore();
const $audioStore = AudioStore();

$epigraphStore.getEpigraph();

onActivated(() => {
  $audioStore.play("h7t9");
});
</script>

<template>
  <div class="epigraph">
    <!-- 铭文类型分类 -->
    <transition name="epigraph" appear>
      <EpigraphCategory />
    </transition>

    <!-- 铭文列表 -->
    <div class="epigraph__main">
      <EpigraphList :data="$epigraphStore.filter_list" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
