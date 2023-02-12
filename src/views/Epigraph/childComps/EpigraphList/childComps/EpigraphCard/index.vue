<script setup lang="ts">
interface Props {
  data: Epigraph.Data;
}
defineProps<Props>();
</script>

<template>
  <div v-maskGradient="{ color: 'rgb(45, 90, 142)', num1: '-35%', num2: '35%' }" class="epigraph-card flex">
    <img :src="data.img" alt="" @dragstart.prevent />
    <div class="box">
      <div class="name">5级铭文:{{ data.name }}</div>
      <div class="attr">
        <div v-for="(item, index) in data.effect" class="type" :key="index">{{ item.type }}+{{ item.num }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
