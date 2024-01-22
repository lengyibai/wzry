<script setup lang="ts">
import { computed } from "vue";

import { AudioStore } from "@/store";

/** 是否选中 */
const modelValue = defineModel({ required: true });

const $audioStore = AudioStore();

/** 是否选中图标 */
const checkIcon = computed(() => {
  return modelValue.value ? "spirit_misc-check_true_yellow" : "spirit_misc-check_false_yellow";
});

/* 选中按钮 */
const handleToggle = () => {
  modelValue.value = !modelValue.value;
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
