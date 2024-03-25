<script setup lang="ts">
import { KCategory } from "@/components/business";

const task_options = ["今日任务", "本周任务", "新手任务"];

/* 点击tab栏触发 */
const onTab = (v: any) => {
  console.log(v);
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
