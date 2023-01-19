<script setup lang="ts">
import settingStore from "@/store/setting";

interface Props {
  text: string;
  desc: string;
}
withDefaults(defineProps<Props>(), {
  text: "",
  desc: "",
});

const $settingStore = settingStore();
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
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
