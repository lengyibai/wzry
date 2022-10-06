<template>
  <div class="delHeroHeadPoster">
    <span class="text-gradient-one">英雄头像&海报：</span>
    <SelectImg
      :src="hero_data.headImg"
      keyword="headImg"
      @select="setKeyValue"
    />

    <SelectImg
      :src="hero_data.poster"
      keyword="poster"
      @select="setKeyValue"
      type="width"
    />
  </div>
</template>
<script setup>
import { inject } from 'vue';

const hero_data = inject('hero_data', {});
const setKeyValue = inject('setKeyValue', '');
</script>
<style scoped lang="less">
.delHeroHeadPoster {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 35px;
  width: 100%;
  span {
    font-size: 30px;
  }
}
</style>
