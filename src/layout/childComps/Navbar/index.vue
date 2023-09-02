<script setup lang="ts">
import PackUp from "./childComps/PackUp/index.vue";
import UserMenu from "./childComps/UserMenu/index.vue";
import BtnIcon from "./childComps/BtnIcon/index.vue";

import { Util } from "@/utils";
</script>

<template>
  <!-- 导航栏 -->
  <div class="navbar border-1">
    <!-- 折叠按钮 -->
    <PackUp />

    <div class="right">
      <span class="timeGreet">{{ $t(Util.TOOL.timeGreet()) }}</span>
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
