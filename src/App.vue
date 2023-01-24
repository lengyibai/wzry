<script setup lang="ts">
import { $chromeV } from "@/utils";
import clickAudio from "@/store/audio";
import musicStore from "@/store/music";
import otherStore from "@/store/collapse";
import settingStore from "@/store/setting";
import speedStore from "@/store/speed";
import useVersion from "@/hooks/useVersion";

const $clickAudio = clickAudio();
const $musicStore = musicStore();
const $otherStore = otherStore();
const $settingStore = settingStore();
const $speedStore = speedStore();

const { LOCAL_VERSION, REMOTE_VERSION } = useVersion();

/* 本地配置立即生效 */
const setTakeEffect = () => {
  $clickAudio.setAudio($settingStore.config.audio); //音效
  $clickAudio.setVolume($settingStore.config.audioVolume); //音效音量
  $musicStore.setVolume($settingStore.config.musicVolume); //音乐音量
  $speedStore.setSpeed($settingStore.config.speed); //动画速度
};
setTakeEffect();
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
    <GlobalSwitch />

    <!-- 左下角水印 -->
    <transition name="fade">
      <div v-show="!$otherStore.collapse" class="watermark">
        <p>浏览器内核版本：{{ $chromeV }}</p>
        <p>当前版本：{{ LOCAL_VERSION }}</p>
        <p>最新版本：{{ REMOTE_VERSION }}</p>
      </div>
    </transition>

    <!-- 移动端提示横屏浏览 -->
    <LibPhoneTip />
  </div>
</template>

<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;

  .watermark {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    color: var(--white-25);
    font-size: 12px;

    p {
      text-shadow: none;
    }
  }
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
