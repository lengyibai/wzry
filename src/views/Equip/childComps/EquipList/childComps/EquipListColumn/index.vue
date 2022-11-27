<template>
  <div class="equip-list-primary" :style="{ opacity: show ? 1 : 0 }">
    <EquipCard v-for="item in equip_list" :equip="item" :key="item.id" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import EquipCard from "../common/EquipCard/index.vue"; //装备卡片

interface Props {
  equipList: Equip.Data[];
}

const props = withDefaults(defineProps<Props>(), {
  equipList: () => [],
});

const equip_list = ref<Equip.Data[]>([]); //装备列表
const show = ref(true); //淡入显示列表

/* 监听列表，实时更新列表 */
watch(
  () => props.equipList,
  (v) => {
    show.value = false; //隐藏，延迟显示
    setTimeout(() => {
      equip_list.value = v;
      show.value = true;
    }, 300);
  },
  { deep: true, immediate: true }
);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
