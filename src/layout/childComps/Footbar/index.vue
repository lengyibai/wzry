<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import musicStore from "@/store/music";
import settingStore from "@/store/setting";
import Time from "./childComps/Time.vue"; //左侧时间
import Tool from "./childComps/Tool.vue"; //工具栏
import Copyright from "./childComps/Copyright.vue"; //右侧版权
import MusicPlay from "./childComps/MusicPlay.vue"; //音乐进度条

const $musicStore = musicStore();
const $settingStore = settingStore();

const line = ref<HTMLElement>();
const footbar = ref<HTMLElement>();

let timer: any = null; //隐藏工具栏定时器

let enable_music = computed(() => {
  return $settingStore.config.music;
}); //是否启用音乐播放器

const playProgress = ref(0); //播放进度

/* 通过获取点击的坐标，计算出播放进度 */
const getPoint = (e: MouseEvent) => {
  playProgress.value = parseFloat(
    (
      (e.pageX - footbar.value!.offsetLeft) /
      footbar.value!.offsetWidth
    ).toFixed(2)
  );
};

/* 悬浮移动竖线 */
const handleMoveLine = (e: MouseEvent) => {
  if (!enable_music.value) return;
  line.value!.style.left =
    parseFloat(
      (
        (e.pageX - footbar.value!.offsetLeft) /
        footbar.value!.offsetWidth
      ).toFixed(2)
    ) *
      100 +
    "%";
};

/* 点击音乐工具栏 */
const EmitMusicToole = (type: string) => {
  if (type === "last") {
    $musicStore.last();
  } else if (type === "play") {
    $musicStore.play(false);
  } else if (type === "pause") {
    $musicStore.pause();
  } else if (type === "next") {
    $musicStore.next();
  } else if (type === "list") {
    $musicStore.list();
  }
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
    class="footbar cursor-pointer"
    @click="getPoint"
    @mouseenter="handleShowTool(true)"
    @mousemove="handleMoveLine"
    @mouseleave="handleShowTool(false)"
    ref="footbar"
    v-particle="{ color: '#2e5283', filter: false, size: 10 }"
  >
    <div class="line" ref="line" v-if="enable_music"></div>
    <MusicPlay
      class="music-play"
      v-if="enable_music"
      :playProgress="playProgress"
    />
    <Time class="time" />
    <Tool @toggle="EmitMusicToole" />
    <Copyright class="copyright" />
  </div>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>
