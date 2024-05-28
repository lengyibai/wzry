<script setup lang="ts">
import { nextTick, onUnmounted, onMounted, ref, watch } from "vue";

import { _debounce } from "@/utils/tool";

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

/** 滚动索引号 */
const modelValue = defineModel({ default: 0 });

/** 滚动索引号 */
let index = 0;

const heroScrollRef = ref<HTMLElement>();

/** @description 滚动到指定索引
 * @param i 索引号
 */
const scrollIndex = async (i: number) => {
  index = i - 1 === -1 ? 0 : i - 1;
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

const $debounceDelay = (() => {
  let timer: NodeJS.Timeout;
  return (callback = () => {}, wait = 800) => {
    timer && clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
})();

watch(
  modelValue,
  () => {
    scrollIndex(modelValue.value);
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  if (!heroScrollRef.value) return;
  const direction = $props.direction === "y";
  let scroll = true;
  const sonCount = heroScrollRef.value.querySelectorAll(".scroll-item").length;

  let start = 0;
  let startTime = 0;

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

  heroScrollRef.value.ontouchstart = function (e) {
    start = direction ? e.changedTouches[0].pageY : e.changedTouches[0].pageX;
    startTime = e.timeStamp; //触摸开始的时间

    heroScrollRef.value!.ontouchmove = function (e) {
      const current = direction ? e.changedTouches[0].pageY : e.changedTouches[0].pageX;
      const status = start - current;
      const elapsedTime = e.timeStamp - startTime; //计算时间差
      const speed = Math.abs(status) / elapsedTime; //计算速度（单位 px/ms）

      if (Math.abs(status) < window.innerHeight / 3 && speed < 0.3) return; //增加速度条件

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
    };
  };

  heroScrollRef.value!.ontouchend = () => {
    heroScrollRef.value!.ontouchmove = null;
  };
});

/* 改变宽度时纠正滚动位置 */
const debounceScrollIndex = _debounce(() => {
  scrollIndex(modelValue.value);
}, 500);
window.addEventListener("resize", debounceScrollIndex);

onUnmounted(() => {
  window.removeEventListener("resize", debounceScrollIndex);
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
