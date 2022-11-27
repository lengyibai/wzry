<template>
  <svg
    :class="{ 'is-active': isActive }"
    class="icon pack-up cursor-pointer"
    viewBox="0 0 1024 1024"
    @click="toggleClick"
  >
    <path
      d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
    />
  </svg>
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
