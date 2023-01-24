<script setup lang="ts">
import switchStore from "@/store/switch";
import otherStore from "@/store/collapse";

const $otherStore = otherStore();
const $switchStore = switchStore();

/* 点击折叠按钮 */
const handleToggle = () => {
  $switchStore.$clickAudio("d5e2");
  $otherStore.setCollapse();
};
</script>

<template>
  <i
    class="iconfont wzry-packup cursor-pointer"
    :class="{ 'is-active': !$otherStore.collapse }"
    @click="handleToggle"
  />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
