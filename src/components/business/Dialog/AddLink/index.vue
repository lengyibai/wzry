<template>
  <K-Dialog v-bind="$attrs" align="center">
    <input
      v-model="input_link"
      v-focus
      type="text"
      :placeholder="placeholder"
      @input="$switchStore.$clickAudio('5zv8')"
      @keyup.enter="confirm"
    />
    <K-Button type="warning" @click="confirm">确定</K-Button>
  </K-Dialog>
</template>
<script setup lang="ts">
import { nextTick, ref } from "vue";

import switchStore from "@/store/switch";

interface Props {
  placeholder?: string; //输入框描述
  link?: string; //图片链接，用于修改原有的图片
}
interface Emits {
  (e: "get-link", v: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "请输入",
  link: "",
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const input_link = ref(""); //输入的链接

$switchStore.$clickAudio("0o5c");

nextTick(() => {
  input_link.value = props.link;
});

/* 确定 */
const confirm = () => {
  emit("get-link", input_link.value);
  input_link.value = "";
  $switchStore.$clickAudio("36jn");
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
