<script setup lang="ts">
interface Props {
  modelValue: number;
  option: string[];
}
interface Emits {
  (e: "update:modelValue", v: number): void;
}

withDefaults(defineProps<Props>(), {
  modelValue: 0,
  option: () => [],
});
const emit = defineEmits<Emits>();

/* 选择 */
const handleSelect = (index: number) => {
  emit("update:modelValue", index);
};
</script>

<template>
  <div class="role-select">
    <div
      class="option cursor-pointer"
      :class="{ active: modelValue === index }"
      v-for="(item, index) in option"
      @click="handleSelect(index)"
      :key="index"
    >
      {{ item }}
    </div>
    <div
      class="active-bg"
      :style="{ transform: 'translateX(calc(' + modelValue + ' * 100%))' }"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
