<script setup lang="ts">
import { computed } from "vue";

interface Props {
  /** 大小倍率 */
  rate?: number;
  /** 是否需要展示动画 */
  animate?: boolean;
  /** 当前风格模式 COLOR-颜色 IMG-贴图 */
  mode?: Game.YiBao.StyleType;
  /** 背景色 */
  bgColor?: string;
  /** 背景图 */
  bgImg?: string;
}
const $props = withDefaults(defineProps<Props>(), { rate: 1, animate: true });

/** 样式变量 */
const style_value = computed(() => {
  if ($props.mode === "COLOR") {
    return `
      --rate: ${$props.rate};
      --bg-color:${$props.bgColor};
    `;
  } else {
    return `
      --rate: ${$props.rate};
      --bg-img:url(${$props.bgImg});
    `;
  }
});
</script>

<template>
  <div
    class="wing"
    :style="style_value"
    :class="[
      {
        animate,
      },
      mode,
    ]"
  >
    <div class="left-wing"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
