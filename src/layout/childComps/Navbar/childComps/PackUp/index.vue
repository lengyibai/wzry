<script setup lang="ts">
import { CollapseStore, AudioStore } from "@/store";

const $collapseStore = CollapseStore();
const $audioStore = AudioStore();

/* 点击折叠按钮 */
const handleToggle = () => {
  $audioStore.play("d5e2");
  $collapseStore.toggleCollapse();
};
</script>

<template>
  <i class="iconfont wzry-packup" :class="{ 'is-active': !$collapseStore.collapse }" @click="handleToggle" />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
