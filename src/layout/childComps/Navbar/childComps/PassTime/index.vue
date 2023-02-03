<script setup lang="ts">
import { ref } from "vue";

import { $timeCount } from "@/utils";

const time = ref(""); //已过去时间

setInterval(() => {
  const { y, mon, d, h, min, s } = $timeCount("2022-03-17 00:00:00") as any;
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
  height: 100%;
  padding: 0 10px;
  color: var(--theme-color-five);
  font-size: 20px;
  text-shadow: var(--t-shadow-e);
  border-left: var(--subline);
  border-right: var(--subline);
}
</style>
