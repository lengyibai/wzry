<script setup lang="ts">
import { onMounted, ref } from "vue";

import KLoadMore from "@/components/business/Parts/K-LoadMore/index.vue";
import { vScrollVirtualization } from "@/directives";
import { _LoadMore } from "@/utils/tool";

interface Props {
  /** 一行显示的个数 */
  count: number;
  /** 间隔 */
  gap?: string;
  /** 是否暂无更多 */
  finish?: boolean;
  /** 是否启用加载更多 */
  loadMore?: boolean;
  /** 是否处于加载中 */
  loading?: boolean;
  /** 是否启用列表虚化 */
  virtualization?: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  gap: "0px",
  loadMore: true,
  finish: false,
  loading: false,
  virtualization: true,
});
const $emit = defineEmits<{
  "load-more": [];
  scroll: [v: number];
}>();

const LibGridRef = ref<HTMLElement>();

/** @description 滚动指定位置
 * @param top 滚动坐标
 * @param animate 是否开启滚动动画动画
 */
const setPosition = (top: number, animate = false) => {
  LibGridRef.value?.scroll({ top, behavior: animate ? "smooth" : "auto" });
};

onMounted(() => {
  new _LoadMore(
    {
      parent: LibGridRef.value!,
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
  _el: LibGridRef,
  _setPosition: setPosition,
});
</script>

<template>
  <div ref="LibGridRef" v-scroll-virtualization="virtualization" class="lib-grid">
    <div
      class="lib-grid_content"
      :style="{
        gridTemplateColumns: `repeat(${count}, 1fr)`,
        gridGap: gap,
      }"
    >
      <slot></slot>
    </div>

    <KLoadMore v-if="loadMore" :loading="loading" :finish="finish" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
