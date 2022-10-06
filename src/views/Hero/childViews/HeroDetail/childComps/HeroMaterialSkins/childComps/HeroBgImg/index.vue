<template>
  <div class="HeroBgImg">
    <transition-group name="clip">
      <img class="bg" v-if="bgImg[0]" :src="bgImg[0]" alt="" v-show="toggle" key="a" />
      <img class="bg" :src="bgImg[1]" alt="" v-show="!toggle" key="b" />
    </transition-group>
  </div>
</template>
<script setup>
defineProps({
  bgImg: {
    type: Array,
    default() {
      return [];
    },
  },
  toggle: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped lang="less">
.HeroBgImg {
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    object-fit: cover;
    background-color: #000;
  }
}

/* 蒙版裁剪 */
.clip-enter-active {
  animation: clip-in 1s;
}
.clip-leave-active {
  animation: clip-out 1s;
}

@keyframes clip-in {
  0% {
    clip-path: polygon(0 0, 50% 50%, 100% 100%, 50% 50%);
  }

  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

@keyframes clip-out {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 100% 0, 50% 50%, 0 100%);
  }
}
</style>
