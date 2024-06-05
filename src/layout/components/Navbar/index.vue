<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

import PackUp from "./components/PackUp/index.vue";
import UserMenu from "./components/UserMenu/index.vue";
import BtnIcon from "./components/BtnIcon/index.vue";
import Notice from "./components/Notice/index.vue";

import { useHideLayout } from "@/layout/common/hooks/useHideLayout";
import { KPropNum } from "@/components/business";

const { hide_all } = useHideLayout();
const under_750 = useMediaQuery("(max-width: 750px)");
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
        <template v-if="!under_750">
          <KPropNum prop-key="GOLD" height="2.25rem" margin-right="1.5rem" shine />
          <KPropNum prop-key="DIAMOND" height="2.25rem" margin-right="1.5rem" shine />
        </template>

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
