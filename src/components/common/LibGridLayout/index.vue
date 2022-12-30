<template>
  <div
    class="LibGridLayout"
    ref="LibGridLayout"
    @scroll.passive="scroll"
    :style="{ gridTemplateColumns: 'repeat(' + count + ', 1fr)', gridGap: gap }"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref, toRefs, nextTick } from "vue";

const props = defineProps({
  count: {
    type: Number,
    default: 3,
  },
  gap: {
    type: String,
    default: "0px",
  },
  eqhMultiple: {
    type: Number,
    default: 0,
  },
});

const { eqhMultiple } = toRefs(props);

let childrens: HTMLElement[] = [];
const LibGridLayout = ref();
const fn = () => {
  requestAnimationFrame(() => {
    childrens.forEach((item) => {
      item.style.height = `${item.offsetWidth * eqhMultiple.value}px`;
    });
  });
};
const updateHeight = () => {
  childrens = [...LibGridLayout.value.children];
  nextTick(() => {
    childrens.forEach((item) => {
      item.style.height = `${item.scrollWidth * eqhMultiple.value}px`;
    });
    window.addEventListener("resize", fn);
  });
};

interface Emits {
  (e: "load-more"): void;
}
const emit = defineEmits<Emits>();
let lock = false;
const scroll = (e: Event) => {
  const el = e.target as HTMLElement;

  if (el.scrollHeight < el.scrollTop + el.clientHeight * 1.5 && !lock) {
    emit("load-more");
  }
};

onMounted(() => {
  let a: any = null;
  (function fn() {
    if (eqhMultiple.value > 0 && childrens?.length === 0) {
      updateHeight();
    }
    a = requestAnimationFrame(fn);
  })();
  // 3秒后还未获取到插槽元素，则取消获取
  setTimeout(() => {
    cancelAnimationFrame(a);
  }, 5000);
});

onBeforeMount(() => {
  window.removeEventListener("resize", fn);
});

defineExpose({
  updateHeight,
});
</script>
<style scoped lang="less">
.LibGridLayout {
  display: grid;
  overflow: auto;
  width: 100%;
  flex: 1;
  grid-auto-flow: row dense;
  align-content: flex-start;
}
</style>
