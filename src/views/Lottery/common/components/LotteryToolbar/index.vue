<script setup lang="ts">
import { storeToRefs } from "pinia";

import { KHelp } from "@/components/business";
import { GAME_PROP, HELP_TIP } from "@/config";
import { vAnimateNumber } from "@/directives";
import { KnapsackStore } from "@/store";
import { $help } from "@/utils/busTransfer";
import { _getImgLink } from "@/utils/concise";

interface Props {
  /** 工具栏是英雄夺宝还是皮肤夺宝 */
  type: "HERO" | "SKIN";
}
const $props = defineProps<Props>();

const $knapsackStore = KnapsackStore();
const { articles } = storeToRefs($knapsackStore);

/** 标题 */
const title = $props.type === "HERO" ? "英雄" : "皮肤";

/** 币种字段 */
const coin_key: Record<typeof $props.type, Game.PropKey> = {
  HERO: "HERO_LOTTERY_COIN",
  SKIN: "SKIN_LOTTERY_COIN",
};

/** 石种字段 */
const stone_key: Record<typeof $props.type, Game.PropKey> = {
  HERO: "HERO_LOTTERY_STONE",
  SKIN: "SKIN_LOTTERY_STONE",
};

/* 点击帮助 */
const handleHelp = () => {
  $help({
    title: `${$props.type === "HERO" ? "英雄" : "皮肤"}夺宝说明`,
    content: HELP_TIP.dq76,
  });
};
</script>

<template>
  <div class="lottery-toolbar">
    <div class="title" :data-text="title + '夺宝'">{{ title }}夺宝</div>
    <KHelp margin-left="1rem" @click="handleHelp" />

    <div class="prop-num">
      <!-- 剩余夺宝币 -->
      <div class="coin">
        <img :src="_getImgLink(GAME_PROP[coin_key[type]].iconName)" alt="" class="icon" />
        <div
          v-animate-number="{
            num: articles[coin_key[type]],
            duration: 2000,
            once: false,
          }"
          class="num"
        ></div>
      </div>

      <!-- 剩余抵扣石 -->
      <div class="rock">
        <img :src="_getImgLink(GAME_PROP[stone_key[type]].iconName)" alt="" class="icon" />
        <div
          v-animate-number="{
            num: articles[stone_key[type]],
            duration: 2000,
            once: false,
          }"
          class="num"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
