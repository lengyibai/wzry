<template>
  <div class="hero-relationship">
    <div class="relation" v-for="(item, index) in relationship" :key="index">
      <span class="name">{{ item.relation }}：</span>
      <img :src="item.hero.headImg" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  relationship: Hero.RelationType[];
}
withDefaults(defineProps<Props>(), {
  relationship: () => [],
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
