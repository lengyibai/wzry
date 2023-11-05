<script setup lang="ts">
import { ref, onMounted } from "vue";

import { AudioStore } from "@/store";
import { CONFIG } from "@/config";

interface Props {
  /** 垂直对齐方式 */
  align?: "flex-start" | "center" | "flex-end";
  /** 内容宽度 */
  ctxWidth?: string;
  /** 中间标题文字 */
  header?: string;
  /** 中间标题下描述 */
  desc?: string;
  /** 是否显示 */
  modelValue?: boolean;
  /** 是否显示右上角关闭按钮 */
  showClose?: boolean;
  /** 左上角描述文字 */
  title?: string;
  /** 上升动画 */
  up?: boolean;
  /** 弹窗宽度 */
  width?: string;
}

const $props = withDefaults(defineProps<Props>(), {
  align: "flex-start",
  ctxWidth: "80%",
  modelValue: true,
  showClose: true,
  width: "45rem",
});
const $emit = defineEmits<{
  close: [];
  "update:modelValue": [v: boolean];
}>();

const $audioStore = AudioStore();

/** 显示弹窗 */
const show = ref(false);

onMounted(() => {
  show.value = true;
  if ($props.up) {
    $audioStore.play("e6b4");
  }
});

/* 关闭 */
const handleClose = () => {
  $emit("update:modelValue", false);
  $emit("close");
  $audioStore.play("6xc6");
};
</script>

<template>
  <div
    v-maskGradient="{
      color: 'rgba(40, 100, 195, 0.5)',
      num1: '0%',
      num2: '50%',
    }"
    class="mask"
  >
    <transition :name="up ? 'confirm' : 'default'">
      <div
        v-show="show"
        class="k-dialog"
        :style="{
          width: width,
          height: 'calc(' + width + ' * 0.5989)',
        }"
      >
        <!-- 左上标题 -->
        <div v-if="title" class="title">{{ title }}</div>

        <!-- 顶部标题 -->
        <div v-if="header" class="header">
          <span>{{ header }}</span>
          <span>{{ desc }}</span>
        </div>

        <!-- 关闭 -->
        <img
          v-show="showClose"
          class="close"
          :src="CONFIG.BASE.IMGBED + '/image/close.png'"
          @click="handleClose"
        />

        <!-- 背景图 -->
        <img class="bg" :src="CONFIG.BASE.IMGBED + '/image/dialog.png'" />

        <!-- 内容区 -->
        <div
          class="content"
          :style="{
            width: ctxWidth,
            justifyContent: align,
          }"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
