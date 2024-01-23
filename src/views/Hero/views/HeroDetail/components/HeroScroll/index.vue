<script setup lang="ts">
import { nextTick, onUnmounted, onMounted, ref, watch } from "vue";

interface Props {
  /** 滚动时长 */
  duration?: number;
  /** 纵向或横向 */
  direction?: string;
}

const $props = withDefaults(defineProps<Props>(), {
  duration: 750,
  direction: "y",
});
const $emit = defineEmits<{
  start: [v: number];
  end: [v: number];
}>();

/** 滚动索引 */
const modelValue = defineModel({ default: 0 });

let index = 0;

const heroScrollRef = ref<HTMLElement>();

/* 滚动触发 */
const change = async (i: number) => {
  index = i === -1 ? 0 : i;
  await nextTick();
  const direction = $props.direction === "y";
  try {
    if (!heroScrollRef.value) return;
    heroScrollRef.value.style[direction ? "top" : "left"] =
      -index * (direction ? heroScrollRef.value.offsetHeight : heroScrollRef.value.offsetWidth) +
      "px";
  } catch (error) {}
  setTimeout(() => {
    $emit("end", index + 1);
  }, $props.duration);
};

/* 改变宽度时纠正滚动位置 */
const resetPosition = () => {
  change(modelValue.value - 1);
};

const $debounceDelay = (() => {
  let timer: NodeJS.Timeout;
  return (callback = () => {}, wait = 800) => {
    timer && clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
})();

watch(
  modelValue,
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
  const direction = $props.direction === "y";
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

      modelValue.value = index + 1;
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
      if (-status < 0 && index < sonCount - 1) {
        index++;
      } else if (-status > 0 && index > 0) {
        index--;
      }

      //根据滑动方向更新滚动位置
      if (direction) {
        heroScrollRef.value.style.top = -index * heroScrollRef.value.offsetHeight + "px";
      } else {
        heroScrollRef.value.style.left = -index * heroScrollRef.value.offsetWidth + "px";
      }

      modelValue.value = index + 1;
      setTimeout(() => {
        scroll = true;
      }, $props.duration);
    }, 10);
  });
});

window.addEventListener("resize", resetPosition);

onUnmounted(() => {
  window.removeEventListener("resize", resetPosition);
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
