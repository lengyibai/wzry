<script lang="ts" setup>
import { useRouter } from "vue-router";

import { KButton } from "@/components/business";
import { vMouseTip } from "@/directives";

const { replace } = useRouter();
</script>

<template>
  <div class="error unauthorized">
    <div class="error__content">
      <div class="title">403</div>
      <div class="text">无权访问</div>
      <div class="desc">您可能没有登录，或者您访问了需要管理员权限的页面</div>
    </div>
    <KButton v-mouse-tip class="back-home" @click="replace('/login')">回到主页</KButton>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
