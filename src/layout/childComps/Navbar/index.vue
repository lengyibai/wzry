<template>
  <!-- 导航栏 -->
  <div class="navbar border-1">
    <PackUp />

    <div class="right">
      <!-- 用户操作 -->
      <UserMenu />

      <!-- 设置 -->
      <i
        class="iconfont wzry-setting cursor-pointer"
        @click="$switchStore.$tip('开发中...', 'warning')"
        title="设置"
      />
      <a href="https://github.com/lengyibai/wzry" target="_blank"
        ><i class="iconfont wzry-mark-github" title="Github"
      /></a>
    </div>
  </div>
</template>
<script setup lang="ts">
import switchStore from "@/store/globalSwitch";
import PackUp from "./childComps/PackUp/index.vue"; //折叠侧边栏按钮
import UserMenu from "./childComps/UserMenu/index.vue"; //用户卡片

const $switchStore = switchStore();
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
