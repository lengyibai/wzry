<script setup lang="ts">
import { ref } from "vue";

interface Props {
  /** 语音列表 */
  voices: Hero.Voice[];
}
defineProps<Props>();

const voiceRef = ref();

/** 播放链接 */
const play_link = ref("");
/** 当前播放索引 */
const current_index = ref(-1);

/* 点击播放 */
const handlePlay = (voice: string, index: number) => {
  //如果再次点击，则停止播放
  if (current_index.value === index) {
    onEnded();
    return;
  }

  current_index.value = index;
  play_link.value = voice;
};

/* 语音播放结束后触发 */
const onEnded = () => {
  current_index.value = -1;
  play_link.value = "";
};
</script>

<template>
  <div class="skin-voice" @mousewheel.stop>
    <button
      v-for="(item, index) in voices"
      ref="voiceRef"
      :key="index"
      class="voice flex"
      :class="{ 'active-width': current_index === index }"
      @click="handlePlay(item.link, index)"
    >
      <div class="content" :class="{ 'active-color': current_index === index }">
        <span v-if="current_index !== index" class="text lib-one-line"> {{ item.text }}</span>
        <marquee v-else class="text" scrollamount="12.5"> {{ item.text }}</marquee>
      </div>
    </button>
    <!--播放语音-->
    <PlayVoice v-if="play_link" :link="play_link" @ended="onEnded" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
