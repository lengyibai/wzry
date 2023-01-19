<template>
  <div class="k-checkbox" @click="toggle">
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"
        ><i v-if="required" class="star">*</i>{{ label }}：
      </span>
    </div>
    <img class="cursor-pointer" :src="icon" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: boolean | string; //选中状态
  label?: string; //标题
  labelWidth?: string; //标题宽度
  required?: boolean; //是否必选
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: "标题",
  labelWidth: "150px",
  required: false,
});

const icon = computed(() => `${IMGBED}/image/select_${props.modelValue}.png`);

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
