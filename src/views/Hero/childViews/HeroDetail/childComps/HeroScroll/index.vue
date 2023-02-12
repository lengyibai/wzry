<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

interface Props {
  modelValue?: number; //滚动索引
  duration?: number; //滚动时长
  direction?: string; //纵向或横向
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

const HeroScroll = ref();
const index = ref(0);

const change = async (i: number) => {
  if (i === -1) i = 0;
  await nextTick();
  index.value = i;
  let direction = props.direction === "y";
  try {
    HeroScroll.value.style[direction ? "top" : "left"] =
      -i * (direction ? HeroScroll.value.offsetHeight : HeroScroll.value.offsetWidth) + "px";
  } catch (error) {
    /*  */
  }
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
  }
);

onMounted(() => {
  let direction = props.direction === "y"; //是否为纵向滚动
  let scroll = true; //是否滚动
  const sonCount = HeroScroll.value.querySelectorAll(".scroll-item").length; //页面数量
  HeroScroll.value.addEventListener("mousewheel", (e: WheelEvent) => {
    $debounceDelay(() => {
      HeroScroll.value.style.transition = `all ${props.duration}ms`;
      if (!scroll) return;
      emit("start", index.value + 1);
      scroll = false;
      -e.deltaY < 0 && index.value < sonCount - 1
        ? index.value++
        : -e.deltaY > 0 && index.value > 0
        ? index.value--
        : "";
      HeroScroll.value.style[direction ? "top" : "left"] =
        -index.value * (direction ? HeroScroll.value.offsetHeight : HeroScroll.value.offsetWidth) + "px";
      emit("update:modelValue", index.value + 1);
      setTimeout(() => {
        scroll = true;
      }, props.duration);
    }, 10);
  });

  /* 兼容移动端 */
  let start = 0;
  HeroScroll.value.addEventListener("touchstart", (e: TouchEvent) => {
    start = e.changedTouches[0].pageY;
  });
  HeroScroll.value.addEventListener("touchmove", (e: TouchEvent) => {
    const status = start - e.changedTouches[0].pageY;
    if (Math.abs(status) < window.innerHeight / 3) return;
    $debounceDelay(() => {
      HeroScroll.value.style.transition = `all ${props.duration}ms`;
      if (!scroll) return;
      emit("start", index.value + 1);
      scroll = false;
      -status < 0 && index.value < sonCount - 1 ? index.value++ : -status > 0 && index.value > 0 ? index.value-- : "";
      HeroScroll.value.style[direction ? "top" : "left"] =
        -index.value * (direction ? HeroScroll.value.offsetHeight : HeroScroll.value.offsetWidth) + "px";
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
    class="hero-scroll"
    :style="{
      display: direction === 'x' ? 'flex' : 'block',
      transition: `all ${duration}ms`,
    }"
    ref="HeroScroll"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
