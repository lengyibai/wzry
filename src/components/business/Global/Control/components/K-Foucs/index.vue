<script setup lang="ts">
import { ref } from "vue";

import { $bus } from "@/utils/eventBus";
import { _debounce } from "@/utils/tool";

let focus_el: HTMLElement | undefined;
let ctx: CanvasRenderingContext2D | null;

const canvasRef = ref<HTMLCanvasElement>();

/** 是否显示聚焦蒙版 */
const show = ref(false);

$bus.on("focus", (el) => {
  focus_el = el;
  debounceFocus();
});

const debounceFocus = _debounce(() => {
  if (!focus_el) {
    show.value = false;
    return;
  }

  const canvas = canvasRef.value;
  if (!canvas) return;

  ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height, left, top } = focus_el.getBoundingClientRect();

  //渲染画布
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  //填充整个画布为半透明黑色
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //在指定的矩形区域内清除颜色
  ctx.clearRect(left - 10, top - 10, width + 20, height + 20);

  //设置蓝色边框的样式并绘制虚线边框
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.setLineDash([10, 5]); //设置宽度10、间隔5的虚线
  ctx.lineDashOffset = 0;
  ctx.strokeRect(left - 10, top - 10, width + 20, height + 20);

  show.value = true;
}, 500);

window.addEventListener("resize", debounceFocus);
</script>

<template>
  <teleport to="body">
    <transition name="scale">
      <canvas v-show="show" ref="canvasRef"></canvas>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
