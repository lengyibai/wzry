<template>
  <div class="footbar cursor-pointer" @click="getPoint" ref="Footbar">
    <!-- v-particle="{ color: '#84ade2', filter: false, size: 10 }" -->
    <Time class="time" />
    <PassTime />
    <Copyright class="copyright" />
    <MusicPlay class="music-play" :playProgress="playProgress" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Time from "./childComps/Time.vue"; //左侧时间
import PassTime from "./childComps/PassTime.vue"; //中间过去时
import Copyright from "./childComps/Copyright.vue"; //右侧版权
import MusicPlay from "./childComps/MusicPlay.vue"; //音乐进度条

/* 通过获取点击的坐标，计算出播放进度 */
const getPoint = (e: MouseEvent) => {
  playProgress.value = parseFloat(((e.pageX - Footbar.value.offsetLeft) / Footbar.value.offsetWidth).toFixed(2));
};

const Footbar = ref();
const playProgress = ref(0); //播放进度
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
