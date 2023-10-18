<script setup lang="ts">
import { AudioStore } from "@/store";

interface Props {
  /** 整体宽度 */
  width: string;
  /** 索引号 */
  modelValue: number;
  /** 选项文字 */
  option: string[];
}

withDefaults(defineProps<Props>(), {
  width: "6.25rem",
});
const $emit = defineEmits<{
  "update:modelValue": [v: number];
}>();

const $audioStore = AudioStore();

/* 选择 */
const handleSelect = (index: number) => {
  $emit("update:modelValue", index);
  $audioStore.play("n4r4");
};
</script>

<template>
  <div class="k-select">
    <div
      v-for="(item, index) in option"
      :key="index"
      class="option global_cursor-pointer"
      :style="{ width: width }"
      :class="{ active: modelValue === index }"
      @click="handleSelect(index)"
    >
      {{ item }}
    </div>
    <div class="active-bg" :style="{ width: width, transform: 'translateX(calc(' + modelValue + ' * 100%))' }"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
