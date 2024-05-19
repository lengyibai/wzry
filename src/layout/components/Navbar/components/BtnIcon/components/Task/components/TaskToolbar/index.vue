<script setup lang="ts">
import { KCategory } from "@/components/business";

const $emit = defineEmits<{
  change: [index: number];
}>();

const task_options = ["今日任务", "本周任务"];

/* 点击tab栏触发 */
const onTab = (index: number) => {
  $emit("change", index);
};
</script>

<template>
  <div class="task-toolbar">
    <KCategory :auto="false" title-width="9.375rem" :options="task_options" @tab="onTab" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
