<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated } from "vue";
import { onMounted, ref, watch } from "vue";

import KLoadMore from "@/components/business/Parts/K-LoadMore/index.vue";
import { _LoadMore, _debounce } from "@/utils/tool";
import { vScrollVirtualization } from "@/directives";

interface Props {
  /** 数据列表 */
  data: T[];
  /** 一行的数目 */
  columnCount: number;
  /** 是否暂无更多 */
  finish?: boolean;
  /** 是否启用加载更多 */
  loadMore?: boolean;
  /** 是否处于加载中 */
  loading?: boolean;
  /** 间隔 */
  gap?: string;
  /** 间隔多少行后更新列表，当遇到分页加载场景时，元素{bufferLineCount}行高度必须小于分页触发的高度，当分页数据加载完毕，会触发renderItems函数更新缓冲数量，bufferLineCount数值过大会导致多次触发，产生列表抖动并造成renderItems频繁错误触发，也可以选择列表滚动到底部后加载更多 */
  bufferLineCount?: number;
}

const $props = withDefaults(defineProps<Props>(), {
  loadMore: true,
  finish: false,
  loading: false,
  bufferLineCount: 1,
  gap: "1rem",
});
const $emit = defineEmits<{
  scroll: [v: number];
  "load-more": [];
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

  //由于间隔行数包含可视区上和可视区下面的缓冲，所需实际使用需要 * 2
  const bufferLineCount = $props.bufferLineCount * 2;

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
    startIdx + visibleCount.value + bufferLineCount * column_count * 2,
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
  if (Math.abs(scrollTop - lastScrollTop) >= itemHeight.value) {
    renderItems();
  }
};

/** @description 更新状态 */
const debounceUpdateStatus = _debounce(() => {
  const child_el = fillListRef.value!.children[0] as HTMLElement;

  if (!child_el) return;
  itemHeight.value = child_el.offsetHeight;
  renderItems();
}, 500);

watch(
  () => $props.data,
  () => {
    nextTick(renderItems);
  },
);

onMounted(() => {
  window.addEventListener("resize", debounceUpdateStatus);
  renderItems();
  nextTick(debounceUpdateStatus);

  if (!$props.loadMore) return;
  new _LoadMore(
    {
      parent: virtualListRef.value!,
      loadHeight: 1,
    },
    {
      load() {
        //处于加载中或全部加载完毕禁止再次触发
        if ($props.loading || $props.finish) return;
        $emit("load-more");
      },
    },
  );
});

onActivated(() => {
  debounceUpdateStatus();
});

onDeactivated(() => {
  window.removeEventListener("resize", debounceUpdateStatus);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", debounceUpdateStatus);
});

defineExpose({
  _setPosition: setPosition,
  _updateStatus: debounceUpdateStatus,
});
</script>

<template>
  <div ref="virtualListRef" v-scroll-virtualization class="lib-virtual-list" @scroll="handleScroll">
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
    <KLoadMore v-if="loadMore" :loading="loading" :finish="finish" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
