<script setup lang="ts">
import { computed } from "vue";

import switchStore from "@/store/switch";

interface Props {
  modelValue: boolean | string; //选中状态
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const icon = computed(() => `${IMGBED}/image/${props.modelValue ? "select_true" : "select_false"}.png`);

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
  $switchStore.$clickAudio();
};
</script>

<template>
  <div class="k-check cursor-pointer" @click="toggle">
    <img :class="{ checked: modelValue }" :src="icon" @dragstart.prevent />
    <span :class="{ active: modelValue }">开启</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
