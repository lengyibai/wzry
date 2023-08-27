<script setup lang="ts">
import collapseStore from "@/store/modules/collapse";
import audioStore from "@/store/modules/audio";

const $collapseStore = collapseStore();
const $audioStore = audioStore();

/* 点击折叠按钮 */
const handleToggle = () => {
  $audioStore.play("d5e2");
  $collapseStore.toggleCollapse();
};
</script>

<template>
  <i
    class="iconfont wzry-packup cursor-pointer"
    :class="{ 'is-active': !$collapseStore.collapse }"
    @click="handleToggle"
  />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
