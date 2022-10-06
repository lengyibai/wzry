<template>
  <div class="Footbar cursor-pointer" @click="getPoint" ref="Footbar">
    <!-- v-particle="{ color: '#84ade2', filter: false, size: 10 }" -->
    <Time class="Time" />
    <PassTime />
    <Copyright class="Copyright" />
    <MusicPlay class="MusicPlay" :playProgress="playProgress" />
  </div>
</template>

<script setup>
//#####··········子组件··········#####//
import { ref } from 'vue';
import Time from './childComps/Time.vue'; //左侧时间
import PassTime from './childComps/PassTime.vue'; //中间过去时
import Copyright from './childComps/Copyright.vue'; //右侧版权
import MusicPlay from './childComps/MusicPlay.vue'; //音乐进度条

const playProgress = ref(0);

const Footbar = ref();

function getPoint(e) {
  playProgress.value = parseFloat(((e.pageX - Footbar.value.offsetLeft) / Footbar.value.offsetWidth).toFixed(2));
}
</script>

<style lang="less" scoped>
.Footbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 56px;
  // background: url("@/assets/img/footbar_bg.png") no-repeat center;
  // background-size: cover;
  .Time {
    margin-left: 15px;
  }
  .Copyright {
    margin-right: 15px;
  }
  .MusicPlay {
    position: absolute;
    bottom: 0;
  }
}
</style>
