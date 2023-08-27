<script setup lang="ts">
import settingStore from "@/store/modules/setting";

interface Props {
  autoSize?: boolean; //自适应
  fontSize?: string; //文字大小
  height?: string; //高度
  type?: "info" | "error" | "warning"; //类型
  width?: string; //宽度
}
const props = withDefaults(defineProps<Props>(), {
  fontSize: "1.5rem",
  height: "3.5rem",
  type: "info",
  width: "14rem",
});

const $settingStore = settingStore();

//按钮宽高
const style1 = {
  width: props.autoSize ? "100%" : props.width,
  height: props.autoSize ? "100%" : props.height,
};

//字体大小
const style2 = {
  fontSize: props.fontSize,
};

//粒子颜色
const particle_color: Record<string, string> = {
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
    class="k-button flex"
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
