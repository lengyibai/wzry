<script setup lang="ts">
import { AudioStore } from "@/store";

interface Props {
  index: number; //滚动索引
}
defineProps<Props>();

interface Emits {
  (e: "toggle", v: number): void;
}
const emit = defineEmits<Emits>();

const $audioStore = AudioStore();

const page_name = ["英雄资料", "技能信息", "皮肤语音"]; //滚动索引标题

/* 设置进度 */
const handleToggle = (index: number) => {
  emit("toggle", index);
  $audioStore.play("n4r4");
};
</script>

<template>
  <!-- 滚动进度 -->
  <div class="hero-progress">
    <div v-for="(item, i) in page_name" :key="i" class="page-index" :class="{ active: index === i + 1 }">
      <div v-show="index !== i + 1" class="tab flex" @click="handleToggle(i + 1)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
