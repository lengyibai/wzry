<script setup lang="ts">
import { nextTick, onUnmounted, onMounted, ref, watch } from "vue";

import { $bus } from "@/utils";

interface Props {
  /** 滚动索引 */
  modelValue?: number;
  /** 滚动时长 */
  duration?: number;
  /** 纵向或横向 */
  direction?: string;
}

const $props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  duration: 750,
  direction: "y",
});
const $emit = defineEmits<{
  "update:modelValue": [v: number];
  start: [v: number];
  end: [v: number];
}>();

let index = 0;

const heroScrollRef = ref<HTMLElement>();

/* 滚动触发 */
const change = async (i: number) => {
  index = i === -1 ? 0 : i;
  await nextTick();
  let direction = $props.direction === "y";
  try {
    if (!heroScrollRef.value) return;
    heroScrollRef.value.style[direction ? "top" : "left"] =
      -index * (direction ? heroScrollRef.value.offsetHeight : heroScrollRef.value.offsetWidth) + "px";
  } catch (error) {}
  setTimeout(() => {
    $emit("end", index + 1);
  }, $props.duration);
};

const $debounceDelay = (() => {
  let timer: NodeJS.Timeout;
  return (callback = () => {}, wait = 800) => {
    timer && clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
})();

watch(
  () => $props.modelValue,
  (v) => {
    change(v - 1);
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  if (!heroScrollRef.value) return;
  //是否为纵向滚动
  let direction = $props.direction === "y";
  //是否滚动
  let scroll = true;
  //页面数量
  const sonCount = heroScrollRef.value.querySelectorAll(".scroll-item").length;

  heroScrollRef.value.addEventListener("wheel", (e: WheelEvent) => {
    $debounceDelay(() => {
      if (!heroScrollRef.value) return;
      heroScrollRef.value.style.transition = `all ${$props.duration}ms`;

      if (!scroll) return;
      $emit("start", index + 1);
      scroll = false;

      //判断滚轮滚动方向，并更新索引
      if (-e.deltaY < 0 && index < sonCount - 1) {
        index++;
      } else if (-e.deltaY > 0 && index > 0) {
        index--;
      }

      //根据滚动方向更新滚动位置
      if (direction) {
        heroScrollRef.value.style.top = -index * heroScrollRef.value.offsetHeight + "px";
      } else {
        heroScrollRef.value.style.left = -index * heroScrollRef.value.offsetWidth + "px";
      }

      $emit("update:modelValue", index + 1);
      setTimeout(() => {
        scroll = true;
      }, $props.duration);
    }, 10);
  });

  /* 兼容移动端 */
  let start = 0;
  heroScrollRef.value.addEventListener("touchstart", (e: TouchEvent) => {
    start = e.changedTouches[0].pageY;
  });
  heroScrollRef.value.addEventListener("touchmove", (e: TouchEvent) => {
    const status = start - e.changedTouches[0].pageY;
    if (Math.abs(status) < window.innerHeight / 3) return;
    $debounceDelay(() => {
      if (!heroScrollRef.value) return;
      heroScrollRef.value.style.transition = `all ${$props.duration}ms`;

      if (!scroll) return;
      $emit("start", index + 1);
      scroll = false;

      //判断触摸滑动方向，并更新索引
      if (status < 0 && index < sonCount - 1) {
        index++;
      } else if (status > 0 && index > 0) {
        index--;
      }

      //根据滑动方向更新滚动位置
      if (direction) {
        heroScrollRef.value.style.top = -index * heroScrollRef.value.offsetHeight + "px";
      } else {
        heroScrollRef.value.style.left = -index * heroScrollRef.value.offsetWidth + "px";
      }

      $emit("update:modelValue", index + 1);
      setTimeout(() => {
        scroll = true;
      }, $props.duration);
    }, 10);
  });

  $bus.on("resize", () => {
    change($props.modelValue - 1);
  });
});

onUnmounted(() => {
  $bus.off("resize");
});
</script>

<template>
  <div
    ref="heroScrollRef"
    class="hero-scroll"
    :style="{
      display: direction === 'x' ? 'flex' : 'block',
      transition: `all ${duration}ms`,
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
