<script setup lang="ts">
import { onMounted } from "vue";

import { useDialogContorl } from "./hooks/useDialogContorl";

import { AudioStore } from "@/store";
import { $concise } from "@/utils";
import { vMaskGradient } from "@/directives";

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
  /** 点击右上角关闭后自动关闭 */
  autoClose?: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  align: "flex-start",
  ctxWidth: "80%",
  modelValue: true,
  showClose: true,
  autoClose: true,
  width: "45rem",
});
const $emit = defineEmits<{
  close: [];
  "update:modelValue": [v: boolean];
}>();

const $audioStore = AudioStore();

const { getImgLink } = $concise;

const { show_dialog, show_mask, handleClose } = useDialogContorl(() => {
  $props.autoClose && $emit("close");
  $emit("update:modelValue", false);
});

const handleCloseDialog = () => {
  $props.autoClose && handleClose();
  $emit("close");
};

onMounted(() => {
  if ($props.up) {
    $audioStore.play("e6b4");
  }
});

defineExpose({
  close: handleClose,
});
</script>

<template>
  <transition name="fade" appear>
    <div
      v-show="show_mask"
      v-maskGradient="{
        color: 'rgba(40, 100, 195, 0.5)',
        start: '0%',
        end: '50%',
      }"
      class="mask"
    >
      <transition :name="up ? 'confirm' : 'default'" appear>
        <div
          v-show="show_dialog"
          class="k-dialog"
          :style="{
            width: width,
            height: 'calc(' + width + ' * 0.5989)',
            backgroundImage: `url(${getImgLink('dialog')})`,
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
            :src="getImgLink('close')"
            @click="handleCloseDialog"
          />

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
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
