<script setup lang="ts">
import { computed } from "vue";

import { $fmtTime } from "@/utils";

//当前时间
const time = computed(() => $fmtTime(new Date(), "YYYY.MM.DD"));
</script>

<template>
  <div class="time">2022.3.16 - {{ time }}</div>
</template>

<style scoped lang="less">
.time {
  color: var(--theme-color-five);
  font-size: 20px;
}
</style>
