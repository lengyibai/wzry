<script setup lang="ts">
interface Props {
  modelValue?: boolean;
}
defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

/* 关闭 */
const handleClose = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <div
    class="readme"
    :class="{
      'readme-hide': !modelValue,
    }"
  >
    <i class="iconfont wzry-guanbi" @click="handleClose"></i>
    <iframe
      class="iframe"
      src="https://lengyibai.gitee.io/wzry/README"
      marginheight="0"
      marginwidth="0"
      frameborder="0"
      scrolling="auto"
    ></iframe>
  </div>
</template>
<style lang="less" scoped>
@import url("./index.less");
</style>
