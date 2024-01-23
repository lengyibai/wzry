<script setup lang="ts">
import { SettingStore } from "@/store";
import { vParticle } from "@/directives";
import { $concise } from "@/utils";

interface Props {
  /** 文字 */
  text: string;
  /** 小字 */
  desc: string;
}

defineProps<Props>();

const { getImgLink } = $concise;

const $settingStore = SettingStore();
</script>

<template>
  <button
    v-particle="{
      enable: $settingStore.config.particle,
    }"
    class="into-btn"
  >
    <span class="text">{{ text }}</span>
    <span class="desc">{{ desc }}</span>
    <img class="bg" :src="getImgLink('login_btn')" alt="" />
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
