<script setup lang="ts">
import switchStore from "@/store/globalSwitch";

const $switchStore = switchStore();
</script>

<template>
  <div class="btn-icon">
    <i
      class="iconfont wzry-setting cursor-pointer"
      @click="$switchStore.$tip('开发中...', 'warning')"
      title="设置"
    />
    <a href="https://github.com/lengyibai/wzry" target="_blank"
      ><i class="iconfont wzry-mark-github" title="Github"
    /></a>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
