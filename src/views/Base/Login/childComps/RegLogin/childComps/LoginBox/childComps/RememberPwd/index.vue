<script setup lang="ts">
import { computed } from "vue";

import { AudioStore } from "@/store";
import { CONFIG } from "@/config";
import { $concise } from "@/utils";

interface Props {
  /** 是否选中 */
  modelValue: boolean | string;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  "update:modelValue": [v: boolean];
}>();

const $audioStore = AudioStore();

const { getImgLink } = $concise;

/** 是否选中图标 */
const checkIcon = computed(() => getImgLink(`${$props.modelValue ? "check_true_yellow" : "check_false_yellow"}`));

/* 选中按钮 */
const handleToggle = () => {
  $emit("update:modelValue", !$props.modelValue);
  $audioStore.play();
};
</script>

<template>
  <div class="remember-pwd" @click="handleToggle">
    <img class="icon" :src="checkIcon" />
    <span class="text">记住密码</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
