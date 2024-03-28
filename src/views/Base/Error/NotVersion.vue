<script setup lang="ts">
import { useDevice } from "@/hooks";

const { browser_name, browser_version } = useDevice();
</script>

<template>
  <div class="error incompatible">
    <div class="error__content">
      <div class="title">400</div>
      <div class="text">浏览器兼容问题</div>
      <div class="desc">
        <span class="desc__green">Chrome 内核 >= 90</span><br />
        <span class="desc__green">Firefox 内核 >= 90</span><br />
        <span class="desc__green">Safari 内核 >= 15</span><br />
        您的
        <span class="desc__red"> {{ browser_name }} 内核为 {{ browser_version }}， </span>
        不满足访问条件<br />请尝试更换或升级浏览器后再访问
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
