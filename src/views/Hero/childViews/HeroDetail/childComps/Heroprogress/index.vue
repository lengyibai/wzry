<script setup lang="ts">
import switchStore from "@/store/switch";
interface Props {
  index: number; //滚动索引
  pageName: string[]; //滚动名称组
}
defineProps<Props>();

interface Emits {
  (e: "toggle", v: number): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

/* 设置进度 */
const handleToggle = (index: number) => {
  emit("toggle", index);
  $switchStore.$clickAudio("n4r4");
};
</script>

<template>
  <!-- 滚动进度 -->
  <div class="hero-progress">
    <div v-for="(item, i) in pageName" class="page-index" :class="{ active: index === i + 1 }" :key="i">
      <div v-show="index !== i + 1" class="tab flex" @click="handleToggle(i + 1)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
