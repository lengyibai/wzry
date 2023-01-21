<script setup lang="ts">
interface Props {
  bgImg: string[]; //背景图组
  toggle: boolean; //用于切换
}
defineProps<Props>();
</script>

<template>
  <div class="hero-bg-img">
    <transition-group name="clip">
      <img
        v-if="bgImg[0]"
        v-show="toggle"
        key="a"
        class="bg"
        :src="bgImg[0]"
        alt=""
      />
      <img v-show="!toggle" key="b" class="bg" :src="bgImg[1]" alt="" />
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
