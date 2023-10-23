<script setup lang="ts">
import { CONFIG } from "@/config";
import { SettingStore } from "@/store";

interface Props {
  /** 文字 */
  text: string;
  /** 小字 */
  desc: string;
}

defineProps<Props>();

const $settingStore = SettingStore();
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
    <img :src="CONFIG.BASE.IMGBED + '/image/login_btn.png'" alt="" @dragstart.prevent />
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
