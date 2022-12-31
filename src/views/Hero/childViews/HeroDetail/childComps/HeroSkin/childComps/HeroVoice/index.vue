<template>
  <div class="hero-voice scroll-white" @mousewheel.stop>
    <button
      class="voice flex"
      :class="{ 'active-width': currentIndex === index }"
      @click="play(item.link, index)"
      v-for="(item, index) in voices.length ? voices : $heroDetailStore.voice"
      ref="voiceRef"
      :key="index"
    >
      <div class="content" :class="{ 'active-color': currentIndex === index }">
        <span v-if="currentIndex !== index" class="text lib-one-line">
          {{ item.text }}</span
        >
        <marquee v-else class="text" scrollamount="8.5">
          {{ item.text }}</marquee
        >
        <i
          class="iconfont"
          :style="{ 'animation-duration': time + 's' }"
          :class="[
            currentIndex === index ? 'wzry-playing' : 'wzry-laba',
            { 'active-rotate': currentIndex === index },
            { 'active-color': currentIndex === index },
          ]"
        />
      </div>
    </button>
    <!--播放语音-->
    <PlayVoice
      @ended="ended"
      @info="voiceInfo"
      v-if="play_link"
      :link="play_link"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";
import heroDetailStore from "@/store/heroDetail";

const $heroDetailStore = heroDetailStore();
const voiceRef = ref();

const play_link = ref(""); //播放链接
const time = ref(0); //当前播放时长
const currentIndex = ref(-1); //当前播放索引
const voices = ref<Hero.Voice[]>([]); //英雄数据
const voice_length = ref(1); //当前语音数量

$heroDetailStore.setSkinToggleFn(async (hero_name, skin_name) => {
  await $heroDetailStore.setSkinVoice(hero_name, skin_name);
  if (voice_length.value === $heroDetailStore.voice.length) return;
  voice_length.value = $heroDetailStore.voice.length;
  nextTick(() => {
    voiceRef.value.forEach((item: HTMLElement, index: number) => {
      /* 决定是从左还是从右入场 */
      if (index % 2) {
        item.style.transform = "translateX(-100%) translateY(500%) scale(0)";
      } else {
        item.style.transform = "translateX(100%) translateY(500%) scale(0)";
      }
      setTimeout(() => {
        voices.value = $heroDetailStore.voice;
        item.style.transitionDelay = `${index / 15}s`; //入场间隔
        item.style.transform = "translateX(0%) translateY(0%) scale(1)";
        //动画结束后初始化
        setTimeout(() => {
          item.style.transitionDelay = "0s";
        }, 500);
      }, 500);
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
  if (currentIndex.value + 1 === voices.value!.length) {
    currentIndex.value += 1;
    return;
  }
  //等待播放动画结束后再播放
  play(voices.value![currentIndex.value + 1].link, currentIndex.value + 1);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
