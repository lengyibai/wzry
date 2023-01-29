<script setup lang="ts">
import collapseStore from "@/store/collapse";

const $collapseStore = collapseStore();
</script>

<template>
  <div class="game-logo">
    <transition-group name="fade-a">
      <i key="icon" class="iconfont wzry-logo" />
      <span v-show="!$collapseStore.collapse" key="text">王者荣耀</span>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
