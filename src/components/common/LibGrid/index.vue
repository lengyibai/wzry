<script setup lang="ts">
import { onMounted, ref, onActivated } from "vue";
interface Props {
  count: number;
  gap?: string;
  scrollTop?: number;
}
const props = withDefaults(defineProps<Props>(), {
  gap: "0px",
  scrollTop: 0,
});

interface Emits {
  (e: "load-more"): void;
  (e: "scroll", v: number): void;
}
const emit = defineEmits<Emits>();

let lock = false; //滚动状态下锁定

const LibGrid = ref();

let childrens = ref<HTMLElement[]>([]);

const scroll = (e: Event) => {
  const el = e.target as HTMLElement;
  emit("scroll", el.scrollTop);

  if (el.scrollHeight < el.scrollTop + el.clientHeight * 1.5 && !lock) {
    emit("load-more");
  }
};

const backTop = () => {
  LibGrid.value?.scroll({ top: props.scrollTop });
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
    class="LibGrid"
    :style="{ gridTemplateColumns: 'repeat(' + count + ', 1fr)', gridGap: gap }"
    @scroll.passive="scroll"
    ref="LibGrid"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
