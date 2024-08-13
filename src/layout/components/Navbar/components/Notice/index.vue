<script setup lang="ts">
import { $imageView } from "@/utils/busTransfer";
import { _getMiscLink } from "@/utils/concise";

/** @description 查看二维码 */
const handleQrCode = (e: Event) => {
  $imageView({
    parent: e.target as HTMLElement,
    type: "DEFAULT",
    bigImage: _getMiscLink("activity_group_code"),
    blurImage: _getMiscLink("activity_group_code"),
  });
};
</script>

<template>
  <div class="notice">
    <div class="content">
      欢迎加群讨论技术和体验反馈，
      <span class="qr-code" @click="handleQrCode">→点击此处←</span>
      查看群
      <span class="green">二维码</span>，如果你在体验过程中遇到
      <span class="red">设计不人性化</span>、<span class="red">功能不合理</span>、
      <span class="red">功能未正常加载</span>、<span class="red">点击按钮无反馈</span>、
      <span class="red">元素样式错位</span>、
      <span class="red">图片加载失败</span>等各种问题，请在群里积极<span class="blue">@冷弋白</span>
      。
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
