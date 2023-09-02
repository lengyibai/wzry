<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

interface Props {
  /** 滚动索引 */
  modelValue?: number;
  /** 滚动时长 */
  duration?: number;
  /** 纵向或横向 */
  direction?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  duration: 750,
  direction: "y",
});

interface Emits {
  (e: "update:modelValue", v: number): void;
  (e: "start", v: number): void;
  (e: "end", v: number): void;
}
const emit = defineEmits<Emits>();

const heroScrollRef = ref();

const index = ref(0);

const change = async (i: number) => {
  index.value = i === -1 ? 0 : i;
  await nextTick();
  let direction = props.direction === "y";
  try {
    heroScrollRef.value.style[direction ? "top" : "left"] =
      -index.value * (direction ? heroScrollRef.value.offsetHeight : heroScrollRef.value.offsetWidth) + "px";
  } catch (error) {}
  setTimeout(() => {
    emit("end", index.value + 1);
  }, props.duration);
};

const $debounceDelay = (() => {
  let timer: any = null;
  return (callback = () => {}, wait = 800) => {
    timer && clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
})();

watch(
  () => props.modelValue,
  (v) => {
    change(v - 1);
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  //是否为纵向滚动
  let direction = props.direction === "y";
  //是否滚动
  let scroll = true;
  //页面数量
  const sonCount = heroScrollRef.value.querySelectorAll(".scroll-item").length;
  heroScrollRef.value.addEventListener("mousewheel", (e: WheelEvent) => {
    $debounceDelay(() => {
      heroScrollRef.value.style.transition = `all ${props.duration}ms`;
      if (!scroll) return;
      emit("start", index.value + 1);
      scroll = false;
      -e.deltaY < 0 && index.value < sonCount - 1
        ? index.value++
        : -e.deltaY > 0 && index.value > 0
        ? index.value--
        : "";
      heroScrollRef.value.style[direction ? "top" : "left"] =
        -index.value * (direction ? heroScrollRef.value.offsetHeight : heroScrollRef.value.offsetWidth) + "px";
      emit("update:modelValue", index.value + 1);
      setTimeout(() => {
        scroll = true;
      }, props.duration);
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
      heroScrollRef.value.style.transition = `all ${props.duration}ms`;
      if (!scroll) return;
      emit("start", index.value + 1);
      scroll = false;
      -status < 0 && index.value < sonCount - 1 ? index.value++ : -status > 0 && index.value > 0 ? index.value-- : "";
      heroScrollRef.value.style[direction ? "top" : "left"] =
        -index.value * (direction ? heroScrollRef.value.offsetHeight : heroScrollRef.value.offsetWidth) + "px";
      emit("update:modelValue", index.value + 1);
      setTimeout(() => {
        scroll = true;
      }, props.duration);
    }, 10);
  });

  window.addEventListener("resize", () => {
    change(props.modelValue - 1);
  });
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
