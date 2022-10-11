<template>
  <div class="EquipListPrimary" :style="{ opacity: show ? 1 : 0 }">
    <EquipCard v-for="(item) in equip_list" :equip="item" :key="item.id" />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import EquipCard from '../common/EquipCard/index.vue'; //装备卡片

const props = defineProps({
  equipList: {
    type: Array,
    default() {
      return [];
    },
  },
});

const equip_list = ref([]);
const show = ref(true);
watch(
  () => props.equipList,
  (v) => {
    show.value = false;
    setTimeout(() => {
      equip_list.value = v;
      show.value = true;
    }, 300);
  },
  { deep: true, immediate: true },
);
</script>
<style scoped lang="less">
.EquipListPrimary {
  width: 33.33%;
  transition: all 0.25s;
}
</style>
