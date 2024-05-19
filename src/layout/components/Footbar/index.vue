<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick } from "vue";

import Time from "./components/Time/index.vue";
import MusicTool from "./components/MusicTool/index.vue";
import Copyright from "./components/Copyright/index.vue";
import MusicPlay from "./components/MusicPlay/index.vue";

import { vParticleEffect } from "@/directives";
import { MusicStore, SettingStore } from "@/store";
import { useDevice } from "@/hooks";
import { useHideLayout } from "@/layout/common/hooks/useHideLayout";

const $musicStore = MusicStore();
const $settingStore = SettingStore();

const { vertical } = useDevice();
const { hide_all } = useHideLayout();

const lineRef = ref<HTMLElement>();
const canvasRef = ref<HTMLCanvasElement>();
const footbarRef = ref<HTMLElement>();

/** 播放进度 */
const progress = ref(0);

/** 启用音乐播放器 */
const enable_music = computed(() => $settingStore.config.music);
/** 音乐进度控制 */
const music_progress = computed(() => $settingStore.config.musicProgress);

nextTick(() => {
  $musicStore.initAudioVisual(canvasRef.value!);
  if (!$settingStore.config.music) return;
  $musicStore.play();
});

/** @description 通过获取点击的坐标，计算出播放进度 */
const handleSetProgress = (e: MouseEvent) => {
  if (!enable_music.value || !footbarRef.value) return;

  //计算出小数
  progress.value = parseFloat(
    ((e.pageX - footbarRef.value.offsetLeft) / footbarRef.value.offsetWidth).toFixed(2),
  );
  //设置播放进度
  music_progress.value && $musicStore.setCurrentTime(progress.value);
};

/** @description 悬浮移动竖线 */
const handleMoveLineRef = (e: MouseEvent) => {
  if (!enable_music.value || !music_progress.value || !footbarRef.value || !lineRef.value) return;

  //设置底部刻度线x坐标
  lineRef.value.style.left =
    parseFloat(
      ((e.pageX - footbarRef.value.offsetLeft) / footbarRef.value.offsetWidth).toFixed(2),
    ) *
      100 +
    "%";
};

/** @description 点击音乐工具栏
 * @param type 工具类型
 */
const onMusicTool = (type: string) => {
  if (type === "play") {
    $musicStore.play(false);
    return;
  }
  const strategy: Record<string, () => void> = {
    last: $musicStore.last,
    pause: $musicStore.pause,
    next: $musicStore.next,
    list: $musicStore.list,
  };
  strategy[type]();
};

onUnmounted(() => {
  $musicStore.stop();
  $musicStore.resetAudio();
});
</script>

<template>
  <transition name="to-top" appear>
    <div
      v-show="!hide_all"
      ref="footbarRef"
      v-particle-effect="{
        enable: $settingStore.config.particle,
      }"
      class="foot-bar"
      @click="handleSetProgress"
      @mousemove="handleMoveLineRef"
    >
      <!-- 底部竖线 -->
      <div v-if="enable_music && music_progress" ref="lineRef" class="line"></div>

      <!-- 音乐播放器 -->
      <MusicPlay v-if="enable_music" />

      <!-- 左侧时间 -->
      <Time v-show="!vertical" />

      <!-- 音乐工具栏 -->
      <MusicTool v-show="enable_music" @toggle="onMusicTool" />

      <!-- 右侧作者 -->
      <Copyright />

      <!-- 音频可视化 -->
      <canvas ref="canvasRef"></canvas>
    </div>
  </transition>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>
