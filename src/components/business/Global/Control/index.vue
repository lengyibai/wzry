<script setup lang="ts">
import useTip from "./hooks/useTip";

import { $bus } from "@/utils";

const { show_tip, title, btn_text, content, align, noTipName, btn, btnFn, tip } = useTip();

$bus.on("tip", (data) => {
  tip(data);
});

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
  <transition name="fade">
    <K-Tip
      v-if="show_tip"
      v-model="show_tip"
      v-model:btn="btn"
      :text="content"
      :align="align"
      :no-tip-name="noTipName"
      :title="title"
      :btn-text="btn_text"
      :btn-fn="btnFn"
    />
  </transition>
</template>
