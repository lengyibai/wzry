<template>
  <div
    class="LibGridLayout"
    ref="LibGridLayout"
    :style="{ gridTemplateColumns: 'repeat(' + count + ', 1fr)', gridGap: gap }"
  >
    <slot></slot>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, toRefs } from "vue";

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

let childrens = [];
const LibGridLayout = ref();
const fn = () => {
  requestAnimationFrame(() => {
    childrens.forEach((item) => {
      item.style.height = `${item.offsetWidth * eqhMultiple.value}px`;
    });
  });
};
const updateHeight = () => {
  childrens.forEach((item) => {
    item.style.height = `${item.scrollWidth * eqhMultiple.value}px`;
  });
  window.addEventListener("resize", fn);
};

onMounted(() => {
  childrens = [...LibGridLayout.value.children];
  let a = null;
  (function fn() {
    if (eqhMultiple.value > 0 && childrens?.length) {
      updateHeight();
    }
    a = requestAnimationFrame(fn);
  })();
  // 3秒后还未获取到插槽元素，则取消获取
  setTimeout(() => {
    cancelAnimationFrame(a);
  }, 3000);
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
  height: 100%;
  padding: 15px;
  grid-auto-flow: row dense;
  align-content: flex-start;
}
</style>
