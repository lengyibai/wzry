<script setup lang="ts">
import { AudioStore } from "@/store";

interface Props {
  /** 是否显示 */
  modelValue?: boolean;
}
defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const $emit = defineEmits<Emits>();

const $audioStore = AudioStore();

const IMGBED = window.IMGBED;

/* 关闭 */
const handleClose = () => {
  $emit("update:modelValue", false);
  $audioStore.play("6xc6");
};
</script>

<template>
  <div class="readme">
    <i class="iconfont wzry-guanbi global_cursor-pointer" @click="handleClose"></i>
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
