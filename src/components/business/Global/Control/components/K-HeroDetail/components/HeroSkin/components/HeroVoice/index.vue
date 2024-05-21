<script setup lang="ts">
import { ref, nextTick } from "vue";

import { HeroDetailStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { KMarquee } from "@/components/business";
import { _AudioPlayer, _promiseTimeout } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";

const $heroDetail = HeroDetailStore();

const { playAudio } = usePlayAudio();

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
/** 音频播放器 */
const audioPlayer = new _AudioPlayer({
  volume: 0.25,
  end() {
    current_index.value = -1;
  },
});

/* 切换语音时触发 */
$heroDetail.setSkinToggleFn(async (hero_id: number, skin_name: string) => {
  await $heroDetail.setSkinVoice(hero_id, skin_name);
  if (!skin_name) {
    //为了切换关系
    voices.value = [];
    return;
  }

  //如果皮肤语音相同，则不需要播放入场动画
  if (voices.value[0]?.link === $heroDetail.skin_voice[0]?.link) return;

  nextTick(async () => {
    if (!voiceRef.value) return;

    await _promiseTimeout(750);
    voices.value = $heroDetail.skin_voice;

    setTimeout(() => {
      //如果上一次正在播放皮肤语音的索引与当前即将播放皮肤语音的索引相同，则重置索引
      if (
        current_index.value !== -1 &&
        voices.value[current_index.value].link !== play_link.value
      ) {
        current_index.value = -1;
      }
    }, 500);
  });
});

/* 悬浮语音 */
const handleEnter = () => {
  playAudio("n4r4");
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
  <div
    ref="voiceListRef"
    v-scroll-virtualization
    class="hero-voice"
    @mousewheel.stop
    @touchstart.stop
  >
    <transition-group name="voice-list">
      <div
        v-for="(item, index) in voices.length ? voices : $heroDetail.skin_voice"
        ref="voiceRef"
        :key="item.link"
        v-mouse-tip="{
          text: MOUSE_TIP.sg22,
        }"
        class="voice"
        :style="{
          transitionDelay: `${index * 0.1}s`,
        }"
        :class="{ 'active-width': current_index === index }"
        @click="play(item.link, index)"
        @mouseenter="handleEnter"
        @touchstart="handleEnter"
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
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
