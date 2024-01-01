<script setup lang="ts">
import { computed } from "vue";

import { AudioStore } from "@/store";

interface Props {
  /** 选中状态 */
  modelValue: boolean | string;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  "update:modelValue": [v: boolean];
}>();

const $audioStore = AudioStore();

const icon = computed(() => {
  return $props.modelValue ? "spirit_msic-select_true" : "spirit_msic-select_false";
});

const toggle = () => {
  $emit("update:modelValue", !$props.modelValue);
  $audioStore.play();
};
</script>

<template>
  <div class="k-check" @click="toggle">
    <div class="select" :class="[icon, { checked: modelValue }]"></div>
    <span :class="{ active: modelValue }">{{ $t("开启") }}</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
