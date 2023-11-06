<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

import waterFullLayout from "./Waterfall";
interface Props {
  count?: number;
  gap?: number;
  loadHeight?: number;
  loading?: boolean;
  /** 上一次的滚动坐标 */
  scrollTop?: number;
}

const $props = withDefaults(defineProps<Props>(), {
  count: 2,
  gap: 15,
  loadHeight: 500,
});

interface Emits {
  (e: "update:loading", v: boolean): void;
  (e: "scroll", v: number): void;
  (e: "load-more"): void;
}
const emit = defineEmits<Emits>();

const childs = ref<HTMLElement[]>([]);
const isLoadMore = ref(true);

const waterfallRef = ref<HTMLElement>();
const waterfallContentRef = ref<HTMLElement>();

/** @description 更新元素的坐标及尺寸 */
const updateSizePosition = () => {
  const children = Array.from(
    waterfallContentRef.value!.children,
  ) as HTMLElement[];

  if (!children) return;
  childs.value = children;

  waterFullLayout({
    count: $props.count,
    gap: $props.gap,
    childs: childs.value,
  });
};

/** @description 通过给图片设置监听事件，图片加载自动调用updateChilds，适用于生成了新的图片时调用 */
const watchImgLoad = () => {
  //监听所有图片加载，有一个加载完成则调用回调函数
  const onAllImgLoaded = (root: HTMLElement, callback: () => void) => {
    const imgNodes = root.querySelectorAll("img");
    Array.from(imgNodes).forEach((img) => {
      img.addEventListener("load", callback);
    });
  };

  updateSizePosition();
  onAllImgLoaded(waterfallContentRef.value!, () => {
    updateSizePosition();
  });
};

watch(() => $props.count, updateSizePosition);

onMounted(() => {
  watchImgLoad();
  waterfallContentRef.value!.parentElement!.addEventListener(
    "scroll",
    (e: Event) => {
      const el = e.target as HTMLDivElement;
      let d = Math.abs(el.scrollTop - el.scrollHeight + el.clientHeight);

      /* 当到达底部显示正在加载 */
      if (d <= 0) {
        emit("update:loading", true);
      }

      if (d <= $props.loadHeight && isLoadMore.value) {
        emit("load-more");
        isLoadMore.value = false;
      } else if (d > $props.loadHeight) {
        isLoadMore.value = true;
      }

      emit("scroll", el.scrollTop);
    },
  );
});

/** @description 回到上次位置 */
const setPosition = (top: number) => {
  waterfallRef.value?.scroll({ top });
};

defineExpose({
  watchImgLoad,
  updateSizePosition,
  setPosition,
});
</script>

<template>
  <div ref="waterfallRef" class="waterfall">
    <div ref="waterfallContentRef" class="waterfall-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
