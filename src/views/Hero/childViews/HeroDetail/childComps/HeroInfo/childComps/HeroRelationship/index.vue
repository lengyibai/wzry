<script setup lang="ts">
interface Props {
  relationship: Hero.RelationType[]; //英雄信息组
}
defineProps<Props>();
</script>

<template>
  <div class="hero-relationship">
    <div v-for="(item, index) in relationship" :key="index" class="relation">
      <img :src="item.hero.headImg" alt="" @dragstart.prevent />
      <span class="name">{{ item.relation }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
