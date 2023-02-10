<script setup lang="ts">
import deviceStore from "@/store/device";

const $deviceStore = deviceStore();
</script>

<template>
  <div class="main incompatible">
    <div class="text">
      <div class="a">400</div>
      <div class="b">浏览器兼容问题</div>
      <div class="c">
        <span class="green-text">Chrome 内核 >= 90</span><br />
        <span class="green-text">Firefox 内核 >= 90</span><br />
        <span class="green-text">Safari 内核 >= 15</span><br />
        你的 <span class="red-text">{{ $deviceStore.browser_name }} 内核为 {{ $deviceStore.browser_version }}</span
        >，不满足访问条件<br />
        请尝试更换或升级浏览器后再访问
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
