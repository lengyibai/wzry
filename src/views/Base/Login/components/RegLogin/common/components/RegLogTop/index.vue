<script setup lang="ts">
import { vParticleEffect } from "@/directives";
import { SettingStore } from "@/store";
import { _getImgLink } from "@/utils/concise";

interface Props {
  /** 标题 */
  title: string;
}
defineProps<Props>();

const $settingStore = SettingStore();
</script>

<template>
  <!-- logo -->
  <div
    v-particle-effect="{
      down: true,
      colors: ['#EFD68F', '#E0B34E'],
      enable: $settingStore.config.particle,
    }"
    class="reg-log-top__logo"
  >
    <img class="logo" :src="_getImgLink('login_logo')" alt="logo" />
  </div>

  <!-- 标题 -->
  <div class="reg-log-top__title">
    {{ title }}
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
