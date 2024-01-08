<script setup lang="ts">
import { computed } from "vue";

import { useGetData } from "@/hooks";

const $emit = defineEmits<{
  "update:finish": [v: boolean];
}>();

const { total, index, type, getData } = useGetData();

/** 下载进度 */
const progress = computed(() => ((index.value / total.value) * 100).toFixed(0) + "%");

getData().then(() => {
  $emit("update:finish", true);
});
</script>

<template>
  <div class="down-load">
    <div class="down-load__bar">
      <div class="progress" :style="{ width: progress }"></div>
    </div>
    <div class="down-load__desc">
      <div class="text">正在为您下载{{ type }}</div>
      <div class="num">{{ progress }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
