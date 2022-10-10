<template>
  <div class="HeroVoice">
    <div
      class="voice flex cursor-pointer"
      :class="{ active: currentIndex === index }"
      :style="{ 'animation-duration': time + 's' }"
      @click="play(item.voice, index)"
      v-for="(item, index) in voices"
      ref="voice"
      :key="index"
    >
      <span v-if="currentIndex !== index"> {{ item.desc }}</span>
      <transition name="fade">
        <LibSvg
          v-if="currentIndex === index"
          :svg="icon"
          color="#fff"
          enter-color="var(--blue)"
          down-color="var(--red)"
          size="35px"
        />
      </transition>
    </div>
    <!--播放语音-->
    <PlayVoice @ended="ended" @info="voiceInfo" v-if="play_link" :link="play_link" />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import heroStore from '@/store/hero.js';
import icon from './svg/index.js';

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;

const voices = hero_data.voices; //语音数据

const currentIndex = ref(null); //当前播放索引
const time = ref(0); //当前播放时长
const voice = ref();
let ended = null;
const play_link = ref('');

onMounted(() => {
  /* 出场动画 */
  voice.value.forEach((item, index) => {
    item.style.transitionDelay = `${index / 15}s`; //入场间隔
    /* 决定是从左还是从右入场 */
    if (index % 2) {
      item.style.transform = 'translateX(-100%) translateY(500%) scale(0)';
    } else {
      item.style.transform = 'translateX(100%) translateY(500%) scale(0)';
    }
    setTimeout(() => {
      item.style.transform = 'translateX(0%) translateY(0%) scale(1)';
      /* 动画结束后初始化 */
      setTimeout(() => {
        item.style.transitionDelay = '0s';
      }, 1000);
    });
  });
});

/* 点击播放 */
const play = (voice, index) => {
  // 如果再次点击，则停止播放
  if (currentIndex.value === index) {
    currentIndex.value = null;
    play_link.value = '';
    return;
  }
  currentIndex.value = index;
  setTimeout(() => {
    play_link.value = voice;
  }, 250);
};

const voiceInfo = (info) => {
  time.value = info.duration;
};

/* 语音播放结束后触发 */
ended = () => {
  /* 如果播放完最后一个，则停止播放 */
  if (currentIndex.value + 1 === voices.length) {
    currentIndex.value += 1;
    return;
  }
  /* 等待播放动画结束后再播放 */
  setTimeout(() => {
    play(voices[currentIndex.value + 1].voice, currentIndex.value + 1);
  }, 250);
};
</script>
<style scoped lang="less">
.HeroVoice {
  position: absolute;
  top: 15%;
  left: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  transform: translateX(-50%);
  .voice {
    overflow: hidden;
    padding: 0 100px;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--white);
    white-space: nowrap;
    transition: all 0.5s;
    &:hover {
      height: 60px;
      color: var(--blue);
      transition: all 0.25s cubic-bezier(0.18, 0.89, 0, 1.41) !important;
    }
    span {
      font-size: 16px;
    }
  }
}
.active {
  padding: 0 !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50%;
  animation: rotate 0s 0.5s linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
