<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
  width?: string;
  color?: string;
  fontSize?: string;
  align?: "center" | "left";
  borderColor?: string;
}
interface Emits {
  (e: "update:modelValue", v: string): void;
}

withDefaults(defineProps<Props>(), {
  modelValue: "冷弋白",
  placeholder: "请输入",
  width: "8em",
  color: "#fff",
  fontSize: "24px",
  align: "center",
  borderColor: "#fff",
});
const emit = defineEmits<Emits>();

/* 输入触发 */
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value);
};
</script>

<template>
  <input
    class="k-input"
    :placeholder="placeholder"
    type="text"
    :value="modelValue"
    :style="{
      width: width,
      color: color,
      fontSize: fontSize,
      textAlign: align,
      borderBottomColor: borderColor,
    }"
    @input="handleInput"
  />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
