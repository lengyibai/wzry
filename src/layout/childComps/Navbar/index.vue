<script setup lang="ts">
import PackUp from "./childComps/PackUp/index.vue";
import UserMenu from "./childComps/UserMenu/index.vue";
import BtnIcon from "./childComps/BtnIcon/index.vue";

import { $tool } from "@/utils";
</script>

<template>
  <!-- 导航栏 -->
  <transition name="navbar" appear>
    <div class="navbar border-1">
      <!-- 折叠按钮 -->
      <PackUp />

      <div class="navbar__right">
        <span class="timeGreet">{{ $t($tool.timeGreet()) }}</span>
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
