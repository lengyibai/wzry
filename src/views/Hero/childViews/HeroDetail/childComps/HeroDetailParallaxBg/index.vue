<template>
  <div
    class="HeroDetailParallaxBg"
    :style="{
      backgroundImage: 'url(' + bg + ')',
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup>
defineProps({
  bg: {
    type: String,
    default: '',
  },
});
</script>
<style scoped lang="less">
.HeroDetailParallaxBg {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: no-repeat center center fixed;
  background-size: cover;
  scroll-snap-align: start;
}
</style>
