<template>
  <!-- 导航栏 -->
  <div class="navbar border-1">
    <!-- 收起按钮 -->
    <Hamburger class="Hamburger" />

    <div class="right">
      <!-- 搜索 -->
      <LibSvg
        :svg="icon.search"
        size="35px"
        enterColor="var(--white)"
        color="var(--theme-color-five)"
        right="20px"
        @click="$tip('开发中...', 'warning')"
      />
      <!-- 设置 -->
      <LibSvg
        :svg="icon.setting"
        size="35px"
        enterColor="var(--white)"
        color="var(--theme-color-five)"
        right="20px"
        @click="$tip('开发中...', 'warning')"
      />

      <!-- 用户操作 -->
      <UserMenu />
    </div>
  </div>
</template>

<script setup>
//#####··········图标··········#####//
import icon from './img/icon.js';
//#####··········子组件··········#####//
import Hamburger from './childComps/Hamburger/index.vue';
import UserMenu from './childComps/UserMenu/index.vue';
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  position: relative;
  // background: url("@/assets/img/nav_bg.png") no-repeat center;
  background-size: cover;
  .Hamburger {
    margin-left: 15px;
  }
  .right {
    flex: 1;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    height: 100%;
  }
}
</style>
