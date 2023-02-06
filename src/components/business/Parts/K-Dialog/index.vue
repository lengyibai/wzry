<script setup lang="ts">
import { ref, onMounted } from "vue";

import switchStore from "@/store/switch";

interface Props {
  align?: "flex-start" | "center" | "flex-end"; //垂直对齐方式
  ctxWidth?: string; //内容宽度
  header?: string; //中间标题文字
  desc?: string; //中间标题下描述
  modelValue?: boolean; //显示/隐藏
  showClose?: boolean; //显示/隐藏右上角关闭按钮
  title?: string; //左上角描述文字
  up?: boolean; //上升动画
  width?: string; //弹窗宽度
}
const props = withDefaults(defineProps<Props>(), {
  align: "flex-start",
  ctxWidth: "80%",
  modelValue: true,
  showClose: true,
  width: "720px",
});

interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "close"): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

const show = ref(false); //显示弹窗

onMounted(() => {
  show.value = true;
  if (props.up) {
    $switchStore.$clickAudio("e6b4");
  }
});

/* 关闭 */
const handleClose = () => {
  emit("update:modelValue", false);
  emit("close");
  $switchStore.$clickAudio("6xc6");
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
          class="close cursor-pointer"
          :src="IMGBED + '/image/close.png'"
          @dragstart.prevent
          @click="handleClose"
        />

        <!-- 背景图 -->
        <img class="bg" :src="IMGBED + '/image/dialog.png'" @dragstart.prevent />

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
