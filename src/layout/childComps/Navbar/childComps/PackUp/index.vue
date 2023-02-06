<script setup lang="ts">
import switchStore from "@/store/switch";
import collapseStore from "@/store/collapse";

const $collapseStore = collapseStore();
const $switchStore = switchStore();

/* 点击折叠按钮 */
const handleToggle = () => {
  $switchStore.$clickAudio("d5e2");
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
