<script setup lang="ts">
import type { HeroUpgradeInfo } from "../../../../interface";

import { KHeroExp, KLoadingRadiate } from "@/components/business";

interface Props {
  data: HeroUpgradeInfo;
}

defineProps<Props>();
</script>

<template>
  <div class="hero-card">
    <div class="head-box">
      <KLoadingRadiate :link="data.avatar" width="6.25rem" height="6.25rem" />
      <div class="name" v-html="data.name"></div>
    </div>
    <KHeroExp :exp="data.exp" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
