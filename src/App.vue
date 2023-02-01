<script setup lang="ts">
import settingStore from "@/store/setting";

const $settingStore = settingStore();
$settingStore.takeEffect();
</script>

<template>
  <div class="app">
    <!-- 路由页面 -->
    <router-view v-slot="{ Component }">
      <transition name="round-clip" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 全局开关 -->
    <Switch />

    <!-- 左下角水印 -->
    <WaterMark />
  </div>
</template>

<style scoped lang="less">
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
}

/* 圆形路由跳转 */
.round-clip-enter-active {
  animation: round-clip-in 0.75s;
}

.round-clip-leave-active {
  animation: round-clip-out 1.25s;
}

@keyframes round-clip-in {
  0% {
    clip-path: circle(0% at 50% 50%);
  }

  100% {
    clip-path: circle(100% at 50% 50%);
  }
}

@keyframes round-clip-out {
  0% {
    clip-path: circle(100% at 50% 50%);
  }

  100% {
    clip-path: circle(0% at 50% 50%);
  }
}
</style>
