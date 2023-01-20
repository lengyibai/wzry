<script setup lang="ts">
interface Props {
  relationship: Hero.RelationType[];
}
withDefaults(defineProps<Props>(), {
  relationship: () => [],
});
</script>

<template>
  <div class="hero-relationship">
    <div v-for="(item, index) in relationship" :key="index" class="relation">
      <span class="name">{{ item.relation }}：</span>
      <img :src="item.hero.headImg" alt="" @dragstart.prevent />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
