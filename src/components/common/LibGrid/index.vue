<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";

import { $tool } from "@/utils";

interface Props {
  /** 一行显示的个数 */
  count: number;
  /** 间隔 */
  gap?: string;
}

withDefaults(defineProps<Props>(), {
  gap: "0px",
});
const $emit = defineEmits<{
  "load-more": [];
  scroll: [v: number];
}>();

const LibGridRef = ref<HTMLElement>();

let childrens = ref<HTMLElement[]>([]);

onMounted(() => {
  new $tool.LoadMore(
    {
      parent: LibGridRef.value!,
      loadHeight: LibGridRef.value!.clientHeight * 1.5,
    },
    {
      load: () => {
        $emit("load-more");
      },
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
  <div
    ref="LibGridRef"
    class="lib-grid"
    :style="{ gridTemplateColumns: 'repeat(' + count + ', 1fr)', gridGap: gap }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
