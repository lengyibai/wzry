<script setup lang="ts">
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { AudioStore } from "@/store";

interface Props {
  /** 滚动索引 */
  index: number;
  /** 滚动索引标题 */
  option: string[];
}

defineProps<Props>();
const $emit = defineEmits<{
  toggle: [v: number];
}>();

const $audioStore = AudioStore();

/* 设置进度 */
const handleToggle = (index: number) => {
  $emit("toggle", index);
  $audioStore.play("n4r4");
};
</script>

<template>
  <!-- 滚动进度 -->
  <div class="hero-progress">
    <div
      v-for="(item, i) in option"
      :key="i"
      v-mouse-tip="{
        text: MOUSE_TIP.mi32,
      }"
      class="page-index"
      :class="{ active: index === i + 1 }"
      @click="handleToggle(i + 1)"
    >
      <div v-show="index !== i + 1" class="tab">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
