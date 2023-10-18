<script setup lang="ts">
import { onMounted, ref, onActivated } from "vue";
interface Props {
  /** 一行显示的个数 */
  count: number;
  /** 间隔 */
  gap?: string;
  /** 上一次的滚动坐标 */
  scrollTop?: number;
}

const $props = withDefaults(defineProps<Props>(), {
  gap: "0px",
  scrollTop: 0,
});
const $emit = defineEmits<{
  "load-more": [];
  scroll: [v: number];
}>();

/** 滚动状态下锁定 */
let lock = false;

const LibGridRef = ref();

let childrens = ref<HTMLElement[]>([]);

const scroll = (e: Event) => {
  const el = e.target as HTMLElement;
  $emit("scroll", el.scrollTop);

  if (el.scrollHeight < el.scrollTop + el.clientHeight * 1.5 && !lock) {
    $emit("load-more");
  }
};

const backTop = () => {
  LibGridRef.value?.scroll({ top: $props.scrollTop });
};

onMounted(() => {
  backTop();
});

onActivated(() => {
  backTop();
});

defineExpose({
  childrens,
});
</script>

<template>
  <div
    ref="LibGridRef"
    class="lib-grid"
    :style="{ gridTemplateColumns: 'repeat(' + count + ', 1fr)', gridGap: gap }"
    @scroll.passive="scroll"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
