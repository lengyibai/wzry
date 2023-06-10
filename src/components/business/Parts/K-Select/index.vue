<script setup lang="ts">
import { Store } from "@/store";

interface Props {
  width: string;
  modelValue: number; //索引号
  option: string[]; //选项文字
}
withDefaults(defineProps<Props>(), {
  width: "6.25rem",
});

interface Emits {
  (e: "update:modelValue", v: number): void;
}
const emit = defineEmits<Emits>();

const $controlStore = Store.control();

/* 选择 */
const handleSelect = (index: number) => {
  emit("update:modelValue", index);
  $controlStore.$audioStore("n4r4");
};
</script>

<template>
  <div class="k-select">
    <div
      v-for="(item, index) in option"
      class="option cursor-pointer"
      :style="{ width: width }"
      :class="{ active: modelValue === index }"
      @click="handleSelect(index)"
      :key="index"
    >
      {{ item }}
    </div>
    <div class="active-bg" :style="{ width: width, transform: 'translateX(calc(' + modelValue + ' * 100%))' }"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
