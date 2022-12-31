<template>
  <!-- 导航栏 -->
  <div class="navbar border-1">
    <div class="right">
      <!-- 搜索 -->
      <i
        class="iconfont wzry-search cursor-pointer"
        @click="$switchStore.$tip('开发中...', 'warning')"
        title="搜索"
      />
      <!-- 设置 -->
      <i
        class="iconfont wzry-setting cursor-pointer"
        @click="$switchStore.$tip('开发中...', 'warning')"
        title="设置"
      />
      <a href="https://github.com/lengyibai/wzry" target="_blank"
        ><i class="iconfont wzry-mark-github" title="Github"
      /></a>

      <!-- 用户操作 -->
      <UserMenu />
    </div>
  </div>
</template>
<script setup lang="ts">
import switchStore from "@/store/globalSwitch";
import UserMenu from "./childComps/UserMenu/index.vue"; //用户卡片

const $switchStore = switchStore();
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
