<script setup lang="ts">
import { ref, computed } from "vue";

import switchStore from "@/store/switch";
import settingStore from "@/store/setting";

interface Props {
  notice?: boolean; //显示公告按钮
}
withDefaults(defineProps<Props>(), {
  notice: true,
});

interface Emits {
  (e: "clicks", v: string): void;
}
const emit = defineEmits<Emits>();

const $settingStore = settingStore();
const $switchStore = switchStore();

//静音
const muted = computed(() => $settingStore.config.muted);

//静音图标
const icon = computed(() => {
  return muted.value ? "wzry-jingyin" : "wzry-laba";
});

/**
 * @description: 点击某个按钮
 * @param {string} v 点击静音或公告的标识符
 */
const handleTool = (v: string) => {
  emit("clicks", v);
  if (v === "sound") {
    $settingStore.saveConfig({ muted: !muted.value });
    $switchStore.$clickAudio("n4r4");
  }
};
</script>

<template>
  <div class="tool-bar">
    <div class="line"></div>
    <!-- 静音图标 -->
    <div
      class="box cursor-pointer"
      :class="{ active: muted }"
      :style="{ opacity: muted ? 0.75 : 1 }"
      @click="handleTool('sound')"
    >
      <i class="iconfont" :class="icon" />
    </div>

    <!-- 底座 -->
    <div class="base one"></div>

    <!-- 公告上线条 -->
    <div v-if="notice" class="line"></div>

    <!-- 公告图标 -->
    <div
      v-if="notice"
      class="box cursor-pointer notice"
      @click="handleTool('notice')"
    >
      <i class="iconfont wzry-gonggao" />
    </div>

    <!-- 底座 -->
    <div v-if="notice" class="base two"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
