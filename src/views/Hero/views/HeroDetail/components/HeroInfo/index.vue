<script setup lang="ts">
import { ref } from "vue";

import HeroTitle from "./components/HeroTitle/index.vue";
import HeroBasic from "./components/HeroBasic/index.vue";
import HeroAttributes from "./components/HeroAttributes/index.vue";
import HeroResume from "./components/HeroResume/index.vue";

import { KScrollTip } from "@/components/business";
import { useResponsive } from "@/hooks";

const { under_1200 } = useResponsive();

const downRef = ref<InstanceType<typeof KScrollTip>>();

/** 控制页面元素显示 */
const into = ref(true);
</script>

<template>
  <div class="hero-info">
    <!-- 英雄标题 -->
    <HeroTitle :class="{ show: !into }" />

    <div class="content">
      <div v-if="under_1200" class="left">
        <HeroBasic />
        <HeroResume />
      </div>

      <template v-else>
        <HeroBasic />
        <HeroResume />
      </template>
      <HeroAttributes />
    </div>

    <!-- 可滚动提示 -->
    <KScrollTip ref="downRef" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
