<script setup lang="ts">
import { computed } from "vue";

import { AudioStore } from "@/store";
import { t } from "@/language";

interface Props {
  text?: string;
}
withDefaults(defineProps<Props>(), { text: t("开启") });

/** 是否锁定 */
const modelValue = defineModel<boolean>({ required: true });

const $audioStore = AudioStore();

/** 切换图标 */
const icon = computed(() => {
  return modelValue.value ? "spirit_misc-select_true" : "spirit_misc-select_false";
});

const toggle = () => {
  modelValue.value = !modelValue.value;
  $audioStore.play();
};
</script>

<template>
  <div class="k-check" @click="toggle">
    <div class="select" :class="[icon, { checked: modelValue }]"></div>
    <span :class="{ active: modelValue }">{{ text }}</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
