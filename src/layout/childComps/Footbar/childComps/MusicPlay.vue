<template>
  <div
    class="music-play"
    :style="{ width: progress + '%' }"
    @click="playToggle"
  ></div>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { $potEoPct, $frameInterval } from "@/utils";

interface Props {
  playProgress: number;
}

const props = withDefaults(defineProps<Props>(), {
  playProgress: 0,
});

const bgmIndex = ref(0); //音乐索引
const progress = ref(0); //播放进度
const status = ref(true); //当前音乐状态
const bgm = new Audio();
const musics = [
  "wzzg.mp3", //王者战歌
  "yxgl.mp3", //英雄归来
  "ryzt.mp3", //荣耀主题
  "ryzl.mp3", //荣耀之路
  "wzbr.mp3", //王者冰刃
  "cac.mp3", //永远的长安城
  "gjb.mp3", //冠军杯
  "wzcz.mp3", //王者出征
  "wzdl.mp3", //王者登录
  "wzzj.mp3", //王者诸将
  "ygxy.mp3", //云宫迅音
];
musics.sort(() => 0.5 - Math.random()); //打乱顺序
async function musicPlay(isReset = true) {
  // 判断是否为播放下一首，否则不执行随机播放，是则继续播放当前
  if (isReset) {
    if (bgmIndex.value === musics.length) {
      bgmIndex.value = 0;
    }

    bgm.src =
      "https://lengyibai.gitee.io/wzry-material/music/" +
      musics[bgmIndex.value];
    bgm.volume = 0.25;
    bgmIndex.value += 1;
  }

  bgm.play().catch(() => {
    // console.error('音频播放失败，用户未与页面交互');
  });

  /* 实时设置播放进度 */
  $frameInterval(() => {
    progress.value = $potEoPct(bgm.currentTime / bgm.duration);
  }, 500);

  /* 播放结束后执行下一次播放 */
  bgm.onended = () => {
    musicPlay();
  };
}
musicPlay(); //如果从登录页过来，可直接播放背景音乐

/* 监听底部点击 */
watch(
  () => props.playProgress,
  (v) => {
    bgm.currentTime = bgm.duration * v;
  }
);

function fn() {
  musicPlay(false);
  document.body.removeEventListener("mousedown", fn);
}
document.body.addEventListener("mousedown", fn); //如果在管理页刷新，则需要点击才能播放

/* 控制播放和暂停 */
function playToggle(e: MouseEvent) {
  status.value = !status.value;
  e.stopPropagation(); //禁止冒泡：当前进度条和底部都设置了点击事件
  if (!status.value) {
    bgm.pause();
  } else {
    musicPlay(false); //继续播放
  }
}

onBeforeUnmount(() => {
  bgm.pause();
});
</script>
<style scoped lang="less">
.music-play {
  width: 0%;
  height: 5px;
  background-color: var(--theme-color-five);
  transition: all 0.25s ease-out;

  &:hover {
    background-color: var(--red);
  }
}
</style>
