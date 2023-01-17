<template>
  <K-Dialog v-bind="$attrs" align="center">
    <input
      v-model="input_link"
      v-focus
      type="text"
      :placeholder="placeholder"
      @keyup.enter="confirm"
    />
    <K-Button type="warning" @click="confirm">确定</K-Button>
  </K-Dialog>
</template>
<script setup lang="ts">
import { nextTick, ref } from "vue";

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

const input_link = ref(""); //输入的链接

nextTick(() => {
  input_link.value = props.link;
});

/* 确定 */
const confirm = () => {
  emit("get-link", input_link.value);
  input_link.value = "";
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
