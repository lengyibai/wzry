<script setup lang="ts">
import { storeToRefs } from "pinia";

import { KnapsackStore } from "@/store";
import { _getPropLink } from "@/utils/concise";
import { KLongNum } from "@/components/business";
import { GAME_PROP } from "@/config";
import { vMouseTip } from "@/directives";

const $knapsackStore = KnapsackStore();
const { articles } = storeToRefs($knapsackStore);
</script>

<template>
  <div class="nav-bar">
    <div class="title" data-text="我的乂宝">我的乂宝</div>
    <div class="coins">
      <div
        v-mouse-tip="{
          type: 'TIP',
          text: GAME_PROP.DESC.JUMP_COIN,
        }"
        class="jump"
      >
        <img class="icon" :src="_getPropLink('jump_coin')" alt="" />
        <KLongNum font-size="1.5rem" :value="articles.JUMP_COIN" />
      </div>
      <div
        v-mouse-tip="{
          type: 'TIP',
          text: GAME_PROP.DESC.GUESS_COIN,
        }"
        class="guess"
      >
        <img class="icon" :src="_getPropLink('guess_coin')" alt="" />
        <KLongNum font-size="1.5rem" :value="articles.GUESS_COIN" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
