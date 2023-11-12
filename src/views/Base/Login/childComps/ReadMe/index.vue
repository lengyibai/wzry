<script setup lang="ts">
import { AudioStore } from "@/store";
import { $concise } from "@/utils";

interface Props {
  /** 是否显示 */
  modelValue?: boolean;
}

defineProps<Props>();
const $emit = defineEmits<{
  "update:modelValue": [v: boolean];
}>();

const $audioStore = AudioStore();

const { getHtmlLink } = $concise;

/* 关闭 */
const handleClose = () => {
  $emit("update:modelValue", false);
  $audioStore.play("6xc6");
};
</script>

<template>
  <div class="readme">
    <iframe
      class="readme__iframe"
      :src="getHtmlLink('readme')"
      marginheight="0"
      marginwidth="0"
      frameborder="0"
      scrolling="auto"
    ></iframe>
    <i class="iconfont wzry-guanbi readme__close" @click="handleClose"></i>
  </div>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>
