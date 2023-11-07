<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import _debounce from "lodash/debounce";

import { $tool } from "@/utils";

interface Props {
  /** 一行显示的个数 */
  count: number;
  /** 间隔 */
  gap?: string;
  /** 是否暂无更多 */
  finish?: boolean;
  /** 是否启用加载更多 */
  loadMore?: boolean;
}

withDefaults(defineProps<Props>(), {
  gap: "0px",
  loadMore: true,
  finish: false,
});
const $emit = defineEmits<{
  "load-more": [];
  scroll: [v: number];
}>();

const LibGridRef = ref<HTMLElement>();

let childrens = ref<HTMLElement[]>([]);

onMounted(() => {
  const _debounceLoad = _debounce(() => {
    $emit("load-more");
  }, 250);

  new $tool.LoadMore(
    {
      parent: LibGridRef.value!,
      loadHeight: 10,
    },
    {
      load: _debounceLoad,
      scroll: (v) => {
        $emit("scroll", v);
      },
    },
  );
});

/** @description 滚动指定位置 */
const setPosition = (top: number) => {
  LibGridRef.value?.scroll({ top });
};

defineExpose({
  childrens,
  setPosition,
});
</script>

<template>
  <div ref="LibGridRef" class="lib-grid">
    <div
      class="lib-grid_content"
      :style="{
        gridTemplateColumns: 'repeat(' + count + ', 1fr)',
        gridGap: gap,
      }"
    >
      <slot></slot>
    </div>
    <K-LoadMore v-if="loadMore" :finish="finish" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
