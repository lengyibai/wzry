<template>
  <div class="pass-time">{{ time }}</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { $getCountTime, $frameInterval } from "@/utils";

const time = ref("");

$frameInterval(() => {
  const { y, mon, d, h, min, s } = $getCountTime("2022-3-17") as any;
  const year = y !== "00" ? `${y}y` : "";
  const month = mon !== "00" ? `${mon}mon` : "";
  time.value = `${year} ${month} ${d}d ${h}h ${min}min ${s}s`;
}, 1000);
</script>
<style scoped lang="less">
.pass-time {
  color: var(--theme-color-five);
  font-size: 20px;
}
</style>
