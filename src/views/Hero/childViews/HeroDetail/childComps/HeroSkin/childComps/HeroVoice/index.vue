<script setup lang="ts">
import { ref, nextTick } from "vue";

import { HeroDetailStore, AudioStore } from "@/store";
import { $tool } from "@/utils";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { KMarquee } from "@/components/business";

const $heroDetail = HeroDetailStore();
const $audioStore = AudioStore();

const voiceRef = ref<HTMLElement[]>();
const voiceListRef = ref<HTMLElement>();

/** 播放链接 */
const play_link = ref("");
/** 当前播放时长 */
const duration = ref(0);
/** 当前播放索引 */
const current_index = ref(-1);
/** 语音列表 */
const voices = ref<Remote.Voice.Data["voice"]>([]);

const audioPlayer = new $tool.AudioPlayer({
  volume: 0.25,
  end() {
    current_index.value = -1;
  },
});

/* 切换语音时触发 */
$heroDetail.setSkinToggleFn((hero_id: number, skin_name: string) => {
  $heroDetail.setSkinVoice(hero_id, skin_name);
  if (!skin_name) {
    //为了切换关系
    voices.value = [];
    return;
  }

  //如果皮肤语音相同，则不需要播放出场动画
  if (voices.value[0]?.link === $heroDetail.skin_voice[0]?.link) return;

  nextTick(() => {
    if (!voiceRef.value) return;
    voiceRef.value.forEach((item: HTMLElement, index: number) => {
      /* 决定是从左还是从右入场 */
      if (index % 2) {
        item.style.transform = "translateX(-100%) translateY(500%) scale(0)";
      } else {
        item.style.transform = "translateX(100%) translateY(500%) scale(0)";
      }
      //设置语音列表，并播放入场动画
      setTimeout(() => {
        voices.value = $heroDetail.skin_voice;
        //入场间隔
        item.style.transitionDelay = `${index / 15}s`;
        item.style.transform = "translateX(0%) translateY(0%) scale(1)";

        //动画结束后初始化
        setTimeout(() => {
          item.style.transitionDelay = "0s";
        }, 500);
      }, 500);
    });

    //播放第一个语音
    setTimeout(() => {
      voiceListRef.value?.scroll({ top: 0 });
      if (
        current_index.value !== -1 &&
        voices.value[current_index.value].link !== play_link.value
      ) {
        current_index.value = -1;
      }

      voices.value[0] && play(voices.value[0].link, 0);
    }, 500);
  });
});

/* 悬浮语音 */
const handleEnter = () => {
  $audioStore.play("n4r4");
};

/* 点击播放 */
const play = (voice: string, index: number) => {
  //如果再次点击，则停止播放
  if (current_index.value === index) {
    audioPlayer.stop();
    return;
  }

  current_index.value = index;
  audioPlayer.play(voice).then((res) => {
    duration.value = res.duration;
  });
};
</script>

<template>
  <div ref="voiceListRef" class="hero-voice" @mousewheel.stop>
    <button
      v-for="(item, index) in voices.length ? voices : $heroDetail.skin_voice"
      ref="voiceRef"
      :key="index"
      v-mouse-tip="{
        text: MOUSE_TIP.lq42,
      }"
      class="voice"
      :class="{ 'active-width': current_index === index }"
      @click="play(item.link, index)"
      @mouseenter="handleEnter"
    >
      <div class="content" :class="{ 'active-color': current_index === index }">
        <KMarquee class="k-marquee" :duration="duration" :playing="current_index === index">{{
          item.text
        }}</KMarquee>
        <i
          class="iconfont"
          :style="{ 'animation-duration': duration + 's' }"
          :class="[
            current_index === index ? 'wzry-playing' : 'wzry-playactive',
            { 'active-rotate': current_index === index },
            { 'active-color': current_index === index },
          ]"
        />
      </div>
    </button>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
