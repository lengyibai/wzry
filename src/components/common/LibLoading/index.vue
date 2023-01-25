<template>
  <transition name="fade">
    <div v-show="show" class="LibLoading flex">
      <img :src="IMGBED + '/image/daji.png'" alt="妲己" @dragstart.prevent />
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
    default: "加载中",
  },
});

const color = ["#ffff00", "#76ff03", "#f06292", "#4fc3f7", "#ba68c8", "#f57c00", "#673ab7"];

const IMGBED = window.IMGBED; //全局图床链接
</script>
<style scoped lang="less">
.LibLoading {
  position: fixed;
  z-index: 998;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 75%);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40vw;
  }

  span {
    display: inline-block;
    width: 1.5vw;
    height: 1.5vw;
    transform: scale(0.2);
    animation: animate 1s infinite;
  }

  h1 {
    position: absolute;
    top: 2vh;
    right: 2vh;
    color: var(--white);
    font-size: 2vw;
  }
}

@keyframes animate {
  0% {
    transform: translateY(0%) scale(0.2);
  }

  25% {
    transform: translateY(-200%) scale(1);
    border-radius: 50%;
  }

  50% {
    transform: translateY(200%) scale(1);
    border-radius: 50%;
  }

  100% {
    transform: translateY(0%) scale(0.2);
  }
}
</style>
