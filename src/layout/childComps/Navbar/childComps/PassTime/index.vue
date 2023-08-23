<script setup lang="ts">
import { ref } from "vue";

import { Util } from "@/utils";

const time = ref(""); //已过去时间

setInterval(() => {
  const { y, mon, d, h, min, s } = Util.TOOL.timeCount("2022-03-16 00:00:00") as any;
  const year = y !== "00" ? `${y}y` : "";
  const month = mon !== "00" ? mon : "";
  time.value = `${year} ${month}m ${d}d ${h}h ${min}min ${s}s`;
}, 1000);
</script>

<template>
  <div class="pass-time">{{ time }}</div>
</template>

<style scoped lang="less">
.pass-time {
  display: flex;
  align-items: center;
  padding: 0 0.625rem;
  height: 100%;
  border-right: var(--subline);
  border-left: var(--subline);
  color: var(--theme-font-color-four);
  text-shadow: var(--t-shadow-e);
  font-size: 1.25rem;
}
</style>
