<script setup lang="ts">
interface Props {
  show: boolean;
  text: string;
}
withDefaults(defineProps<Props>(), {
  text: "加载中",
});

const IMGBED = window.IMGBED; //全局图床链接
const color = ["#ffff00", "#76ff03", "#f06292", "#4fc3f7", "#ba68c8", "#f57c00", "#673ab7"];
</script>

<template>
  <transition name="fade">
    <div v-show="show" class="k-loading flex">
      <img :src="IMGBED + '/image/daji.png'" alt="妲己" @dragstart.prevent />
      <span
        v-for="(item, index) in color"
        :style="{
          backgroundColor: item,
          animationDelay: index * 0.1 - 0.8 + 0.5 + 's',
          boxShadow: '0 0 50px ' + item,
        }"
        :key="index"
      ></span>
      <h1>{{ text }}...</h1>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
