<template>
  <div class="EquipCard">
    <transition name="borderFade">
      <div class="border" v-show="active_id === equip.id"></div>
    </transition>
    <img class="cursor-pointer" :src="equip.icon" @click="editActive(equip.id)" alt="" />
    <div class="box">
      <div class="name">{{ equip.name }}</div>
      <div class="desc" v-if="equip.desc">{{ equip.desc }}</div>
      <div class="price">{{ equip.price }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Equip } from '@/interface/items';
import { equipDefault } from '@/interface/defaults';
import equipStore from '@/store/equip';

interface Props {
  equip: Equip;
}
withDefaults(defineProps<Props>(), {
  equip: () => {
    return equipDefault;
  },
  show: false,
});
const $equipStore = equipStore();

const editActive = $equipStore.editActive; //选中装备
const active_id = computed(() => $equipStore.active_id); //获取点击的装备id
</script>
<style scoped lang="less">
@import './index.less';
</style>
