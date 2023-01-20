<script setup lang="ts">
import { computed, watch } from "vue";

import useGetData from "@/hooks/useGetData";

interface Emits {
  (e: "update:finish", v: boolean): void;
}
const emit = defineEmits<Emits>();

const { total, index, title, type, finish } = useGetData();

const progress = computed(
  () => ((index.value / total.value) * 100).toFixed(0) + "%"
);

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
      <div class="text">正在为您下载{{ type }}：{{ title }}</div>
      <div class="num">{{ progress }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
