<script setup lang="ts">
import { AudioStore } from "@/store";

interface Props {
  /** 选项 */
  option: string[];
}

defineProps<Props>();

/** 选择的索引号 */
const modelValue = defineModel({ required: true });

const $audioStore = AudioStore();

/* 选择 */
const handleSelect = (index: number) => {
  modelValue.value = index;
  $audioStore.play("n4r4");
};
</script>

<template>
  <div class="role-select">
    <div
      v-for="(item, index) in option"
      :key="index"
      class="option"
      :class="{ active: modelValue === index }"
      @click="handleSelect(index)"
    >
      {{ item }}
    </div>
    <div class="active-bg" :style="{ transform: `translateX(calc(${modelValue} * 100%))` }"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
