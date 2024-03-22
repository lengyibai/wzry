<script setup lang="ts">
import { storeToRefs } from "pinia";

import { KnapsackStore } from "@/store";
import { vAnimateNumber } from "@/directives";
import { _getImgLink } from "@/utils/concise";
import { _formatKilobitNumber } from "@/utils/tool";

const $knapsackStore = KnapsackStore();

const { articles } = storeToRefs($knapsackStore);
</script>

<template>
  <div class="prop-num">
    <div class="prop-item">
      <img class="icon" :src="_getImgLink('gold')" alt="" />
      <div
        v-if="articles.GOLD < 1000"
        v-animate-number="{
          num: articles.GOLD,
          duration: 2000,
          once: false,
        }"
        class="num"
      ></div>
      <div v-else class="num">{{ _formatKilobitNumber(articles.GOLD) }}</div>
    </div>
    <div class="prop-item">
      <img class="icon" :src="_getImgLink('diamond')" alt="" />
      <div
        v-if="articles.DIAMOND < 1000"
        v-animate-number="{
          num: articles.DIAMOND,
          duration: 2000,
          once: false,
        }"
        class="num"
      ></div>
      <div v-else class="num">{{ _formatKilobitNumber(articles.DIAMOND) }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
