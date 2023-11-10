<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import _debounce from "lodash/debounce";

import waterFullLayout from "./Waterfall";

import { $tool } from "@/utils";
interface Props {
  count?: number;
  gap?: number;
  /** 上一次的滚动坐标 */
  scrollTop?: number;
  /** 是否暂无更多 */
  finish?: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  count: 2,
  gap: 15,
  finish: false,
});

interface Emits {
  (e: "scroll", v: number): void;
  (e: "load-more"): void;
}
const $emit = defineEmits<Emits>();

const childs = ref<HTMLElement[]>([]);

const waterfallRef = ref<HTMLElement>();
const waterfallContentRef = ref<HTMLElement>();

/** @description 更新元素的坐标及尺寸 */
const updateSizePosition = () => {
  if (!waterfallContentRef.value) return;

  const children = Array.from(
    waterfallContentRef.value.children,
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

  const _debounceLoad = _debounce(() => {
    $emit("load-more");
  }, 250);

  new $tool.LoadMore(
    {
      parent: waterfallContentRef.value!.parentElement!,
      loadHeight: 10,
    },
    {
      load: () => {
        _debounceLoad();
      },
      scroll: (v) => {
        $emit("scroll", v);
      },
    },
  );
});

/** @description 滚动指定位置 */
const setPosition = (top: number, animate: boolean = false) => {
  waterfallRef.value?.scroll({ top, behavior: animate ? "smooth" : "auto" });
};

defineExpose({
  el: waterfallContentRef,
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
    <transition name="fade">
      <K-LoadMore class="load-more" :finish="finish" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
