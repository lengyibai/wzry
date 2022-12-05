<template>
  <div class="hero-voice">
    <button
      class="voice flex"
      :class="{ active: currentIndex === index }"
      :style="{ 'animation-duration': time + 's' }"
      @click="play(item.link, index)"
      v-for="(item, index) in voices"
      ref="voiceRef"
      :key="index"
    >
      <div class="text" v-show="currentIndex !== index">
        <span> {{ item.text }}</span>
        <i class="iconfont wzry-laba" />
      </div>
      <transition name="fade-a">
        <i class="iconfont wzry-playing" v-show="currentIndex === index" />
      </transition>
    </button>
    <!--播放语音-->
    <PlayVoice @ended="ended" @info="voiceInfo" v-if="play_link" :link="play_link" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import heroStore from "@/store/hero";

const $heroStore = heroStore();
const voiceRef = ref();

const play_link = ref(""); //播放链接
const time = ref(0); //当前播放时长
const currentIndex = ref(-1); //当前播放索引
const voices = ref<Hero.Voice[]>([]); //英雄数据
voices.value = $heroStore.hero_info.voices; //语音数据

onMounted(() => {
  /* 出场动画 */
  voiceRef.value.forEach((item: HTMLElement, index: number) => {
    item.style.transitionDelay = `${index / 15}s`; //入场间隔
    /* 决定是从左还是从右入场 */
    if (index % 2) {
      item.style.transform = "translateX(-100%) translateY(500%) scale(0)";
    } else {
      item.style.transform = "translateX(100%) translateY(500%) scale(0)";
    }
    setTimeout(() => {
      item.style.transform = "translateX(0%) translateY(0%) scale(1)";
      //动画结束后初始化
      setTimeout(() => {
        item.style.transitionDelay = "0s";
      }, 1000);
    });
  });
});

/* 点击播放 */
const play = (voice: string, index: number) => {
  // 如果再次点击，则停止播放
  if (currentIndex.value === index) {
    currentIndex.value = -1;
    play_link.value = "";
    return;
  }
  currentIndex.value = index;
  play_link.value = voice;
};

/* 语音播放结束后触发播放下一个 */
const voiceInfo = (info: HTMLMediaElement) => {
  time.value = info.duration;
};

/* 语音播放结束后触发 */
let ended: () => void = () => {
  //如果播放完最后一个，则停止播放
  if (currentIndex.value + 1 === voices.value.length) {
    currentIndex.value += 1;
    return;
  }
  //等待播放动画结束后再播放
  play(voices.value[currentIndex.value + 1].link, currentIndex.value + 1);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
