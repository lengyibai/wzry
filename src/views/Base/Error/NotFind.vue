<script lang="ts" setup>
import { useRouter } from "vue-router";

import { KButton } from "@/components/business";

const $router = useRouter();
</script>

<template>
  <div class="error notfound">
    <div class="error__content">
      <div class="title">404</div>
      <div class="text">页面未找到</div>
      <div class="desc">您访问了一个不存在的地址</div>
    </div>
    <KButton class="back-home" @click="$router.replace('/login')">回到主页</KButton>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
