<script setup lang="ts">
import { computed } from "vue";

import { AudioStore } from "@/store";
import { CONFIG } from "@/config";

interface Props {
  /** 选中状态 */
  modelValue: boolean | string;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  "update:modelValue": [v: boolean];
}>();

const $audioStore = AudioStore();

const icon = computed(() => `${CONFIG.BASE.IMGBED}/image/${$props.modelValue ? "select_true" : "select_false"}.png`);

const toggle = () => {
  $emit("update:modelValue", !$props.modelValue);
  $audioStore.play();
};
</script>

<template>
  <div class="k-check" @click="toggle">
    <img :class="{ checked: modelValue }" :src="icon" />
    <span :class="{ active: modelValue }">{{ $t("开启") }}</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
