<script setup lang="ts">
import switchStore from "@/store/switch";
interface Props {
  modelValue?: boolean;
}
defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

/* 关闭 */
const handleClose = () => {
  emit("update:modelValue", false);
  $switchStore.$clickAudio("6xc6");
};
</script>

<template>
  <div class="readme">
    <i class="iconfont wzry-guanbi cursor-pointer" @click="handleClose"></i>
    <iframe
      class="iframe"
      :src="IMGBED + '/html/readme.html'"
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
