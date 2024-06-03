<script setup lang="ts">
import { ref } from "vue";

import HeroRelationDesc from "./components/HeroRelationDesc/index.vue";
import HeroRelationshipAtlas from "./components/HeroRelationshipAtlas/index.vue";

import { KScrollTip } from "@/components/business";
import { HeroDetailStore } from "@/store";

const { setScrollFn, hero_info } = HeroDetailStore();

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
    <template v-if="show">
      <HeroRelationshipAtlas v-if="hero_info.relationCount > 0" />
      <div v-else class="empty">暂无关系网</div>
    </template>

    <!-- 可滚动提示 -->
    <KScrollTip />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
