<script setup lang="ts">
interface Props {
  data: Epigraph.Data;
}

defineProps<Props>();
</script>

<template>
  <div
    v-maskGradient="{
      color: 'rgb(62 123 194)',
      num1: '-50%',
      num2: '50%',
      rotate: '345deg',
    }"
    class="epigraph-card"
  >
    <img :data-src="data.img" class="blur" :src="data.imgBlur" alt="" />
    <div class="box">
      <div class="name">5级铭文:{{ data.name }}</div>
      <div class="attr">
        <div v-for="(item, index) in data.effect" :key="index" class="type">
          {{ item.type }}+{{ item.num }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
