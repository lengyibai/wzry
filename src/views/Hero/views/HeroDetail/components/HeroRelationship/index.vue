<script setup lang="ts">
import { ref } from "vue";

import HeroRelationDesc from "./components/HeroRelationDesc/index.vue";
import HeroRelationshipAtlas from "./components/HeroRelationshipAtlas/index.vue";

import { KScrollTip } from "@/components/business";
import { HeroDetailStore } from "@/store";

const { setScrollFn } = HeroDetailStore();

const show = ref(false);

/* 当滚动到英雄关系页，播放入场动画 */
setScrollFn("skinIcon", (pageName) => {
  if (show.value || pageName !== "英雄关系") return;
  show.value = true;
});
</script>

<template>
  <div class="hero-relationship">
    <!-- 关系信息 -->
    <HeroRelationDesc />

    <!-- 关系图谱 -->
    <HeroRelationshipAtlas v-if="show" />

    <!-- 可滚动提示 -->
    <KScrollTip ref="downRef" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
