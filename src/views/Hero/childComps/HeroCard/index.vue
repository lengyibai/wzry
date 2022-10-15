<template>
  <div class="HeroCard cursor-pointer" v-maskGradient v-sweepLight="false" @mouseenter="show = true" @mouseleave="show = false">
    <div class="id">No.{{ data.id }}</div>
    <transition name="fade">
      <div class="select-mask" v-if="show">
        <img :src="data.headImg" class="head" />
        <h1 class="view cursor-pointer" @click="viewClick" @mouseenter="lineActive = true" @mouseleave="lineActive = false" v-textHoverColor>
          查看详情
        </h1>
        <div class="line" :class="{ lineActive: lineActive }" ref="line"></div>
      </div>
    </transition>

    <img class="bg" :src="data.cover" :style="{
      top: data.offset?.top + '%',
      left: data.offset?.left + '%',
      transform: data.offset?.transform,
    }" />
    <div class="bottom">
      <div class="name" v-typewriter="data.name"></div>
      <div class="mark">{{ data.mark }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Hero } from '@/interface/hero'
import { heroDefault } from '@/interface/defaults';

interface Props {
  data: Hero
}

withDefaults(defineProps<Props>(), {
  data: () => heroDefault
});

const show = ref(false); //显示查看详情选项
const lineActive = ref(false); //悬浮文字底部线条

/* 查看详情 */
const emit = defineEmits(['view']);
const viewClick = () => {
  emit('view');
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
