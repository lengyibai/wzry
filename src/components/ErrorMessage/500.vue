<script setup lang="ts">
const IMGBED = window.IMGBED; //全局图床链接
</script>

<template>
  <div class="not-container">
    <img :src="IMGBED + '/image/status_500.png'" class="not-img" alt="500" />
    <div class="not-detail">
      <h2>500</h2>
      <h4>抱歉，您的网络不见了~🤦‍♂️🤦‍♀️</h4>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
