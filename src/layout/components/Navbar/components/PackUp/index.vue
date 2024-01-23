<script setup lang="ts">
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
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
  <i
    v-mouse-tip="{
      text: MOUSE_TIP.i6u1,
    }"
    class="iconfont wzry-packup"
    :class="{ 'is-active': !$collapseStore.collapse }"
    @click="handleToggle"
  />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
