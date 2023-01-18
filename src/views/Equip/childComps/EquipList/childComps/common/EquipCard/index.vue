<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

import switchStore from "@/store/switch";
import { equipDefault } from "@/defaultValue";
import equipStore from "@/store/equip";

interface Props {
  equip: typeof equipDefault;
  leftLine?: boolean;
  rightLine?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  equip: () => {
    return equipDefault;
  },
  show: false,
});

const $equipStore = equipStore();
const $switchStore = switchStore();

const active_id = computed(() => $equipStore.active_id); //获取点击的装备id

const icon = ref();

/* 装备详情 */
const handleDetail = () => {
  $equipStore.setEquipActive(props.equip.id);
  $switchStore.$clickAudio("n4r4");
};

nextTick(() => {
  $equipStore.setEquipElement({
    el: icon.value,
    name: props.equip.name,
    id: props.equip.id,
  });
});
</script>

<template>
  <div class="equip-card cursor-pointer" @click="handleDetail">
    <transition name="border-fade">
      <div v-show="active_id === equip.id" class="border"></div>
    </transition>
    <img ref="icon" :src="equip.icon" alt="" />
    <transition name="left-line">
      <div v-if="leftLine" class="left-line"></div>
    </transition>
    <transition name="right-line" mode="in-out">
      <div v-if="rightLine" class="right-line"></div>
    </transition>
    <div class="box">
      <div class="name">{{ equip.name }}</div>
      <div class="info">
        <div v-if="equip.desc" class="desc">{{ equip.desc }}</div>
        <div class="price">{{ equip.price }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
