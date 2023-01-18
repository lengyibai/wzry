<template>
  <div class="form-label" :class="{ center: center }">
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"
        ><i v-if="required" class="star">*</i>{{ label }}：
      </span>
    </div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
interface Props {
  label: string; //标题文字
  labelWidth?: string; //标题宽度
  center?: boolean; //是否居中
  required?: boolean; //是否必填
}

withDefaults(defineProps<Props>(), {
  label: "标题",
  labelWidth: "150px",
  center: false,
  required: false,
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
