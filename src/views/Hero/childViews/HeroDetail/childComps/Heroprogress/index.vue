<script setup lang="ts">
import { AudioStore } from "@/store";

interface Props {
  /** 滚动索引 */
  index: number;
}

defineProps<Props>();
const $emit = defineEmits<{
  toggle: [v: number];
}>();

const $audioStore = AudioStore();

/** 滚动索引标题 */
const page_name = ["英雄资料", "技能信息", "皮肤语音"];

/* 设置进度 */
const handleToggle = (index: number) => {
  $emit("toggle", index);
  $audioStore.play("n4r4");
};
</script>

<template>
  <!-- 滚动进度 -->
  <div class="hero-progress">
    <div v-for="(item, i) in page_name" :key="i" class="page-index" :class="{ active: index === i + 1 }">
      <div v-show="index !== i + 1" class="tab" @click="handleToggle(i + 1)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
