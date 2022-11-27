<template>
  <div class="LibFlipBox">
    <div class="card-side card-side-front" :style="{ transitionDuration: duration + 'ms' }">
      <slot name="front">正面</slot>
    </div>
    <div class="card-side card-side-back" :style="{ transitionDuration: duration + 'ms' }">
      <slot name="back">反面</slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  duration: {
    type: Number,
    default: 500,
  },
});
</script>
<style scoped lang="less">
.LibFlipBox {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;

  &:hover .card-side-front {
    transform: rotateX(-180deg);
  }

  &:hover .card-side-back {
    transform: rotateX(0deg);
  }

  .card-side {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transition: all ease;
    backface-visibility: hidden;
  }

  .card-side-back {
    transform: rotateY(180deg);
  }
}
</style>
