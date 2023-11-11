<script setup lang="ts">
import { ref } from "vue";

import AddLink from "@/components/business/Dialog/AddLink/index.vue";

interface Props {
  /** 图片路径 */
  modelValue: string;
  /** 添加链接弹窗标题 */
  title: string;
  /** 图片比例 */
  type?: "width" | "height" | "square";
}

withDefaults(defineProps<Props>(), {
  type: "square",
});
const $emit = defineEmits<{
  "update:modelValue": [link: string];
}>();

/** 是否显示添加链接弹窗 */
const show_AddLink = ref(false);

/* 获取链接 */
const onGetLink = (link: string) => {
  $emit("update:modelValue", link);
  show_AddLink.value = false;
};
</script>

<template>
  <div class="select-img" :class="[type, { border: !modelValue }]" @click="show_AddLink = true">
    <img v-show="modelValue" :src="modelValue" alt="" />
    <i v-show="!modelValue" class="iconfont wzry-add" />
  </div>

  <!-- 添加图片链接弹窗组件 -->
  <transition name="fade">
    <AddLink
      v-if="show_AddLink"
      v-model="show_AddLink"
      :title="title"
      :link="modelValue"
      @get-link="onGetLink"
    />
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
