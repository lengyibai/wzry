<script setup lang="ts">
import collapseStore from "@/store/modules/collapse";
import controlStore from "@/store/modules/control";

const $collapseStore = collapseStore();
const $controlStore = controlStore();

/* 点击折叠按钮 */
const handleToggle = () => {
  $controlStore.$audioStore("d5e2");
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
