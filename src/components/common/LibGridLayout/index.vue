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

let lock = false;

const LibGridLayout = ref();

let childrens = ref<HTMLElement[]>([]);

const scroll = (e: Event) => {
  const el = e.target as HTMLElement;
  emit("scroll", el.scrollTop);

  if (el.scrollHeight < el.scrollTop + el.clientHeight * 1.5 && !lock) {
    emit("load-more");
  }
};

const backTop = () => {
  LibGridLayout.value?.scroll({ top: props.scrollTop });
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
