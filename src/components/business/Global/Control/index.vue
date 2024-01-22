<script setup lang="ts">
import KLoading from "./components/K-Loading/index.vue";
import KMessage from "./components/K-Message/index.vue";
import KTip from "./components/K-Tip/index.vue";
import KConfirm from "./components/K-Confirm/index.vue";
import KImageView from "./components/K-ImageView/index.vue";
import KMouseTip from "./components/K-MouseTip/index.vue";
import KInputDialog from "./components/K-InputDialog/index.vue";
import KFoucs from "./components/K-Foucs/index.vue";
// import KPhone from "./components/K-Phone/index.vue";

import { $bus } from "@/utils";

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

  <!-- 跟随鼠标点、圆、线 -->
  <KMouseTip />

  <!-- 弹窗输入内容 -->
  <KInputDialog />

  <!-- 聚焦 -->
  <KFoucs />

  <!-- 禁止手机查看 -->
  <!-- <KPhone /> -->
</template>
