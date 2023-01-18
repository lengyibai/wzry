<script setup lang="ts">
import switchStore from "@/store/switch";
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

const $switchStore = switchStore();

/* 选择 */
const handleSelect = (index: number) => {
  emit("update:modelValue", index);
  $switchStore.$clickAudio("tab");
};
</script>

<template>
  <div class="role-select">
    <div
      v-for="(item, index) in option"
      :key="index"
      class="option cursor-pointer"
      :class="{ active: modelValue === index }"
      @click="handleSelect(index)"
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
