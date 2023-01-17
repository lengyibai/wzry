<template>
  <i
    class="iconfont wzry-packup cursor-pointer"
    :class="{ 'is-active': !$otherStore.collapse }"
    @click="toggleClick"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";

import switchStore from "@/store/switch";
import otherStore from "@/store/other";

const $otherStore = otherStore();
const $switchStore = switchStore();

const isActive = ref(true);

const toggleClick = () => {
  $switchStore.$clickAudio(`收起侧边栏${isActive.value}`);
  $otherStore.setCollapse();
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
