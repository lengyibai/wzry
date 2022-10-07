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
<script setup>
import { computed } from 'vue';
import equipStore from '@/store/equip.js';

defineProps({
  /* 装备信息 */
  equip: {
    type: Object,
    default() {
      return {};
    },
  },
});
const $equipStore = equipStore();
const editActive = $equipStore.editActive; //选中装备
const active_id = computed(() => $equipStore.active_id); //获取点击的装备id
</script>
<style scoped lang="less">
.EquipCard {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  .border {
    width: 75px;
    height: 75px;
    position: absolute;
    border: 5px solid #fef5b2;
    border-radius: 50%;
    left: 0;
    pointer-events: none;
    z-index: 1;
    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translatex(-50%);
      border-style: solid;
      border-width: 10px;
      box-sizing: border-box;
    }
    &::before {
      top: -4px;
      border-color: #fff498 transparent transparent transparent;
    }
    &::after {
      bottom: -4px;
      border-color: transparent transparent #fff498 transparent;
    }
  }
  img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin-right: 5px;
    border: 3px solid var(--theme-color-two);
  }
  .box {
    color: var(--theme-color-nine);
    font-size: 20px;
    text-shadow: var(--t-shadow);
    .name {
      font-size: inherit;
    }
    .desc {
      font-size: 16px;
      color: var(--theme-color-seven);
    }
    .price {
      font-size: 16px;
      color: var(--theme-color-five);
    }
  }
}

.borderFade-enter-from,
.borderFade-leave-to {
  opacity: 0;
}
.borderFade-enter-active {
  transition: all 0.25s;
}

.borderFade-leave-active {
  transition: all 0.25s;
}
</style>
