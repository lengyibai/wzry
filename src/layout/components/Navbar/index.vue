<script setup lang="ts">
import PackUp from "./components/PackUp/index.vue";
import UserMenu from "./components/UserMenu/index.vue";
import BtnIcon from "./components/BtnIcon/index.vue";
</script>

<template>
  <!-- 导航栏 -->
  <transition name="navbar" appear>
    <div class="navbar border-1">
      <!-- 折叠按钮 -->
      <PackUp />

      <div class="navbar__right">
        <!-- 用户菜单 -->
        <UserMenu />

        <!-- 图标按钮 -->
        <BtnIcon />
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>
