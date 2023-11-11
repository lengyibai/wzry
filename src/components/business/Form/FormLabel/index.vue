<script setup lang="ts">
interface Props {
  /** 标题文字 */
  label: string;
  /** 标题宽度 */
  labelWidth?: string;
  /** 居中 */
  center?: boolean;
  /** 必填 */
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  label: "",
  labelWidth: "9.375rem",
});
</script>

<template>
  <div class="form-label" :class="{ center: center }">
    <div class="label" :style="{ width: labelWidth }">
      <span class="global_text-gradient"><i v-if="required" class="star">*</i>{{ label }}： </span>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
