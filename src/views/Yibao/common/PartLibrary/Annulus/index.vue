<script setup lang="ts">
import { computed } from "vue";

interface Props {
  /** 大小倍率 */
  rate?: number;
  /** 是否需要展示动画 */
  animate?: boolean;
  /** 当前风格模式 COLOR-颜色 IMG-贴图 */
  mode?: Game.YiBao.StyleType;
  /** 圆环边框色 */
  borderColor?: string;
  /** 背景图 */
  bgImg?: string;
}
const $props = withDefaults(defineProps<Props>(), { rate: 1, animate: true });

/** 样式变量 */
const style_value = computed(() => {
  if ($props.mode === "COLOR") {
    return `
      --rate: ${$props.rate};
      --border-color:${$props.borderColor};
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
    class="annulus"
    :style="style_value"
    :class="[
      {
        animate,
      },
      mode,
    ]"
  >
    <div v-for="(item, index) in 4" :key="index" :style="`--i:${item}`" class="circle"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
