<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label?: string; //标题
  labelWidth?: string; //标题宽度
  modelValue: boolean | string; //选中状态
  required?: boolean; //必选
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  label: "标题",
  labelWidth: "150px",
  modelValue: false,
  required: false,
});

const icon = computed(() => `${IMGBED}/image/select_${props.modelValue}.png`);

/* 切换选中/未选中 */
const handleToggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div class="k-checkbox" @click="handleToggle">
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"><i v-if="required" class="star">*</i>{{ label }}： </span>
    </div>
    <img class="cursor-pointer" :src="icon" @dragstart.prevent />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
