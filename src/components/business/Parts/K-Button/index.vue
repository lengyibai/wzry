<script setup lang="ts">
interface Props {
  /** 类型 */
  type?: "info" | "error" | "warning";
  /** 是否禁用 */
  disabled?: boolean;
}
withDefaults(defineProps<Props>(), {
  type: "info",
});

/** 类名 */
const class_name = {
  info: "spirit_btn-info",
  error: "spirit_btn-error",
  warning: "spirit_btn-warning",
};
</script>

<template>
  <div
    :disabled="disabled"
    :class="[type, { disabled: disabled }, class_name[type]]"
    class="k-button"
  >
    <div class="content">
      <slot>按钮</slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
