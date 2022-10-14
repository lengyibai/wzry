<template>
  <div class="K-ManageCard">
    <div class="box flex">
      <LibSvg class="icon" :svg="icon[type.toUpperCase()]" color="#fff" size="75px" />
      <div class="title">{{ title }}</div>
    </div>
    <img :src="getImg(type)" alt="" />
  </div>
</template>
<script setup>
import icon from './svg/index';

defineProps({
  type: {
    type: String,
    default: 'add',
  },
  title: {
    type: String,
    default: '英雄',
  },
});

const getImg = (src) => {
  return new URL(`./img/${src}.png`, import.meta.url).href;
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
