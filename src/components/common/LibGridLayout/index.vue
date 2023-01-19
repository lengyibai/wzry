<template>
  <div
    ref="LibGridLayout"
    class="LibGridLayout"
    :style="{ gridTemplateColumns: 'repeat(' + count + ', 1fr)', gridGap: gap }"
    @scroll.passive="scroll"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
interface Props {
  count: number;
  gap: string;
  eqhMultiple: number;
  scrollTop?: number;
}
const props = withDefaults(defineProps<Props>(), {
  count: 3,
  gap: "0px",
  eqhMultiple: 0,
  scrollTop: 0,
});

const LibGridLayout = ref();

let childrens = ref<HTMLElement[]>([]);

const fn = () => {
  requestAnimationFrame(() => {
    childrens.value.forEach((item) => {
      item.style.height = `${item.offsetWidth * props.eqhMultiple}px`;
    });
  });
};
const updateHeight = () => {
  childrens.value = [...LibGridLayout.value.children];
  childrens.value.forEach((item) => {
    item.style.height = `${item.scrollWidth * props.eqhMultiple}px`;
    window.addEventListener("resize", fn);
  });
};

interface Emits {
  (e: "load-more"): void;
  (e: "scroll", v: number): void;
}
const emit = defineEmits<Emits>();
let lock = false;
const scroll = (e: Event) => {
  const el = e.target as HTMLElement;
  emit("scroll", el.scrollTop);

  if (el.scrollHeight < el.scrollTop + el.clientHeight * 1.5 && !lock) {
    emit("load-more");
  }
};

onMounted(() => {
  let a: any = null;
  a = requestAnimationFrame(fn);
  (function fn() {
    if (props.eqhMultiple > 0 && childrens.value?.length === 0) {
      updateHeight();
    } else if (childrens.value?.length > 0) {
      cancelAnimationFrame(a);
    }
  })();
  // 5秒后还未获取到插槽元素，则取消获取
  setTimeout(() => {
    cancelAnimationFrame(a);
  }, 5000);

  LibGridLayout.value?.scroll({ top: props.scrollTop });
});

onBeforeMount(() => {
  window.removeEventListener("resize", fn);
});

defineExpose({
  childrens,
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
