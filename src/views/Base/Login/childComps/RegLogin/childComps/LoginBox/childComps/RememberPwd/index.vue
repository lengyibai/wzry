<script setup lang="ts">
import { computed } from "vue";

import { AudioStore } from "@/store";

interface Props {
  /** 是否选中 */
  modelValue: boolean | string;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  "update:modelValue": [v: boolean];
}>();

const $audioStore = AudioStore();

/** 是否选中图标 */
const checkIcon = computed(() => {
  return $props.modelValue ? "spirit_msic-check_true_yellow" : "spirit_msic-check_false_yellow";
});

/* 选中按钮 */
const handleToggle = () => {
  $emit("update:modelValue", !$props.modelValue);
  $audioStore.play();
};
</script>

<template>
  <div class="remember-pwd" @click="handleToggle">
    <div class="icon" :class="checkIcon"></div>
    <span class="text">记住密码</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
