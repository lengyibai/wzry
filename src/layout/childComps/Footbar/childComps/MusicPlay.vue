<template>
  <div class="MusicPlay" :style="{ width: progress + '%' }" @click="playToggle"></div>
</template>
<script setup>
import {
  ref, watch, toRefs, onBeforeUnmount,
} from 'vue';
import { $random, $potEoPct, $frameInterval } from '@/utils/index.js';

const props = defineProps({
  playProgress: {
    type: Number,
    default: 0,
  },
});
const { playProgress } = toRefs(props);

const bgmIndex = ref(0); //音乐索引
const progress = ref(0); //播放进度
const status = ref(true); //当前音乐状态
const timer = ref(null); //进度条计时器
const bgm = new Audio();
const getIcon = (src) => `/music/${src}.mp3`;
const musics = [
  getIcon('wzzg'), //王者战歌
  getIcon('yxgl'), //英雄归来
  getIcon('ryzt'), //荣耀主题
  getIcon('ryzl'), //荣耀之路
  getIcon('wzbr'), //王者冰刃
  getIcon('wwkh'), //五五狂欢
];

async function musicPlay(isReset = true) {
  // 判断是否为播放下一首，否则不执行随机播放，是则继续播放当前
  if (isReset) {
    bgmIndex.value = $random(0, musics.length - 1);
    bgm.src = musics[bgmIndex.value];
    bgm.volume = 0.25;
  }

  bgm.play().catch(() => {
    // console.error('音频播放失败，用户未与页面交互');
  });

  /* 实时设置播放进度 */
  timer.value = $frameInterval(() => {
    progress.value = $potEoPct(bgm.currentTime / bgm.duration);
  }, 300);

  /* 播放结束后执行下一次播放 */
  bgm.onended = () => {
    bgmIndex.value = $random(0, 3);
    setTimeout(() => {
      musicPlay();
    }, 1000);
  };
}
musicPlay(); //如果从登录页过来，可直接播放背景音乐

/* 监听底部点击 */
// watch(playProgress, (v) => {
//   bgm.currentTime = bgm.duration * v;
// });

function fn() {
  musicPlay(false);
  document.body.removeEventListener('mousedown', fn);
}
document.body.addEventListener('mousedown', fn); //如果在管理页刷新，则需要点击才能播放

/* 控制播放和暂停 */
function playToggle(e) {
  status.value = !status.value;
  e.stopPropagation(); //禁止冒泡：当前进度条和底部都设置了点击事件
  if (!status.value) {
    bgm.pause();
    clearInterval(timer); //暂停清除定时器
  } else {
    musicPlay(false); //继续播放
  }
}

onBeforeUnmount(() => {
  bgm.pause();
});
</script>
<style scoped lang="less">
.MusicPlay {
  width: 0%;
  height: 5px;
  background-color: var(--theme-color-five);
  transition: all 0.25s ease-out;
  &:hover {
    background-color: var(--red);
  }
}
</style>
