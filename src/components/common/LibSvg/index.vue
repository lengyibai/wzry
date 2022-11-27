<template>
  <span
    class="LibSvg"
    v-html="svg"
    :style="{
      width: size,
      height: size,
      margin: `${top} ${right} ${bottom} ${left}`,
      color: color,
    }"
    :title="title"
    @mouseenter="enter($event.target)"
    @mouseleave="leave($event.target)"
    @mousedown="down($event.target)"
    @mouseup="up($event.target)"
  ></span>
</template>
<script setup>
import { toRefs } from "vue";

const props = defineProps({
  // SVG代码
  svg: {
    type: String,
    default: "",
  },
  // 图标颜色
  color: {
    type: String,
    default: "#000",
  },
  /* 悬浮颜色 */
  enterColor: {
    type: String,
    default: "",
  },
  /* 按下颜色，已被按下缩小动画替换，开发者可自定义按下、悬浮、离开样式 */
  downColor: {
    type: String,
    default: "",
  },
  //悬浮描述
  title: {
    type: String,
    default: "",
  },
  //图片等比宽高
  size: {
    type: String,
    default: "25px",
  },
  // 以下为外边距
  top: {
    type: String,
    default: "0px",
  },
  right: {
    type: String,
    default: "0px",
  },
  bottom: {
    type: String,
    default: "0px",
  },
  left: {
    type: String,
    default: "0px",
  },
  /* 按下回调 */
  downFn: {
    type: Function,
    default: () => {},
  },
  /* 抬起回调 */
  upFn: {
    type: Function,
    default: () => {},
  },
});
const { enterColor, color, upFn, downColor, downFn } = toRefs(props);

const enter = (el) => {
  el.style.color = enterColor.value || color.value;
};
const leave = (el) => {
  el.style.color = color.value;
  upFn.value(el);
  if (el.tagName === "svg") {
    upFn.value(el.parentNode);
  } else {
    upFn.value(el.parentNode.parentNode);
  }
};
const down = (el) => {
  if (el.tagName === "svg") {
    el.parentNode.style.color = downColor.value || enterColor || color.value;
    downFn.value(el.parentNode);
  } else {
    el.parentNode.parentNode.style.color = downColor.value || enterColor || color.value;
    downFn.value(el.parentNode.parentNode);
  }
};
const up = (el) => {
  if (el.tagName === "svg") {
    el.parentNode.style.color = enterColor.value || color.value;
    upFn.value(el.parentNode);
  } else {
    el.parentNode.parentNode.style.color = enterColor.value || color.value;
    upFn.value(el.parentNode.parentNode);
  }
};
</script>
<style scoped lang="less">
.LibSvg {
  position: relative;
  display: inline-block;
  background: no-repeat center center;
  background-size: contain;
  cursor: pointer;

  &:hover {
    transition: all 0.1s;
  }
}
</style>
