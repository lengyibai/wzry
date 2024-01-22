<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import waterFullLayout from "./Waterfall";

import KLoadMore from "@/components/business/Parts/K-LoadMore/index.vue";
import { $tool } from "@/utils";
interface Props {
  count?: number;
  gap?: number;
  /** 上一次的滚动坐标 */
  scrollTop?: number;
  /** 是否暂无更多 */
  finish?: boolean;
  /** 是否处于加载中 */
  loading?: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  count: 2,
  gap: 15,
  finish: false,
  loading: false,
});

const $emit = defineEmits<{
  scroll: [v: number];
  "load-more": [];
}>();

const children_list = ref<HTMLElement[]>([]);

const waterfallRef = ref<HTMLElement>();
const waterfallContentRef = ref<HTMLElement>();

/** @description 更新元素的坐标及尺寸 */
const updateSizePosition = () => {
  if (!waterfallContentRef.value) return;

  const children = Array.from(waterfallContentRef.value.children) as HTMLElement[];

  if (!children) return;
  children_list.value = children;

  waterFullLayout({
    count: $props.count,
    gap: $props.gap,
    children_list: children_list.value,
  });
};

/** @description 通过给图片设置监听事件，图片加载自动调用updateSizePosition，适用于生成了新的图片时调用 */
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

/** @description 滚动指定位置 */
const setPosition = (top: number, animate = false) => {
  waterfallRef.value?.scroll({ top, behavior: animate ? "smooth" : "auto" });
};

watch(() => $props.count, updateSizePosition);

onMounted(() => {
  watchImgLoad();

  new $tool.LoadMore(
    {
      parent: waterfallContentRef.value!.parentElement!,
      loadHeight: 10,
    },
    {
      load() {
        //处于加载中或全部加载完毕禁止再次触发
        if ($props.loading || $props.finish) return;
        $emit("load-more");
      },
      scroll: (v) => {
        $emit("scroll", v);
      },
    },
  );
});

defineExpose({
  _el: waterfallContentRef,
  _watchImgLoad: watchImgLoad,
  _updateSizePosition: updateSizePosition,
  _setPosition: setPosition,
});
</script>

<template>
  <div ref="waterfallRef" class="waterfall">
    <div ref="waterfallContentRef" class="waterfall-content">
      <slot></slot>
    </div>

    <KLoadMore :loading="loading" class="load-more" :finish="finish" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
