<script setup lang="ts">
import { storeToRefs } from "pinia";

import { KnapsackStore } from "@/store";
import { _getPropLink } from "@/utils/concise";
import { KLongNum } from "@/components/business";

const $knapsackStore = KnapsackStore();
const { articles } = storeToRefs($knapsackStore);
</script>

<template>
  <div class="nav-bar">
    <div class="title" data-text="我的乂宝">我的乂宝</div>
    <div class="coins">
      <div class="jump">
        <img class="icon" :src="_getPropLink('jump_coin')" alt="" />
        <KLongNum class="k-long-num" :value="articles.JUMP_COIN" />
      </div>
      <div class="guess">
        <img class="icon" :src="_getPropLink('guess_coin')" alt="" />
        <KLongNum class="k-long-num" :value="articles.GUESS_COIN" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
