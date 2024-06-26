<script setup lang="ts">
import { ref, computed } from "vue";

import type { ObtainInfo } from "../K-Obtain/interface";

import { useBatchProp } from "./hooks/useBatchProp";
import type { ChanceInfo } from "./interface";

import { _getPropLink } from "@/utils/concise";
import { _shuffleArray, _random } from "@/utils/tool";
import { $message, $obtain } from "@/utils/busTransfer";
import { $msgTipText, GAME_CHANCE, GAME_PROP } from "@/config";
import { GAME_HERO, LOCAL_HERO } from "@/api";
import { KButton, KDialog, KRange } from "@/components/business";
import { KnapsackStore } from "@/store";
import { vDebounceClick, vMouseTip } from "@/directives";
import type { TreasureChance } from "@/config/interface";

const $knapsackStore = KnapsackStore();

const { show, prop_key } = useBatchProp();

/** 皮肤类型对应表 */
const skin_type_tree: Partial<Record<Game.PropKey, number>> = {
  SKIN_BRAVE_TREASURE: 1,
  SKIN_EPIC_TREASURE: 12,
  SKIN_LEGEND_TREASURE: 15,
  SKIN_LIMIT_TREASURE: 5,
};
/** 皮肤秘宝概率列表 */
const skin_chance_list: Record<string, TreasureChance> = {
  HERO_TREASURE: GAME_CHANCE.HERO_TREASURE_CHANCE,
  SKIN_BRAVE_TREASURE: GAME_CHANCE.SKIN_BRAVE_TREASURE_CHANCE,
  SKIN_EPIC_TREASURE: GAME_CHANCE.SKIN_EPIC_TREASURE_CHANCE,
  SKIN_LEGEND_TREASURE: GAME_CHANCE.SKIN_LEGEND_TREASURE_CHANCE,
  SKIN_LIMIT_TREASURE: GAME_CHANCE.SKIN_LIMIT_TREASURE_CHANCE,
};

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 使用数量 */
const count = ref(1);

/** 道具数量 */
const prop_num = computed(() => {
  if (prop_key.value === "HERO_CHEST_RANDOM") return 1;
  return $knapsackStore.articles[prop_key.value];
});

/** @description 领取 */
const handleReceive = async () => {
  if (count.value < 1) return;

  /** 用于存储格式化后的奖品数据 */
  const obtain: ObtainInfo[] = [];
  /** 随机皮肤秘宝系列 */
  const random_keys: Game.PropKey[] = [
    "SKIN_BRAVE_TREASURE",
    "SKIN_EPIC_TREASURE",
    "SKIN_LEGEND_TREASURE",
    "SKIN_LIMIT_TREASURE",
  ];
  /** 通过总英雄/皮肤数量减去已拥有英雄/皮肤数量，获得可抽的英雄/皮肤次数 */
  let filter_list: (Game.Hero.Data | Game.Hero.Skin)[] = [];
  /** 当前概率 */
  let chance: ChanceInfo = {};

  //每日福袋随机奖励
  if (prop_key.value === "BLESSING_BAG") {
    chance = GAME_CHANCE.BLESSING_BAG_CHANCE;
  }

  //英雄秘宝
  if (prop_key.value === "HERO_TREASURE") {
    chance = GAME_CHANCE.HERO_TREASURE_CHANCE;
  }

  //随机皮肤秘宝系列
  if (random_keys.includes(prop_key.value)) {
    const skin_list = await GAME_HERO.getSkinList();
    filter_list = skin_list.filter((item) => {
      return (
        item.type === skin_type_tree[prop_key.value] && !$knapsackStore.skin_list.includes(item.id)
      );
    });

    chance = skin_chance_list[prop_key.value];
  }

  //检查库存，排除无库存限制的道具
  if (
    filter_list.length < count.value &&
    !["BLESSING_BAG", "HERO_TREASURE", "HERO_CHEST_RANDOM"].includes(prop_key.value)
  ) {
    $message($msgTipText("vf38", { v: filter_list.length }), "error");
    return;
  }

  //英雄随机宝箱单独判断
  if (prop_key.value === "HERO_CHEST_RANDOM") {
    const hero_list = await LOCAL_HERO.getHeroList();
    const filter_list = hero_list.filter((item) => !$knapsackStore.hero_list[item]);

    //库存判断
    if (filter_list.length === 0) {
      $message($msgTipText("wa83", { v: "英雄库存" }), "error");
      return;
    }

    //随机获取英雄
    const random_index = _random(0, filter_list.length - 1);
    GAME_HERO.getHeroDetail(filter_list[random_index]).then((hero) => {
      $obtain({
        icon: hero.avatar,
        name: hero.name,
      });

      $knapsackStore.addHero(hero.id);
    });
  } else {
    //记录得到的奖品
    const receive_list: TreasureChance[keyof TreasureChance][] = [];
    for (let index = 0; index < count.value; index++) {
      //布置奖池
      const award_chance: TreasureChance[keyof TreasureChance][] = [];
      for (const k in chance) {
        const v = chance[k as Game.PropKey]!;
        for (let i = 0; i < v.count; i++) {
          award_chance.push(v);
        }
      }

      //打乱奖池
      const v = _shuffleArray(award_chance);
      const random_index = _random(0, award_chance.length - 1);
      receive_list.push(v.splice(random_index, 1)[0]);
    }

    //合并奖品数量
    const rewards: Partial<Record<Game.PropKey, number>> = {};
    receive_list.forEach((item) => {
      if (item) {
        rewards[item.key] ??= 0;
        rewards[item.key]! += item.num;
      }
    });

    //格式化奖品数据
    for (const k in rewards) {
      const key = k as Game.PropKey;

      obtain.push({
        name: GAME_PROP.NAME[key],
        key,
        num: rewards[key],
        icon: _getPropLink(GAME_PROP.ICON[key]),
      });
    }

    $obtain(obtain);
  }

  $knapsackStore.setGamePropNum(prop_key.value, count.value, "SUB");
  dialogRef.value?._close();
  count.value = 1;
};
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      width="52rem"
      :ratio="0.6"
      z-index="var(--z-index-close-dialog)"
      up
      title="道具使用"
      @close="count = 1"
    >
      <div class="k-batch-prop">
        <div v-if="prop_key" class="prop-data">
          <div class="prop-info">
            <div class="icon-box">
              <img :src="_getPropLink(GAME_PROP.ICON[prop_key])" alt="" class="icon" />
              <div class="count" :data-text="prop_num">{{ prop_num }}</div>
            </div>

            <div class="base">
              <div class="name">{{ GAME_PROP.NAME[prop_key] }}</div>
              <div class="price">
                <div class="text">拥有</div>
                <div class="num">{{ prop_num }}</div>
              </div>
            </div>
          </div>
          <div class="prop-desc">{{ GAME_PROP.DESC[prop_key] }}</div>
        </div>
        <div class="range">
          <div class="desc">
            <span class="text">使用数量 </span>
            <div class="num">
              <span class="use">{{ count }}</span>
              <span class="total">/{{ prop_num }}</span>
            </div>
          </div>
          <KRange v-model="count" :max="prop_num" :show-num="false" />
        </div>
        <KButton
          v-mouse-tip="{
            disabled: count < 1,
          }"
          v-debounce-click="handleReceive"
          :disabled="count < 1"
          class="k-button"
          type="warning"
        >
          确定
        </KButton>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
