<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, nextTick, onBeforeUnmount } from "vue";
import { onMounted, ref, watch } from "vue";

import { _debounce } from "@/utils/tool";

interface Props {
  /** 数据列表 */
  data: T[];
  /** 一行的数目 */
  columnCount: number;
  /** 间隔 */
  gap?: string;
  /** 缓冲数量 */
  bufferLineCount?: number;
}

const $props = withDefaults(defineProps<Props>(), {
  bufferLineCount: 2,
  gap: "1rem",
});
const $emit = defineEmits<{
  scroll: [v: number];
}>();

/** 上次滚动位置 */
let lastScrollTop = 0;

const virtualListRef = ref<HTMLElement>();
const fillListRef = ref<HTMLElement>();

/** 子元素高度，1000初始高度，元素加载完毕将设置为元素高度 */
const itemHeight = ref(1000);
/** 渲染的数据列表 */
const renderedData = ref<any[]>([]);

/** 计算可视元素数量 */
const visibleCount = computed(() => {
  if (virtualListRef.value) {
    return Math.ceil((virtualListRef.value.offsetHeight / itemHeight.value) * $props.columnCount);
  }
  return 1;
});

/** @description 滚动指定位置
 * @param top 滚动坐标
 * @param animate 是否开启滚动动画动画
 */
const setPosition = (top: number, animate = false) => {
  virtualListRef.value?.scroll({ top, behavior: animate ? "smooth" : "auto" });
};

/** @description 渲染项目函数 */
const renderItems = () => {
  if (!virtualListRef.value || !fillListRef.value) return;

  const data = $props.data;
  const column_count = $props.columnCount;
  const bufferLineCount = $props.bufferLineCount;

  /** 获取滚动位置 */
  const scrollTop = virtualListRef.value.scrollTop;
  /** 计算开始索引 */
  const startIdx = Math.max(
    0,
    Math.floor(scrollTop / itemHeight.value) * column_count - bufferLineCount * column_count,
  );
  /** 计算结束索引 */
  const endIdx = Math.min(
    data.length,
    startIdx + visibleCount.value + bufferLineCount * 2 * column_count,
  );

  /** 新的渲染数据列表 */
  const newRenderedData = [];
  for (let i = startIdx; i < endIdx; i += column_count) {
    //以列为单位创建元素
    newRenderedData.push(...data.slice(i, i + column_count));
  }
  //更新渲染数据
  renderedData.value = newRenderedData;

  /** 计算顶部填充高度 */
  const topPadding = Math.floor(startIdx / column_count) * itemHeight.value;
  /** 计算底部填充高度 */
  const bottomPadding = Math.floor((data.length - endIdx) / column_count) * itemHeight.value;
  /** 设置顶部填充 */
  fillListRef.value.style.paddingTop = `${topPadding}px`;
  /** 设置底部填充 */
  fillListRef.value.style.paddingBottom = `${bottomPadding}px`;

  /** 更新上次滚动位置 */
  lastScrollTop = scrollTop;
};

/** @description 滚动事件处理函数 */
const handleScroll = (e: Event) => {
  const el = e.target as HTMLElement;
  const scrollTop = el.scrollTop;

  $emit("scroll", scrollTop);

  /** 判断是否需要重新渲染 */
  if (
    Math.abs(scrollTop - lastScrollTop) >=
    (itemHeight.value * $props.bufferLineCount) / $props.bufferLineCount
  ) {
    renderItems();
  }
};

/** @description 检测底部是否有一行元素 */
const checkBottomRow = () => {
  if (!virtualListRef.value) return;

  const { scrollHeight, scrollTop, offsetHeight } = virtualListRef.value;
  const isBottomRowVisible = scrollHeight - scrollTop - offsetHeight <= itemHeight.value;

  if (isBottomRowVisible) {
    renderItems();
  }
};

/** @description 更新状态 */
const debounceUpdateStatus = _debounce(() => {
  const child_el = fillListRef.value!.children[0] as HTMLElement;
  if (!child_el) return;
  itemHeight.value = child_el.offsetHeight;
  renderItems();
}, 100);

watch(
  () => $props.data,
  () => {
    nextTick(renderItems);
  },
);

onMounted(() => {
  window.addEventListener("resize", debounceUpdateStatus);
  virtualListRef.value!.addEventListener("scroll", checkBottomRow);
  renderItems();
  nextTick(debounceUpdateStatus);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", debounceUpdateStatus);
  virtualListRef.value!.removeEventListener("scroll", checkBottomRow);
});

defineExpose({
  _setPosition: setPosition,
  _updateStatus: debounceUpdateStatus,
});
</script>

<template>
  <div ref="virtualListRef" class="lib-virtual-list" @scroll="handleScroll">
    <div
      ref="fillListRef"
      class="fill-list"
      :style="{
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap,
      }"
    >
      <slot :data="renderedData"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
