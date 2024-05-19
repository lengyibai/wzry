<script setup lang="ts">
import { nextTick, ref, watchEffect } from "vue";

import { _getMiscLink } from "@/utils/concise";
import { _getExpLevel } from "@/utils/privateTool";

interface Props {
  /** 经验值 */
  exp?: number;
  /** 大小 */
  size?: string;
  /** 最大尺寸类型 */
}

const $props = withDefaults(defineProps<Props>(), {
  exp: 0,
  size: "1.875rem",
});

const modelValue = defineModel<number>({ default: 0 });

/** 当前图标 */
const icon = ref("");
/** 用于切换动画的图标 */
const _icon = ref("");

watchEffect(() => {
  modelValue.value = _getExpLevel($props.exp);
  icon.value = _getMiscLink(`exp_${_getExpLevel($props.exp)}`);

  nextTick(() => {
    _icon.value = _getMiscLink(`exp_${_getExpLevel($props.exp)}`);
  });
});
</script>

<template>
  <transition name="fade">
    <div
      v-show="icon === _icon"
      class="hero-exp"
      alt=""
      :style="{
        width: size,
        height: size,
        backgroundImage: `url(${_icon})`,
      }"
    ></div>
  </transition>
</template>
<style scoped lang="less">
@import url("./index.less");
</style>
