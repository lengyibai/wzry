<script setup lang="ts">
import { SettingStore } from "@/store";

interface Props {
  /** 自适应 */
  autoSize?: boolean;
  /** 文字大小 */
  fontSize?: string;
  /** 高度 */
  height?: string;
  /** 类型 */
  type?: "info" | "error" | "warning";
  /** 宽度 */
  width?: string;
}

const $props = withDefaults(defineProps<Props>(), {
  fontSize: "1.5rem",
  height: "3.5rem",
  type: "info",
  width: "14rem",
});

const $settingStore = SettingStore();

/** 按钮宽高 */
const style1 = {
  width: $props.autoSize ? "100%" : $props.width,
  height: $props.autoSize ? "100%" : $props.height,
};
/** 字体大小 */
const style2 = {
  fontSize: $props.fontSize,
};
/** 粒子颜色 */
const particle_color = {
  info: "#3f9ed3",
  error: "#d83e41",
  warning: "#e1c673",
};

/* 按钮图标 */
const btnIcon = (src: string) => `${IMGBED}/image/btn_${src}.png`;
</script>

<template>
  <button
    v-particle="{
      color: particle_color[type],
      size: 5,
      enable: $settingStore.config.particle,
    }"
    :class="type"
    class="k-button global_flex-center"
    :style="style1"
  >
    <span :style="style2">
      <slot>按钮</slot>
    </span>
    <img :src="btnIcon(type)" @dragstart.prevent />
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
