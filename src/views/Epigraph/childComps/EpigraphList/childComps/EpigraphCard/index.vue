<template>
  <div class="EpigraphCard flex" v-maskGradient="{ color: 'rgb(45, 90, 142)', num1: '-35%', num2: '35%' }">
    <img :src="data.img" alt="" />
    <div class="box">
      <div class="name">5级铭文:{{ data.name }}</div>
      <div class="attr">
        <div class="type" v-for="(item, index) in data.effect" :key="index">{{ item.type }}+{{ item.num }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Epigraph } from '@/interface/epigraph'

interface Props {
  data: Epigraph
}

withDefaults(defineProps<Props>(), {
  data: () => {
    return {
      name: '',
      type: '',
      img: '',
      effect: [],
    }
  }
})
</script>
<style scoped lang="less">
@import './index.less';
</style>
