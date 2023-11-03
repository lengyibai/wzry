<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

import waterFullLayout from "./Waterfall";
interface Props {
  count?: number;
  gap?: number;
  loadHeight?: number;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  count: 2,
  gap: 10,
  loadHeight: 250,
});

interface Emits {
  (e: "update:loading", v: boolean): void;
  (e: "scroll", v: number): void;
  (e: "load-more"): void;
}
const emit = defineEmits<Emits>();

const childs = ref<HTMLElement[]>([]);
const isLoadMore = ref(true);

const waterfallRef = ref<HTMLElement>();

const updateChilds = () => {
  nextTick(() => {
    const children = Array.from(waterfallRef.value!.children) as HTMLElement[];

    if (!children) return;
    childs.value = children;
    waterFullLayout({ count: props.count, gap: props.gap, childs: childs.value });
  });
};

const updateLoad = () => {
  const onAllImgLoaded = (root: HTMLElement, callback: () => void) => {
    const imgNodes = root.querySelectorAll("img");
    Array.from(imgNodes).map((img) => {
      img.addEventListener("load", () => {
        callback();
      });
    });
  };
  updateChilds();
  onAllImgLoaded(waterfallRef.value!, () => {
    updateChilds();
  });
};

onMounted(() => {
  updateChilds();
  updateLoad();
  waterfallRef.value!.parentElement!.addEventListener("scroll", (e: Event) => {
    const el = e.target as HTMLDivElement;
    let d = Math.abs(el.scrollTop - el.scrollHeight + el.clientHeight);

    /* 当到达底部显示正在加载 */
    if (d <= 0) {
      emit("update:loading", true);
    }

    if (d <= props.loadHeight && isLoadMore.value) {
      emit("load-more");
      isLoadMore.value = false;
    } else if (d > props.loadHeight) {
      isLoadMore.value = true;
    }

    emit("scroll", el.scrollTop);
  });
});

watch(() => props.count, updateChilds);

defineExpose({
  updateLoad,
  updateChilds,
});
</script>

<template>
  <div ref="waterfallRef" class="waterfall">
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.waterfall {
  position: relative;
}
</style>
