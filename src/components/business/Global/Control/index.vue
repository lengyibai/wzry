<script setup lang="ts">
import KLoading from "./components/K-Loading/index.vue";
import KMessage from "./components/K-Message/index.vue";
import KTip from "./components/K-Tip/index.vue";
import KConfirm from "./components/K-Confirm/index.vue";
import KImageView from "./components/K-ImageView/index.vue";

import { $bus } from "@/utils";

/* 全局监听事件 */
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

  <!-- 确认弹窗 -->
  <KConfirm />

  <!-- 查看图片 -->
  <KImageView />
</template>
