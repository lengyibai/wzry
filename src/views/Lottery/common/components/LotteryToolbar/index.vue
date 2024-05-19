<script setup lang="ts">
import { storeToRefs } from "pinia";

import { KHelp } from "@/components/business";
import { $helpText, GAME_CHANCE, GAME_CONFIG, GAME_PROP } from "@/config";
import { vAnimateNumber, vMouseTip } from "@/directives";
import { KnapsackStore } from "@/store";
import { $help } from "@/utils/busTransfer";
import { _getPropLink } from "@/utils/concise";
import { LOTTERY_CRYSTAL_INTERVAL } from "@/config/modules/game-config";

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

/** 英雄概率格式化 */
const hero_chance_format = () => {
  let text = "";
  for (const key in GAME_CHANCE.HERO_LOTTERY_CHANCE) {
    const k = Number(key);
    const chance = GAME_CHANCE.HERO_LOTTERY_CHANCE[k];
    const award = GAME_CONFIG.LOTTERY_AWARD.HERO.find((item) => item.id === k);
    text += `[${chance}个${GAME_PROP.NAME[award!.type]}*${award!.num || 1}]、`;
  }

  return text.slice(0, -1);
};

/** 皮肤概率格式化 */
const skin_chance_format = () => {
  let text = "";
  for (const key in GAME_CHANCE.SKIN_LOTTERY_CHANCE) {
    const k = Number(key);
    const chance = GAME_CHANCE.SKIN_LOTTERY_CHANCE[k];
    const award = GAME_CONFIG.LOTTERY_AWARD.SKIN.find((item) => item.id === k);
    text += `[${chance}个${GAME_PROP.NAME[award!.type]}*${award!.num || 1}]、`;
  }

  return text.slice(0, -1);
};

/** @description 点击帮助 */
const handleHelp = () => {
  $help({
    title: `${$props.type === "HERO" ? "英雄" : "皮肤"}夺宝说明`,
    content:
      $props.type === "HERO"
        ? $helpText("dq76", {
            crystal: "王者",
            type: "英雄",
            luckValue1: LOTTERY_CRYSTAL_INTERVAL.hero[0],
            luckValue2: LOTTERY_CRYSTAL_INTERVAL.hero[1],
            chance: hero_chance_format(),
          })
        : $helpText("dq76", {
            crystal: "荣耀",
            type: "皮肤",
            luckValue1: LOTTERY_CRYSTAL_INTERVAL.skin[0],
            luckValue2: LOTTERY_CRYSTAL_INTERVAL.skin[1],
            chance: skin_chance_format(),
          }),
  });
};
</script>

<template>
  <div class="lottery-toolbar">
    <div class="title" :data-text="title + '夺宝'">{{ title }}夺宝</div>
    <KHelp v-mouse-tip margin-left="1rem" @click="handleHelp" />

    <div class="prop-num">
      <!-- 剩余夺宝币 -->
      <div class="coin">
        <img :src="_getPropLink(GAME_PROP.ICON[coin_key[type]])" alt="" class="icon" />
        <div
          v-animate-number="{
            num: articles[coin_key[type]],
            duration: 2000,
            once: false,
          }"
          class="num"
        ></div>
      </div>

      <!-- 剩余夺宝石 -->
      <div class="rock">
        <img :src="_getPropLink(GAME_PROP.ICON[stone_key[type]])" alt="" class="icon" />
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
