<script lang="ts" setup>
import { useRouter } from "vue-router";

import { KButton } from "@/components/business";
import { vMouseTip } from "@/directives";

const $router = useRouter();
</script>

<template>
  <div class="error not-found">
    <div class="error__content">
      <div class="title">404</div>
      <div class="text">页面未找到</div>
      <div class="desc">您访问了一个不存在的地址</div>
    </div>
    <KButton v-mouse-tip class="back-home" @click="$router.replace('/login')">回到主页</KButton>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
