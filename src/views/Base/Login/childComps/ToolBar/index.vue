<script setup lang="ts">
import { ref, computed } from "vue";

import settingStore from "@/store/setting";

interface Emits {
  (e: "clicks", v: string): void;
}
const emit = defineEmits<Emits>();

const $settingStore = settingStore();

const muted = ref(false);

muted.value = !$settingStore.config.loginSound;

const icon = computed(() => {
  return muted.value ? "wzry-jingyin" : "wzry-laba";
});

/* 点击某个按钮 */
const handleShowNotice = (v: string) => {
  emit("clicks", v);
  if (v === "sound") {
    muted.value = !muted.value;
    $settingStore.saveConfig({ loginSound: !muted.value });
  }
};
</script>

<template>
  <div class="tool-bar">
    <div class="line"></div>
    <div
      class="box cursor-pointer"
      @click="handleShowNotice('sound')"
      :style="{ opacity: muted ? 0.75 : 1 }"
    >
      <i class="iconfont" :class="icon" />
    </div>
    <div class="line"></div>
    <div class="box cursor-pointer" @click="handleShowNotice('notice')">
      <i class="iconfont wzry-gonggao" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
