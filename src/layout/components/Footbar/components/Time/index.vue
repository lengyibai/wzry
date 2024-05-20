<script setup lang="ts">
import { dayjs } from "@/utils/tool";

/** 当前时间 */
const time = dayjs().format("YYYY.MM.DD");
</script>

<template>
  <div class="time">2022.3.16 - {{ time }}</div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
