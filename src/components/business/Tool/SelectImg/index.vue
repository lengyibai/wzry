<template>
  <div
    class="SelectImg flex cursor-pointer"
    :class="[type, { border: !modelValue }]"
    @click="show_AddLink = true"
  >
    <img :src="modelValue" alt="" v-show="modelValue" />
    <i class="iconfont wzry-add" v-show="!modelValue" />
  </div>
  <!-- 添加图片链接弹窗组件 -->
  <transition name="fade">
    <AddLink
      v-model="show_AddLink"
      :title="title"
      v-if="show_AddLink"
      :link="modelValue"
      @get-link="getLink"
    />
  </transition>
</template>
<script setup lang="ts">
import { ref } from "vue";

interface Props {
  modelValue: string; //图片路径
  title: string;
  type?: "width" | "height" | "square"; //图片比例
}
interface Emits {
  (e: "update:modelValue", link: string): void;
}

withDefaults(defineProps<Props>(), {
  modelValue: "",
  title: "",
  type: "square",
});

/* 弹窗相关 */
const show_AddLink = ref(false); //显示添加链接弹窗

/* 获取链接 */
const emit = defineEmits<Emits>();
const getLink = (link: string) => {
  emit("update:modelValue", link);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
