<template>
  <div class="time">2022.3.16 - {{ time }}</div>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { $fmtTime } from "@/utils";

const time = computed(() => $fmtTime(new Date(), "YYYY.MM.DD"));
</script>
<style scoped lang="less">
.time {
  color: var(--theme-color-five);
  font-size: 20px;
}
</style>
