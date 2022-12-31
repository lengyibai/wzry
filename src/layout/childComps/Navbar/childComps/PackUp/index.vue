<template>
  <i
    class="iconfont wzry-packup cursor-pointer"
    :class="{ 'is-active': isActive }"
    @click="toggleClick"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import $bus from "@/utils/eventBus";
import switchStore from "@/store/globalSwitch";

const $switchStore = switchStore();

const isActive = ref(true);

const toggleClick = () => {
  $switchStore.$clickAudio(`收起侧边栏${isActive.value}`);
  isActive.value = !isActive.value;
  $bus.emit("collapse");
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
