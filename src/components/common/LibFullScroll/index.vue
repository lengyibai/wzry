<template>
  <div
    ref="LibFullScroll"
    class="LibFullScroll"
    :style="{
      display: direction === 'x' ? 'flex' : 'block',
      transition: `all ${duration}ms`,
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

interface Props {
  modelValue?: number;
  duration?: number;
  direction?: string;
}
interface Emits {
  (e: "update:modelValue", v: number): void;
  (e: "start", v: number): void;
  (e: "end", v: number): void;
}
const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  duration: 750,
  direction: "y",
});

const LibFullScroll = ref();
const index = ref(0);

const change = async (i: number) => {
  if (i === -1) i = 0;
  await nextTick();
  index.value = i;
  let direction = props.direction === "y";
  try {
    LibFullScroll.value.style[direction ? "top" : "left"] =
      -i *
        (direction
          ? LibFullScroll.value.offsetHeight
          : LibFullScroll.value.offsetWidth) +
      "px";
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
  const sonCount = LibFullScroll.value.querySelectorAll(".scroll-item").length; //页面数量
  /* 防抖 */
  LibFullScroll.value.addEventListener("mousewheel", (e: WheelEvent) => {
    $debounceDelay(() => {
      emit("start", index.value + 1);
      LibFullScroll.value.style.transition = `all ${props.duration}ms`;
      if (!scroll) return;
      scroll = false;
      -e.deltaY < 0 && index.value < sonCount - 1
        ? index.value++
        : -e.deltaY > 0 && index.value > 0
        ? index.value--
        : "";
      LibFullScroll.value.style[direction ? "top" : "left"] =
        -index.value *
          (direction
            ? LibFullScroll.value.offsetHeight
            : LibFullScroll.value.offsetWidth) +
        "px";
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
<style scoped lang="less">
.LibFullScroll {
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  :deep(.scroll-item) {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
