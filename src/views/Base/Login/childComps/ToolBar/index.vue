<script setup lang="ts">
import { computed, ref } from "vue";

import { SettingStore, AudioStore } from "@/store";

interface Props {
  /** 显示公告按钮 */
  notice?: boolean;
}

withDefaults(defineProps<Props>(), {
  notice: true,
});
const $emit = defineEmits<{
  clicks: [v: string];
}>();

const $settingStore = SettingStore();
const $audioStore = AudioStore();

const toolbarRef = ref<HTMLElement>();

/** 静音 */
const muted = computed(() => $settingStore.config.muted);
/** 视频背景 */
const video_bg = computed(() => $settingStore.config.videoBg);
/** 静音图标 */
const icon = computed(() => (muted.value ? "wzry-jingyin-mianxing" : "wzry-laba-mianxing"));

/**
 * 点击某个按钮
 * @param v 点击静音或公告的标识符
 */
const handleTool = (v: string) => {
  if (v === "sound") {
    $audioStore.play("n4r4");
    $settingStore.saveConfig({ muted: !muted.value });
    return;
  }
  if (v === "readme") {
    $audioStore.play("n4r4");
  }
  $emit("clicks", v);
};

defineExpose({
  el: toolbarRef,
});
</script>

<template>
  <div ref="toolbarRef" class="tool-bar">
    <!-- 静音 -->
    <div v-if="video_bg" class="tool" title="静音">
      <div class="line"></div>
      <div
        class="box jingyin"
        :class="{ active: muted }"
        :style="{ opacity: muted ? 0.75 : 1 }"
        @click="handleTool('sound')"
      >
        <i class="iconfont" :class="icon" />
        <span class="text">静音</span>
      </div>
      <div class="base"></div>
    </div>

    <!-- README -->
    <div v-if="notice" class="tool" title="README">
      <div class="line"></div>
      <div class="box elastic" @click="handleTool('readme')">
        <i class="iconfont wzry-readme" />
        <span class="text">介绍</span>
      </div>
      <div class="base"></div>
    </div>

    <!-- 公告 -->
    <div v-if="notice" class="tool" title="公告">
      <div class="line"></div>
      <div class="box elastic" @click="handleTool('notice')">
        <i class="iconfont wzry-gonggao" />
        <span class="text">公告</span>
      </div>
      <div class="base"></div>
    </div>

    <!-- 开黑 -->
    <div v-if="notice" class="tool" title="开黑">
      <div class="line"></div>
      <div class="box elastic" @click="handleTool('team')">
        <i class="iconfont wzry-youxi" />
        <span class="text">开黑</span>
      </div>
      <div class="base"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
