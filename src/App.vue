<script setup lang="ts">
import { SettingStore } from "./store";
import { $loading } from "./utils";

import { Control, WaterMark } from "@/components/business";

const $settingStore = SettingStore();
$settingStore.takeEffect();

const onComponentMounted = () => {
  $loading.close();
};
</script>

<template>
  <!-- 路由页面 -->
  <router-view v-slot="{ Component }">
    <transition name="round-clip" mode="out-in">
      <component :is="Component" @vue:mounted="onComponentMounted" />
    </transition>
  </router-view>

  <!-- 全局开关 -->
  <Control />

  <!-- 左下角水印 -->
  <WaterMark />
</template>

<style scoped lang="less">
.round-clip-enter-active {
  transform-origin: center center;
  animation: round-clip-in 1.5s cubic-bezier(1, -0.67, 0, 1.5);
}

.round-clip-leave-active {
  transform-origin: center center;
  animation: round-clip-out 1.5s cubic-bezier(1, -0.67, 0, 2.5);
}

@keyframes round-clip-in {
  0% {
    transform: translateY(-125%) scale(0.75);
  }

  50% {
    transform: translateY(0%) scale(0.75);
  }

  100% {
    transform: translateX(0%) scale(1);
  }
}

@keyframes round-clip-out {
  0% {
    transform: translateX(0%) scale(1);
  }

  50% {
    transform: translateX(0%) scale(0.75);
  }

  100% {
    transform: translateX(-125%) scale(0.75);
  }
}
</style>
