<template>
  <!-- 导航栏 -->
  <div class="navbar border-1">
    <!-- 收起按钮 -->
    <PackUp class="pack-up" />

    <div class="right">
      <!-- 搜索 -->
      <LibSvg
        :svg="icon.search"
        size="35px"
        enterColor="var(--white)"
        color="var(--theme-color-five)"
        right="20px"
        @click="$switchStore.$tip('开发中...', 'warning')"
      />
      <!-- 设置 -->
      <LibSvg
        :svg="icon.setting"
        size="35px"
        enterColor="var(--white)"
        color="var(--theme-color-five)"
        right="20px"
        @click="$switchStore.$tip('开发中...', 'warning')"
      />

      <!-- 用户操作 -->
      <UserMenu />
    </div>
  </div>
</template>
<script setup lang="ts">
import icon from "./img/icon";
import switchStore from "@/store/globalSwitch";
import PackUp from "./childComps/PackUp/index.vue"; //收起按钮
import UserMenu from "./childComps/UserMenu/index.vue"; //用户卡片

const $switchStore = switchStore();
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
