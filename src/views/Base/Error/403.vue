<script lang="ts" setup>
import { useRouter } from "vue-router";

const $router = useRouter();
</script>

<template>
  <div class="main three">
    <div class="text">
      <div class="a">403</div>
      <div class="b">无权访问</div>
      <div class="c">你可能没有登录，或者你访问了需要管理员权限的页面</div>
    </div>
    <K-Button class="home" @click="$router.replace('/login')">回到主页</K-Button>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
