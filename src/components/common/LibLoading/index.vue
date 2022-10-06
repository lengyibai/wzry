<template>
  <transition name="fade">
    <div class="LibLoading flex" v-show="show">
      <img src="./img/daji.png" alt="妲己" />
      <span
        v-for="(item, index) in color"
        :key="index"
        :style="{
          backgroundColor: item,
          animationDelay: index * 0.1 - 0.8 + 0.5 + 's',
          boxShadow: '0 0 50px ' + item,
        }"
      ></span>
      <h1>{{ text }}...</h1>
    </div>
  </transition>
</template>
<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '加载中',
  },
});

const color = ['#ffff00', '#76ff03', '#f06292', '#4fc3f7', '#ba68c8', '#f57c00', '#673ab7'];
</script>
<style scoped lang="less">
@import './index.less';
</style>
