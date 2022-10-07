<template>
  <div class="EpigraphList" :style="{ opacity: show ? 1 : 0 }">
    <LibGridLayout gap="15px" :count="count">
      <EpigraphCard v-for="(item, index) in epigraph_list" :data="item" :key="index" />
    </LibGridLayout>
  </div>
</template>
<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';
import EpigraphCard from './childComps/EpigraphCard/index.vue';
import $bus from '@/utils/eventBus.js';

const props = defineProps({
  data: {
    type: Array,
    default() {
      return [];
    },
  },
});

const show = ref(false);
const count = ref(5);
const epigraph_list = ref([]);

watch(
  () => props.data,
  (v) => {
    show.value = false;
    setTimeout(() => {
      epigraph_list.value = v;
      show.value = true;
    }, 300);
  },
  { deep: true, immediate: true },
);
//#####··········实时修改一行个数··········#####//
const change = [
  [1550, 3],
  [1250, 2],
  [950, 1],
];
const initCount = () => {
  const v = document.documentElement.clientWidth;
  if (v > 1400) {
    count.value = 4;
  }
  for (const [a, b] of change) {
    if (v < a) {
      count.value = b;
    }
  }
};
initCount();
$bus.on('resize', () => {
  initCount();
});

onBeforeUnmount(() => {
  $bus.off('resize');
});
</script>
<style scoped lang="less">
.EpigraphList {
  width: 100%;
  height: 100%;
  transition: all 0.25s;
}
</style>
