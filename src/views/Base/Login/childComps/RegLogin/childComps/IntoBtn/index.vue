<script setup lang="ts">
import { SettingStore } from "@/store";

interface Props {
  /** 文字 */
  text: string;
  /** 小字 */
  desc: string;
}

defineProps<Props>();

const $settingStore = SettingStore();

const IMGBED = window.IMGBED;
</script>

<template>
  <button
    v-particle="{
      enable: $settingStore.config.particle,
    }"
    class="into-btn"
  >
    <span>{{ text }}</span>
    <span>{{ desc }}</span>
    <img :src="IMGBED + '/image/login_btn.png'" alt="" @dragstart.prevent />
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
