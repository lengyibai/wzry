<script setup lang="ts">
import { computed } from "vue";

import { $browserV } from "@/utils";
import clickAudio from "@/store/audio";
import musicStore from "@/store/music";
import collapseStore from "@/store/collapse";
import settingStore from "@/store/setting";
import speedStore from "@/store/speed";
import versionStore from "@/store/version";

const $clickAudio = clickAudio();
const $musicStore = musicStore();
const $collapseStore = collapseStore();
const $settingStore = settingStore();
const $speedStore = speedStore();
const $versionStore = versionStore();

/* 本地配置立即生效 */
$clickAudio.setAudio($settingStore.config.audio); //音效
$clickAudio.setVolume($settingStore.config.audioVolume); //音效音量
$musicStore.setVolume($settingStore.config.musicVolume); //音乐音量
$speedStore.setSpeed($settingStore.config.speed); //动画速度

/* 是否为旧版 */
const old = computed(() => $versionStore.local_version !== $versionStore.remote_version);
const old_file = computed(() => $versionStore.local_file !== $versionStore.file_version);

/* 浏览器版本提示 */
const low = $browserV.browser === "chrome" ? $browserV.version < 90 : $browserV.version < 15;
const version = `${$browserV.version} ${
  low ? "(版本较低，部分效果可能无法显示，建议更换浏览器)" : ""
}`;
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
    <transition name="fade">
      <div v-show="!$collapseStore.collapse" class="watermark">
        <p :class="{ low: low }">浏览器{{ $browserV.browser }}内核版本：{{ version }}</p>
        <p :class="{ old: old }">当前数据版本：{{ $versionStore.local_version }}</p>
        <p :class="{ new: old }">最新数据版本：{{ $versionStore.remote_version }}</p>
        <p :class="{ old: old_file }">当前网页版本：{{ $versionStore.local_file }}</p>
        <p :class="{ new: old_file }">最新网页版本：{{ $versionStore.file_version }}</p>
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

.old {
  color: var(--red) !important;
}

.new {
  color: var(--green) !important;
}

.low {
  color: var(--red);
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
