<script setup lang="ts">
import { $bus } from "@/utils";

/* 全局监听事件 */
window.addEventListener("resize", (e) => {
  $bus.emit("resize", e);
});
window.addEventListener("mousemove", (e) => {
  $bus.emit("mousemove", e);
});
window.addEventListener("mouseup", (e) => {
  $bus.emit("mouseup", e);
});
</script>

<template>
  <!-- loading -->
  <K-Loading />

  <!-- 消息提醒 -->
  <K-Message />

  <!-- NPC -->
  <K-Tip />
</template>
