<template>
  <div class="K-Check cursor-pointer" @click="toggle">
    <img :src="icon" />
    <span :class="{ active: modelValue }">开启</span>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: boolean | string; //选中状态
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "change", v: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<Emits>();

const icon = computed(
  () =>
    `${IMGBED}/image/${props.modelValue ? "select_true" : "select_false"}.png`
);

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
  emit("change", !props.modelValue);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
