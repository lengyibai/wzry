<script setup lang="ts">
import { ref } from "vue";

import { $tool } from "@/utils";

interface Props {
  /** 语音列表 */
  voices: Hero.Voice[];
}

defineProps<Props>();

const voiceRef = ref<HTMLElement>();

/** 当前播放索引 */
const current_index = ref(-1);
/** 语音播放器 */
const audioPlayer = new $tool.AudioPlayer({
  end() {
    current_index.value = -1;
  },
});

/* 点击播放 */
const handlePlay = (voice: string, index: number) => {
  //如果再次点击，则停止播放
  if (current_index.value === index) {
    audioPlayer.stop();
    return;
  }

  current_index.value = index;
  audioPlayer.play(voice);
};
</script>

<template>
  <div class="skin-voice" @mousewheel.stop>
    <button
      v-for="(item, index) in voices"
      ref="voiceRef"
      :key="index"
      class="voice"
      :class="{ 'active-width': current_index === index }"
      @click="handlePlay(item.link, index)"
    >
      <div class="content" :class="{ 'active-color': current_index === index }">
        <span v-if="current_index !== index" class="text global_one-line"> {{ item.text }}</span>
        <marquee v-else class="text" scrollamount="12.5"> {{ item.text }}</marquee>
      </div>
    </button>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
