<script setup lang="ts">
import settingStore from "@/store/setting";

interface Props {
  text: string; //文字
  desc: string; //小字
}
defineProps<Props>();

const $settingStore = settingStore();

const IMGBED = window.IMGBED; //全局图床链接
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
