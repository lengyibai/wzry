<template>
  <div class="pass-time">{{ time }}</div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { $getCountTime } from "@/utils";

const time = ref("");

setInterval(() => {
  const { y, mon, d, h, min, s } = $getCountTime("2022-3-17") as any;
  const year = y !== "00" ? `${y}y` : "";
  const month = mon !== "00" ? mon : "";
  time.value = `已过去${year} ${month}月 ${d}天 ${h}时 ${min}分 ${s}秒`;
}, 1000);
</script>
<style scoped lang="less">
.pass-time {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--theme-color-five);
  font-size: 20px;
}
</style>
