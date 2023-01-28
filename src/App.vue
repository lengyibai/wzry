<script setup lang="ts">
import clickAudio from "@/store/audio";
import musicStore from "@/store/music";
import settingStore from "@/store/setting";
import speedStore from "@/store/speed";

const $clickAudio = clickAudio();
const $musicStore = musicStore();
const $settingStore = settingStore();
const $speedStore = speedStore();

/* 本地配置立即生效 */
$clickAudio.setAudio($settingStore.config.audio); //音效
$clickAudio.setVolume($settingStore.config.audioVolume); //音效音量
$musicStore.setVolume($settingStore.config.musicVolume); //音乐音量
$speedStore.setSpeed($settingStore.config.speed); //动画速度
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

    <!-- 移动端提示横屏浏览 -->
    <LibPhoneTip />
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
