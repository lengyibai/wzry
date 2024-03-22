<script setup lang="ts">
import { ref, computed } from "vue";

import { ObtainInfo } from "../K-Obtain/interface";

import { AudioStore, KnapsackStore } from "@/store";
import { vMouseTip } from "@/directives";
import { KButton, KDialog, KRange } from "@/components/business";
import { GamePropValue, TreasureChance } from "@/config/interface";
import { GAME_HERO } from "@/api";
import { $msgTipText, GAME_CHANCE, GAME_PROP } from "@/config";
import { useSetMarker } from "@/hooks";
import { $message, $obtain } from "@/utils/busTransfer";
import { $bus } from "@/utils/eventBus";
import { _shuffleArray, _random } from "@/utils/tool";

const $audioStore = AudioStore();
const $knapsackStore = KnapsackStore();

const $useSetMarker = useSetMarker();

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

/** 是否显示 */
const show = ref(false);
/** 购买数量 */
const count = ref(1);
/** 接收的配置 */
const prop_config = ref<GamePropValue>();

/** 道具数量 */
const prop_num = computed(() => {
  return prop_config.value && $knapsackStore.articles[prop_config.value.key];
});

$bus.on("batch-prop", (v) => {
  show.value = true;
  prop_config.value = v;
  $audioStore.play("e6b4");
});

/* 领取 */
const handleReceive = async () => {
  /** 当前道具键名 */
  const prop_key = prop_config.value!.key;
  /** 用于存储格式化后的奖品数据 */
  const obtain: ObtainInfo[] = [];
  /** 随机皮肤秘宝系列 */
  const random_keys: Game.PropKey[] = [
    "SKIN_BRAVE_TREASURE",
    "SKIN_EPIC_TREASURE",
    "SKIN_LEGEND_TREASURE",
    "SKIN_LIMIT_TREASURE",
  ];
  /** 可用的自选宝箱列表 */
  let filter_list: (Game.Hero.Data | Game.Hero.Skin)[] = [];
  /** 当前概率 */
  let chance: Partial<
    Record<
      Game.PropKey,
      {
        count: number;
        num: number;
        key: Game.PropKey;
      }
    >
  > = {};

  //随机英雄秘宝
  if (prop_key === "HERO_TREASURE") {
    const hero_list = await GAME_HERO.getHeroDataList();
    filter_list = hero_list.filter((item) => {
      return !$knapsackStore.skin_list.includes(item.id);
    });

    chance = GAME_CHANCE.HERO_TREASURE_CHANCE;
  }

  //随机皮肤秘宝系列
  if (random_keys.includes(prop_key)) {
    const skin_list = await GAME_HERO.getSkinList();
    filter_list = skin_list.filter((item) => {
      return item.type === skin_type_tree[prop_key] && !$knapsackStore.skin_list.includes(item.id);
    });

    chance = skin_chance_list[prop_key];
  }

  //检查库存
  if (filter_list.length < count.value) {
    $message($msgTipText("vf38", { v: filter_list.length }), "error");
    return;
  }

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
  for (const key in rewards) {
    const k = key as Game.PropKey;
    const prop = GAME_PROP[k];
    obtain.push({
      icon: prop.icon,
      name: prop.label,
      num: rewards[k],
    });

    $knapsackStore.setGamePropNum(k, rewards[k]!, "ADD");
    $useSetMarker.add(k, rewards[k]!, "CHEST");
  }

  $knapsackStore.setGamePropNum(prop_key, count.value, "SUB");
  $obtain(obtain);
  show.value = false;
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
      :audio="false"
      up
      title="道具使用"
      @close="count = 1"
    >
      <div class="k-batch-prop">
        <div v-if="prop_config" class="prop-data">
          <div class="prop-info">
            <div class="icon-box">
              <img :src="prop_config.icon" alt="" class="icon" />
              <div class="count" :data-text="prop_num">{{ prop_num }}</div>
            </div>

            <div class="base">
              <div class="name">{{ prop_config.label }}</div>
              <div class="price">
                <div class="text">拥有</div>
                <div class="num">{{ prop_num }}</div>
              </div>
            </div>
          </div>
          <div class="prop-desc">{{ prop_config.desc }}</div>
        </div>
        <div class="range">
          <div class="desc">
            <span class="text">使用数量 </span>
            <div class="num">
              <span class="use">{{ count }}</span>
              <span class="total">/{{ prop_num }}</span>
            </div>
          </div>
          <KRange
            v-model="count"
            :min="1"
            :max="$knapsackStore.articles[prop_config!.key]"
            :show-num="false"
          />
        </div>
        <KButton v-mouse-tip class="k-button" type="warning" @click="handleReceive"> 确定 </KButton>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
SKIN_BRAVE_TREASURE_CHANCE, SKIN_EPIC_TREASURE_CHANCE,
SKIN_LEGEND_TREASURE_CHANCE,SKIN_BRAVE_TREASURE_CHANCE, SKIN_EPIC_TREASURE_CHANCE,
SKIN_LEGEND_TREASURE_CHANCE,
