<script setup lang="ts">
import { computed, watch } from "vue";

import useGetData from "@/hooks/useGetData";

interface Emits {
  (e: "update:finish", v: boolean): void;
}
const emit = defineEmits<Emits>();

const { total, index, type, finish } = useGetData();

//下载进度
const progress = computed(() => ((index.value / total.value) * 100).toFixed(0) + "%");

/* 监听是否完成 */
watch(finish, (v) => {
  emit("update:finish", v);
});
</script>

<template>
  <div class="down-load">
    <div class="bar">
      <div class="progress" :style="{ width: progress }"></div>
    </div>
    <div class="desc">
      <div class="text">正在为您下载{{ type }}</div>
      <div class="num">{{ progress }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
