<script setup lang="ts">
import { onMounted, ref } from "vue";

const hoverRef = ref<HTMLElement>();

/** 是否显示提示框 */
const show_tip = ref(false);
/** 提示框位置 */
const tip_position = ref<"left-bottom" | "right-bottom" | "left-top" | "right-top">("left-top");

/* 获取Tip的位置 */
const getTipPosition = () => {
  if (!hoverRef.value) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const {
    left: dot_left,
    right: dot_right,
    top: dot_top,
    bottom: dot_bottom,
  } = hoverRef.value.getBoundingClientRect();

  //小圆点处于左上角区域
  if (dot_right < w / 2 && dot_bottom < h / 2) {
    tip_position.value = "right-bottom";
  }

  //小圆点处于右上角区域
  if (dot_left > w / 2 && dot_bottom < h / 2) {
    tip_position.value = "left-bottom";
  }

  //小圆点处于右下角区域
  if (dot_left > w / 2 && dot_top > h / 2) {
    tip_position.value = "left-top";
  }
  //小圆点处于左下角区域
  if (dot_right < w / 2 && dot_top > h / 2) {
    tip_position.value = "right-top";
  }

  requestAnimationFrame(getTipPosition);
};

onMounted(getTipPosition);
</script>

<template>
  <div class="k-hover-desc">
    <div ref="hoverRef" class="hover" @mouseenter="show_tip = true" @mouseleave="show_tip = false">
      <slot name="btn">悬浮我</slot>
    </div>
    <transition name="fade">
      <div v-if="show_tip" class="tip" :class="tip_position">
        <slot name="tip">Hello World!</slot>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
