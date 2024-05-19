<script setup lang="ts">
import { computed } from "vue";

import { _getMinecraftLink } from "@/utils/concise";

interface Props {
  /** 大小倍率 */
  rate?: number;
  /** 是否需要展示动画 */
  animate?: boolean;
  /** 当前风格模式 COLOR-颜色 IMG-贴图 */
  mode?: Game.YiBao.StyleType;
  /** 贴图六面 */
  sides?: Record<string, string>;
  /** 背景色 */
  bgColor?: string;
  /** 边框颜色 */
  borderColor?: string;
}
const $props = withDefaults(defineProps<Props>(), {
  rate: 1,
  animate: true,
  mode: "COLOR",
});

/** 样式变量 */
const style_value = computed(() => {
  if ($props.mode === "COLOR") {
    return `
      --rate: ${$props.rate};
      --bg-color:${$props.bgColor};
      --border-color:${$props.borderColor};
    `;
  } else {
    return `
      --rate: ${$props.rate};
      --side-front-bg:url(${_getMinecraftLink($props.sides!.front)});
      --side-back-bg:url(${_getMinecraftLink($props.sides!.back)});
      --side-left-bg:url(${_getMinecraftLink($props.sides!.left)});
      --side-right-bg:url(${_getMinecraftLink($props.sides!.right)});
      --side-top-bg:url(${_getMinecraftLink($props.sides!.top)});
      --side-bottom-bg:url(${_getMinecraftLink($props.sides!.bottom)});
    `;
  }
});
</script>

<template>
  <div
    class="side"
    :style="style_value"
    :class="[
      {
        animate,
      },
      mode,
      {
        shadow: sides?.shadow === '1',
      },
    ]"
  >
    <div class="side-item front"></div>
    <div class="side-item back"></div>
    <div class="side-item top"></div>
    <div class="side-item bottom"></div>
    <div class="side-item left"></div>
    <div class="side-item right"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
