<template>
  <transition name="fade">
    <div class="EpigraphList" v-if="flag">
      <LibGridLayout gap="15px" :count="count">
        <EpigraphCard v-for="(item, index) in data" :data="item" :key="index" />
      </LibGridLayout>
    </div>
  </transition>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import EpigraphCard from './childComps/EpigraphCard/index.vue';
import $bus from '@/utils/eventBus.js';

defineProps({
  data: {
    type: Array,
    default() {
      return [];
    },
  },
});

const flag = ref(false);
const count = ref(5);

onMounted(() => {
  setTimeout(() => {
    flag.value = true;
  }, 250);

  //#####··········实时修改一行个数··········#####//
  const change = [
    [1550, 3],
    [1250, 2],
    [950, 1],
  ];
  function initCount() {
    const v = document.documentElement.clientWidth;
    if (v > 1400) {
      count.value = 4;
    }
    for (const [a, b] of change) {
      if (v < a) {
        count.value = b;
      }
    }
  }
  initCount();
  $bus.on('resize', () => {
    initCount();
  });
});

onBeforeUnmount(() => {
  $bus.off('resize');
});
</script>
<style scoped lang="less">
.EpigraphList {
  width: 100%;
  height: 100%;
}
</style>
