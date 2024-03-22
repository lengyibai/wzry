<script setup lang="ts">
import _debounce from "lodash/debounce";

import { AudioStore, SettingStore } from "@/store";
import { vParticleEffect } from "@/directives";
import { _getImgLink } from "@/utils/concise";

interface Props {
  /** 文字 */
  text: string;
  /** 小字 */
  desc: string;
}

defineProps<Props>();

const $settingStore = SettingStore();
const $audioStore = AudioStore();

/* 播放音效 */
const debouncePlayAudio = _debounce(
  () => {
    $audioStore.play("e84n");
  },
  1000,
  {
    leading: true,
    trailing: false,
  },
);
</script>

<template>
  <button
    v-particle-effect="{
      colors: ['#986B33', '#CEA64E'],
      enable: $settingStore.config.particle,
    }"
    class="into-btn"
    @click="debouncePlayAudio"
  >
    <span class="text">{{ text }}</span>
    <span class="desc">{{ desc }}</span>
    <img class="bg" :src="_getImgLink('login_btn')" alt="" />
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
