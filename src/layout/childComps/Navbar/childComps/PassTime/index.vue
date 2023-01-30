<script setup lang="ts">
import { ref } from "vue";

import { $timeCount } from "@/utils";

const time = ref(""); //已过去时间

setInterval(() => {
  const { y, mon, d, h, min, s } = $timeCount("2022-03-17 00:00:00") as any;
  const year = y !== "00" ? `${y}y` : "";
  const month = mon !== "00" ? mon : "";
  time.value = `已过去${year} ${month}月 ${d}天 ${h}时 ${min}分 ${s}秒`;
}, 1000);
</script>

<template>
  <div class="pass-time">{{ time }}</div>
</template>

<style scoped lang="less">
.pass-time {
  color: var(--theme-color-five);
  font-size: 20px;
  text-shadow: var(--t-shadow);
}
</style>
