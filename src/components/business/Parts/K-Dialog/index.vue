<script setup lang="ts">
import { useDialogControl } from "./hooks/useDialogControl";

import { $concise } from "@/utils";
import { vMaskGradient, vMouseTip } from "@/directives";
import { AudioStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import KLoadingIcon from "@/components/business/Parts/K-LoadingIcon/index.vue";

interface Props {
  /** 垂直对齐方式 */
  align?: "flex-start" | "center" | "flex-end";
  /** 内容宽度 */
  ctxWidth?: string;
  /** 中间标题文字 */
  header?: string;
  /** 中间标题下描述 */
  desc?: string;
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
  /** 是否启用弹出音效 */
  audio?: boolean;
  /** 是否处于loading状态 */
  loading?: boolean;
  /** 弹窗层级 */
  zIndex?: string;
}

const $props = withDefaults(defineProps<Props>(), {
  align: "flex-start",
  ctxWidth: "80%",
  showClose: true,
  autoClose: true,
  audio: true,
  width: "45rem",
  loading: false,
  zIndex: "var(--z-index-dialog)",
});
const $emit = defineEmits<{
  close: [];
  "before-close": [];
}>();

/** 是否显示弹窗 */
const modelValue = defineModel<boolean>();

const $audioStore = AudioStore();

const { getImgLink } = $concise;

const { show_dialog, show_mask, handleClose } = useDialogControl(() => {
  $props.autoClose && $emit("close");
  modelValue.value = false;
});

const handleCloseDialog = () => {
  if ($props.autoClose) {
    $emit("before-close");
    handleClose();
    return;
  }
  $emit("close");
};

if ($props.audio) {
  if ($props.up) {
    $audioStore.play("e6b4");
  } else {
    $audioStore.play("u4c5");
  }
}

defineExpose({
  _close: handleClose,
});
</script>

<template>
  <transition name="fade" appear>
    <div
      v-show="show_mask"
      v-mask-gradient="{
        color: 'rgba(40, 100, 195, 0.5)',
        start: '0%',
        end: '50%',
      }"
      :style="{
        zIndex: zIndex,
      }"
      class="mask"
    >
      <transition :name="up ? 'confirm' : 'default'" appear>
        <div
          v-show="show_dialog"
          class="k-dialog"
          :style="{
            width: width,
            height: `calc(${width} * 0.55)`,
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
          <div
            v-show="showClose"
            v-mouse-tip="{
              text: MOUSE_TIP.sj91,
            }"
            class="close"
            @click="handleCloseDialog"
          ></div>

          <!-- 内容区 -->
          <div
            class="content"
            :style="{
              width: ctxWidth,
              justifyContent: align,
            }"
          >
            <transition-group name="fade">
              <KLoadingIcon v-if="loading" key="a" width="6.25rem" />
              <div v-else key="b" class="slot">
                <slot></slot>
              </div>
            </transition-group>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
