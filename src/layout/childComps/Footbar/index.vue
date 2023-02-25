<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";

import Time from "./childComps/Time/index.vue"; //左侧时间
import MusicTool from "./childComps/MusicTool/index.vue"; //工具栏
import Copyright from "./childComps/Copyright/index.vue"; //右侧版权
import MusicPlay from "./childComps/MusicPlay/index.vue"; //音乐进度条

import settingStore from "@/store/setting";
import musicStore from "@/store/music";
import deviceStore from "@/store/device";

const $musicStore = musicStore();
const $settingStore = settingStore();
const $deviceStore = deviceStore();

const line = ref();
const footbar = ref();

let timer: any = null; //隐藏工具栏定时器

const progress = ref(0); //播放进度

//启用音乐播放器
const enable_music = computed(() => $settingStore.config.music);
//音乐进度控制
const music_progress = computed(() => $settingStore.config.musicProgress);

/* 通过获取点击的坐标，计算出播放进度 */
const handleSetProgress = (e: MouseEvent) => {
  if (!enable_music.value) return;

  //计算出小数
  progress.value = parseFloat(((e.pageX - footbar.value.offsetLeft) / footbar.value.offsetWidth).toFixed(2));

  music_progress.value && $musicStore.setCurrentTime(progress.value); //设置播放进度
};

/* 悬浮移动竖线 */
const handleMoveLine = (e: MouseEvent) => {
  if (!enable_music.value || !music_progress.value) return;

  //设置底部刻度线x坐标
  line.value.style.left =
    parseFloat(((e.pageX - footbar.value.offsetLeft) / footbar.value.offsetWidth).toFixed(2)) * 100 + "%";
};

/* 点击音乐工具栏 */
const EmitMusicToole = (type: string) => {
  if (type === "play") {
    $musicStore.play(false);
    return;
  }
  const strategy: Record<string, Func> = {
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

onBeforeUnmount(() => {
  $musicStore.pause();
});
</script>

<template>
  <div
    v-particle="{
      color: '#2e5283',
      filter: false,
      size: 10,
      enable: $settingStore.config.particle,
    }"
    class="footbar"
    :class="{ 'cursor-pointer': music_progress }"
    @click="handleSetProgress"
    @mouseenter="handleShowTool(true)"
    @mousemove="handleMoveLine"
    @mouseleave="handleShowTool(false)"
    ref="footbar"
  >
    <!-- 底部竖线 -->
    <div v-if="enable_music && music_progress" class="line" ref="line"></div>

    <!-- 音乐播放器 -->
    <MusicPlay v-if="enable_music" class="music-play" />

    <!-- 左侧时间 -->
    <Time v-show="!$deviceStore.vertical" class="time" />

    <!-- 音乐工具栏 -->
    <MusicTool v-if="enable_music" @toggle="EmitMusicToole" />

    <!-- 右侧作者 -->
    <Copyright v-show="!$deviceStore.vertical" class="copyright" />
  </div>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>
