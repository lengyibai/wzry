<script setup lang="ts">
const IMGBED = window.IMGBED; //全局图床链接
</script>

<template>
  <div class="not-container">
    <img :src="IMGBED + '/image/status_403.png'" class="not-img" alt="403" />
    <div class="not-detail">
      <h2>403</h2>
      <h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
