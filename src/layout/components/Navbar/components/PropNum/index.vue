<script setup lang="ts">
import { storeToRefs } from "pinia";

import { KnapsackStore } from "@/store";
import { _getPropLink } from "@/utils/concise";
import { KLongNum } from "@/components/business";

const $knapsackStore = KnapsackStore();

const { articles } = storeToRefs($knapsackStore);
</script>

<template>
  <div class="prop-num">
    <div class="prop-item">
      <img class="icon" :src="_getPropLink('gold')" alt="" />
      <KLongNum class="k-long-num" :value="articles.GOLD" />
    </div>
    <div class="prop-item">
      <img class="icon" :src="_getPropLink('diamond')" alt="" />
      <KLongNum class="k-long-num" :value="articles.DIAMOND" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
