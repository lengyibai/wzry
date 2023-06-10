<script setup lang="ts">
import { computed } from "vue";

import { Store } from "@/store";

interface Props {
  modelValue: boolean | string; //选中状态
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $controlStore = Store.control();

//选中/未选中图标
const checkIcon = computed(
  () => `${IMGBED}/image/${props.modelValue ? "check_true_yellow" : "check_false_yellow"}.png`
);

/* 选中按钮 */
const handleToggle = () => {
  emit("update:modelValue", !props.modelValue);
  $controlStore.$audioStore();
};
</script>

<template>
  <div class="remember-pwd cursor-pointer" @click="handleToggle">
    <img :src="checkIcon" @dragstart.prevent />
    <span class="lib-click">{{ $t("记住密码") }}</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
