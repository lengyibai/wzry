<script setup lang="ts">
import { ref } from "vue";

import switchStore from "@/store/switch";

interface Props {
  placeholder?: string; //输入框描述
  link?: string; //图片链接，用于修改原有的图片
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "请输入",
  link: "",
});

interface Emits {
  (e: "get-link", v: string): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const input_link = ref(""); //输入的链接

input_link.value = props.link;

$switchStore.$clickAudio("0o5c");

/* 确定 */
const handleConfirm = () => {
  emit("get-link", input_link.value);
  input_link.value = "";
  $switchStore.$clickAudio("36jn");
};
</script>

<template>
  <K-Dialog v-bind="$attrs" align="center">
    <input
      v-model="input_link"
      v-focus
      type="text"
      :placeholder="placeholder"
      @keyup.enter="handleConfirm"
    />
    <K-Button type="warning" @click="handleConfirm">确定</K-Button>
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
