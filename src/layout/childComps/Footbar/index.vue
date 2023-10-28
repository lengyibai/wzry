<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick } from "vue";

import Time from "./childComps/Time/index.vue";
import MusicTool from "./childComps/MusicTool/index.vue";
import Copyright from "./childComps/Copyright/index.vue";
import MusicPlay from "./childComps/MusicPlay/index.vue";

import { MusicStore, SettingStore, DeviceStore } from "@/store";

const $musicStore = MusicStore();
const $settingStore = SettingStore();
const $deviceStore = DeviceStore();

const lineRef = ref<HTMLElement>();
const canvasRef = ref<HTMLCanvasElement>();
const footbarRef = ref<HTMLElement>();

/** 隐藏工具栏定时器 */
let timer: NodeJS.Timeout;
/** 播放进度 */
const progress = ref(0);

/** 启用音乐播放器 */
const enable_music = computed(() => $settingStore.config.music);
/** 音乐进度控制 */
const music_progress = computed(() => $settingStore.config.musicProgress);

nextTick(() => {
  $musicStore.initAudioVisual(canvasRef.value!);
  $musicStore.play();
});

/* 通过获取点击的坐标，计算出播放进度 */
const handleSetProgress = (e: MouseEvent) => {
  if (!enable_music.value || !footbarRef.value) return;

  //计算出小数
  progress.value = parseFloat(((e.pageX - footbarRef.value.offsetLeft) / footbarRef.value.offsetWidth).toFixed(2));
  //设置播放进度
  music_progress.value && $musicStore.setCurrentTime(progress.value);
};

/* 悬浮移动竖线 */
const handleMoveLineRef = (e: MouseEvent) => {
  if (!enable_music.value || !music_progress.value || !footbarRef.value || !lineRef.value) return;

  //设置底部刻度线x坐标
  lineRef.value.style.left =
    parseFloat(((e.pageX - footbarRef.value.offsetLeft) / footbarRef.value.offsetWidth).toFixed(2)) * 100 + "%";
};

/* 点击音乐工具栏 */
const onMusicToole = (type: string) => {
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

/* 显示工具栏 */
const handleShowTool = (v: boolean) => {
  if (!enable_music.value) return;
  if (!v) {
    timer = setTimeout(() => {
      $musicStore.showTool(v);
    }, 250);
  } else {
    clearTimeout(timer);
    $musicStore.showTool(v);
  }
};

onUnmounted(() => {
  $musicStore.stop();
  $musicStore.resetAudio();
});
</script>

<template>
  <div
    ref="footbarRef"
    v-particle="{
      color: '#2e5283',
      filter: false,
      size: 10,
      enable: $settingStore.config.particle,
    }"
    class="footbar"
    :class="{ 'global_cursor-pointer': music_progress }"
    @click="handleSetProgress"
    @mouseenter="handleShowTool(true)"
    @mousemove="handleMoveLineRef"
    @mouseleave="handleShowTool(false)"
  >
    <!-- 底部竖线 -->
    <div v-if="enable_music && music_progress" ref="lineRef" class="line"></div>

    <!-- 音乐播放器 -->
    <MusicPlay v-if="enable_music" class="music-play" />

    <!-- 左侧时间 -->
    <Time v-show="!$deviceStore.vertical" class="time" />

    <!-- 音乐工具栏 -->
    <MusicTool v-show="enable_music" @toggle="onMusicToole" />

    <!-- 右侧作者 -->
    <Copyright v-show="!$deviceStore.vertical" class="copyright" />

    <!-- 音频可视化 -->
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>
