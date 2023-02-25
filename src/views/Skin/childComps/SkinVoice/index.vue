<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";

import heroDetailStore from "@/store/heroDetail";

interface Props {
  voices: Hero.Voice[]; //语音列表
}
defineProps<Props>();

const $heroDetailStore = heroDetailStore();

const voiceRef = ref();

let voice_length = 1; //当前语音数量

const play_link = ref(""); //播放链接
const current_index = ref(-1); //当前播放索引

/* 点击播放 */
const handlePlay = (voice: string, index: number) => {
  //如果再次点击，则停止播放
  if (current_index.value === index) {
    EmitEnded();
    return;
  }

  current_index.value = index;
  play_link.value = voice;
};

/* 语音播放结束后触发 */
let EmitEnded = () => {
  current_index.value = -1;
  play_link.value = "";
};

onMounted(() => {
  //设置需要切换皮肤触发的函数
  $heroDetailStore.setSkinToggleFn(async (hero_name, skin_name) => {
    await $heroDetailStore.setSkinVoice(hero_name, skin_name);
    if (voice_length === $heroDetailStore.skin_voice.length) return;
    voice_length = $heroDetailStore.skin_voice.length;

    nextTick(() => {
      voiceRef.value &&
        voiceRef.value.forEach((item: HTMLElement, index: number) => {
          //决定是从左还是从右入场
          if (index % 2) {
            item.style.transform = "translateX(-100%) translateY(500%) scale(0)";
          } else {
            item.style.transform = "translateX(100%) translateY(500%) scale(0)";
          }

          //播放第一个语音
          setTimeout(() => {
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
});
</script>

<template>
  <div class="skin-voice" @mousewheel.stop>
    <button
      v-for="(item, index) in voices"
      class="voice flex"
      :class="{ 'active-width': current_index === index }"
      @click="handlePlay(item.link, index)"
      ref="voiceRef"
      :key="index"
    >
      <div class="content" :class="{ 'active-color': current_index === index }">
        <span v-if="current_index !== index" class="text lib-one-line"> {{ item.text }}</span>
        <marquee v-else class="text" scrollamount="12.5"> {{ item.text }}</marquee>
      </div>
    </button>
    <!--播放语音-->
    <PlayVoice v-if="play_link" :link="play_link" @ended="EmitEnded" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
