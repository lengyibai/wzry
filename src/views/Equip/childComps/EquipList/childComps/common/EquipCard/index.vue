<template>
  <div class="equip-card cursor-pointer" @click="$equipStore.setEquipActive(equip.id)">
    <transition name="border-fade">
      <div class="border" v-show="active_id === equip.id"></div>
    </transition>
    <img :src="equip.icon" alt="" ref="icon" />
    <transition name="left-line">
      <div class="left-line" v-if="leftLine"></div>
    </transition>
    <transition name="right-line" mode="in-out">
      <div class="right-line" v-if="rightLine"></div>
    </transition>
    <div class="box">
      <div class="name">{{ equip.name }}</div>
      <div class="info">
        <div class="desc" v-if="equip.desc">{{ equip.desc }}</div>
        <div class="price">{{ equip.price }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { equipDefault } from "@/defaultValue/defaults";
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

const active_id = computed(() => $equipStore.active_id); //获取点击的装备id

const icon = ref<HTMLElement>();

nextTick(() => {
  $equipStore.setEquipElement({
    el: icon.value,
    name: props.equip.name,
    id: props.equip.id,
  });
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
