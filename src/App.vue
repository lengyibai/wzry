<script setup lang="ts">
import { onMounted } from "vue";

import { $loading } from "./utils/loading";
import { _titleTip } from "./utils/tool";

import { SettingStore, VersionStore } from "@/store";
import { Control, WaterMark } from "@/components/business";

const $settingStore = SettingStore();

$settingStore.takeEffect();
VersionStore();

/* 路由组件加载结束后触发 */
const onComponentMounted = () => {
  $loading.close();
};

/* 浏览器标题交互 */
onMounted(_titleTip);
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
  animation: fade 1s cubic-bezier(0.85, 0, 0.16, 1);
}

.round-clip-leave-active {
  transform-origin: center center;
  animation: round-out 1s ease-out;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes round-out {
  0% {
    clip-path: circle(100% at 50% 50%);
  }

  100% {
    clip-path: circle(0% at 50% 50%);
  }
}
</style>
