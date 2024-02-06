<script setup lang="ts">
import { onMounted } from "vue";

import { AudioStore } from "@/store";
import { $loading, $tool } from "@/utils";
import { Control, WaterMark } from "@/components/business";

const $audioStore = AudioStore();

$audioStore.preload();

/* 路由组件加载结束后触发 */
const onComponentMounted = () => {
  $loading.close();
};

/* 浏览器标题交互 */
onMounted($tool.titleTip);
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
  animation: round-clip-in 1s cubic-bezier(0.85, 0, 0.16, 1);
}

.round-clip-leave-active {
  transform-origin: center center;
  animation: round-clip-out 1s cubic-bezier(0.85, 0, 0.16, 1);
}

@keyframes round-clip-in {
  0% {
    transform: translateY(-100vh);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes round-clip-out {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100vh);
  }
}
</style>
