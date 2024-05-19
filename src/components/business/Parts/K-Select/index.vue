<script setup lang="ts">
import { AudioStore } from "@/store";

interface Props {
  /** 整体宽度 */
  width: string;
  /** 选项文字 */
  option: string[];
}

withDefaults(defineProps<Props>(), {
  width: "6.25rem",
});

/** 索引号 */
const modelValue = defineModel<number>({ required: true });

const $audioStore = AudioStore();

/** @description 选择
 * @param index 选项索引
 */
const handleSelect = (index: number) => {
  modelValue.value = index;
  $audioStore.play("n4r4");
};
</script>

<template>
  <div class="k-select">
    <div
      v-for="(item, index) in option"
      :key="index"
      class="option"
      :style="{ width: width }"
      :class="{ active: modelValue === index }"
      @click="handleSelect(index)"
    >
      {{ item }}
    </div>
    <div
      class="active-bg"
      :style="{
        width: width,
        transform: `translateX(calc(${modelValue} * 100%))`,
      }"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
