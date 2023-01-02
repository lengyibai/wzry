<script setup lang="ts">
import equipStore from "@/store/equip";
import { ref, watch } from "vue";
import EquipCard from "../common/EquipCard/index.vue"; //装备卡片

interface Props {
  equipList: Equip.Data[];
  lineData: any[];
  index: number;
}
const props = withDefaults(defineProps<Props>(), {
  equipList: () => [],
});

const $equipStore = equipStore();

const card = ref();
const show = ref(true); //淡入显示列表
const equip_list = ref<Equip.Data[]>([]); //装备列表

const showLine = (id: number, line: string) => {
  return props.lineData.some((item) => {
    if (line === "left") {
      return item.id === id && props.index !== 0;
    } else {
      return item.id === id && props.index !== 2 && item.to;
    }
  });
};

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

<template>
  <div class="equip-list-primary" :style="{ opacity: show ? 1 : 0 }">
    <EquipCard
      ref="card"
      :leftLine="showLine(item.id, 'left')"
      :rightLine="showLine(item.id, 'right')"
      v-for="item in equip_list"
      :equip="item"
      :key="item.id"
    />
    <div
      class="vertical-line"
      v-if="index !== 0"
      :style="{
        top: $equipStore.vertical_line[index].top,
        height: $equipStore.vertical_line[index].height,
      }"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
