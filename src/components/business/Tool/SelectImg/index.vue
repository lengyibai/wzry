<script setup lang="ts">
import { ref } from "vue";

interface Props {
  modelValue: string; //图片路径
  title: string; //添加链接弹窗标题
  type?: "width" | "height" | "square"; //图片比例
}
withDefaults(defineProps<Props>(), {
  modelValue: "",
  title: "",
  type: "square",
});

interface Emits {
  (e: "update:modelValue", link: string): void;
}
const emit = defineEmits<Emits>();

const show_AddLink = ref(false); //显示/隐藏添加链接弹窗

/* 获取链接 */
const EmitGetLink = (link: string) => {
  emit("update:modelValue", link);
  show_AddLink.value = false;
};
</script>

<template>
  <div
    class="select-img flex cursor-pointer"
    :class="[type, { border: !modelValue }]"
    @click="show_AddLink = true"
  >
    <img v-show="modelValue" :src="modelValue" alt="" @dragstart.prevent />
    <i v-show="!modelValue" class="iconfont wzry-add" />
  </div>

  <!-- 添加图片链接弹窗组件 -->
  <transition name="fade">
    <AddLink
      v-if="show_AddLink"
      v-model="show_AddLink"
      :title="title"
      :link="modelValue"
      @get-link="EmitGetLink"
    />
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
