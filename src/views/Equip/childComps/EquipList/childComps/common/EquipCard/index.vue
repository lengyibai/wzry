<template>
  <div class="equip-card" @click="$equipStore.editActive(equip.id)">
    <transition name="border-fade">
      <div class="border" v-show="active_id === equip.id"></div>
    </transition>
    <img class="cursor-pointer" :src="equip.icon" alt="" />
    <div class="box">
      <div class="name">{{ equip.name }}</div>
      <div class="desc" v-if="equip.desc">{{ equip.desc }}</div>
      <div class="price">{{ equip.price }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { equipDefault } from "@/defaultValue/defaults";
import equipStore from "@/store/equip";

interface Props {
  equip: typeof equipDefault;
}

withDefaults(defineProps<Props>(), {
  equip: () => {
    return equipDefault;
  },
  show: false,
});

const $equipStore = equipStore();

const active_id = computed(() => $equipStore.active_id); //获取点击的装备id
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
