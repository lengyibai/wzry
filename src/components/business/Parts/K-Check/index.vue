<script setup lang="ts">
import { computed } from "vue";

import audioStore from "@/store/modules/audio";

interface Props {
  modelValue: boolean | string; //选中状态
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $audioStore = audioStore();

const icon = computed(() => `${IMGBED}/image/${props.modelValue ? "select_true" : "select_false"}.png`);

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
  $audioStore.play();
};
</script>

<template>
  <div class="k-check cursor-pointer" @click="toggle">
    <img :class="{ checked: modelValue }" :src="icon" @dragstart.prevent />
    <span :class="{ active: modelValue }">{{ $t("开启") }}</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
