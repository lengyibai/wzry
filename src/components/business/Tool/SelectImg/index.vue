<template>
  <div class="SelectImg flex cursor-pointer" :class="[type, { border: !src }]" @click="set(keyword)">
    <img class="cursor-pointer" :src="src" alt="" v-show="src" />
    <i class="iconfont wzry-add cursor-pointer" v-show="!src" />
  </div>
</template>
<script setup lang="ts">
interface Props {
  src: string; //图片路径
  keyword?: string; //键值
  type?: "width" | "height" | "square"; //图片比例
}
interface Emits {
  (e: "select", v: string): void;
}

withDefaults(defineProps<Props>(), {
  src: "",
  keyword: "",
  type: "square",
});

const emit = defineEmits<Emits>();

const set = (key: string) => {
  emit("select", key);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
