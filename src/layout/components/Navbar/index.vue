<script setup lang="ts">
import PackUp from "./components/PackUp/index.vue";
import PropNum from "./components/PropNum/index.vue";
import UserMenu from "./components/UserMenu/index.vue";
import BtnIcon from "./components/BtnIcon/index.vue";
import Notice from "./components/Notice/index.vue";

import { useHideLayout } from "@/layout/common/hooks/useHideLayout";

const { hide_all } = useHideLayout();
</script>

<template>
  <!-- 导航栏 -->
  <transition name="to-bottom" appear>
    <div v-show="!hide_all" class="navbar border-1">
      <!-- 折叠按钮 -->
      <PackUp />

      <!-- 公告 -->
      <Notice />

      <div class="navbar__right">
        <!-- 道具数量 -->
        <PropNum />

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
