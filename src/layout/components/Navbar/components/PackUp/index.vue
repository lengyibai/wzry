<script setup lang="ts">
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { useCollapse } from "@/hooks";
import { AudioStore } from "@/store";

const $audioStore = AudioStore();

const { collapse, toggleCollapse } = useCollapse();

/* 点击折叠按钮 */
const handleToggle = () => {
  $audioStore.play("d5e2");
  toggleCollapse();
};
</script>

<template>
  <i
    v-mouse-tip="{
      text: MOUSE_TIP.i6u1,
    }"
    class="iconfont wzry-packup"
    :class="{ 'is-active': !collapse }"
    @click="handleToggle"
  />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
