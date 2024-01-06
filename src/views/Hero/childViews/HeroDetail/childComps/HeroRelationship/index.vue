<script setup lang="ts">
import { ref } from "vue";

import HeroRelationDesc from "./components/HeroRelationDesc/index.vue";
import HeroRelationshipAtlas from "./components/HeroRelationshipAtlas/index.vue";

import { KScrollTip } from "@/components/business";

const relationshipRef = ref<InstanceType<typeof HeroRelationshipAtlas>>();
</script>

<template>
  <div class="hero-relationship">
    <!-- 关系信息 -->
    <HeroRelationDesc />

    <!-- 关系图谱 -->
    <HeroRelationshipAtlas ref="relationshipRef" />

    <!-- 可滚动提示 -->
    <KScrollTip ref="downRef" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
