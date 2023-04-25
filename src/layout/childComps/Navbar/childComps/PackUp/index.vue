<script setup lang="ts">
import { Store } from "@/config";

const $collapseStore = Store.collapse();
const $controlStore = Store.control();

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
