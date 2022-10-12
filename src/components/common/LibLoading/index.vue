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
.LibLoading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 998;
  img {
    position: absolute;
    width: 40vw;
    left: 0;
    bottom: 0;
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
    right: 2vh;
    top: 2vh;
    font-size: 2vw;
    color: #fff;
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
