<script setup lang="ts">
import PackUp from "./childComps/PackUp/index.vue"; //折叠侧边栏按钮
import PassTime from "./childComps/PassTime/index.vue"; //中间过去时
import UserMenu from "./childComps/UserMenu/index.vue"; //用户卡片
import BtnIcon from "./childComps/BtnIcon/index.vue"; //图标按钮
</script>

<template>
  <!-- 导航栏 -->
  <div class="navbar border-1">
    <!-- 折叠按钮 -->
    <PackUp />

    <!-- 已过去时间 -->
    <PassTime />

    <div class="right">
      <!-- 用户菜单 -->
      <UserMenu />

      <!-- 图标按钮 -->
      <BtnIcon />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>
