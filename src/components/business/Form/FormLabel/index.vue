<script setup lang="ts">
interface Props {
  label: string; //标题文字
  labelWidth?: string; //标题宽度
  center?: boolean; //居中
  required?: boolean; //必填
}
withDefaults(defineProps<Props>(), {
  label: "",
  labelWidth: "9.375rem",
});
</script>

<template>
  <div class="form-label" :class="{ center: center }">
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"><i v-if="required" class="star">*</i>{{ label }}： </span>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
