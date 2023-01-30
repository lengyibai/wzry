<script lang="ts" setup>
import { useRouter } from "vue-router";

const $router = useRouter();
</script>

<template>
  <div class="main four">
    <div class="text">
      <div class="a">404</div>
      <div class="b">页面未找到</div>
      <div class="c">你访问了一个不存在的地址</div>
    </div>
    <K-Button class="home" @click="$router.replace('/login')">回到主页</K-Button>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
