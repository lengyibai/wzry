<script setup lang="ts">
const IMGBED = window.IMGBED; //全局图床链接
</script>

<template>
  <div class="not-container">
    <img :src="IMGBED + '/image/status_404.png'" class="not-img" alt="404" />
    <div class="not-detail">
      <h2>404</h2>
      <h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "./index.less";
</style>
