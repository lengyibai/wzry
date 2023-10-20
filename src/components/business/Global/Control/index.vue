<script setup lang="ts">
import { $bus } from "@/utils";
import KLoading from "@/components/subitem/K-Loading/index.vue";
import KMessage from "@/components/subitem/K-Message/index.vue";
import KTip from "@/components/subitem/K-Tip/index.vue";

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
  <KLoading />

  <!-- 消息提醒 -->
  <KMessage />

  <!-- NPC -->
  <KTip />
</template>
