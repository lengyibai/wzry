<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import _debounce from "lodash/debounce";
import dayjs from "dayjs";

import { $confirmText, GAME_PROP, MESSAGE_TIP, ROUTE_PATH } from "@/config";
import { GamePropValue } from "@/config/interface";
import { AudioStore, AuthStore, KnapsackStore, MailStore } from "@/store";
import { KButton, KEmpty } from "@/components/business";
import { vAnimateNumber } from "@/directives";
import { $optional, $upgrade, $batchProp, $confirm, $message } from "@/utils/busTransfer";
import { _classNameInclude, _getNewDayTimestamp } from "@/utils/tool";
import { LOTTERY_STONE_WEEK_CARD_GRANT } from "@/config/modules/game-config";
import { OptionalMode } from "@/components/business/Global/Control/components/K-Optional/interface";
import { _getImgLink } from "@/utils/concise";

const $router = useRouter();

const $knapsack = KnapsackStore();
const $audioStore = AudioStore();
const $authStore = AuthStore();
const $mailStore = MailStore();

const shineRoundRef = ref<HTMLElement>();
const articleRef = ref<HTMLElement[]>();

let doms: HTMLElement[] = [];

/** 当前选中的道具信息 */
const article_info = ref<GamePropValue>(GAME_PROP[$knapsack.knapsack[0]?.[0]]);
/** 用于切换动画 */
const _article_info = ref<GamePropValue>(GAME_PROP[$knapsack.knapsack[0]?.[0]]);
/** 当前选中的道具索引 */
const article_index = ref(0);
/** 当前选中的道具数量 */
const article_num = computed(() => $knapsack.knapsack[article_index.value]?.[1]);
/** 光圈位置 */
const shine_position = ref({
  left: 0,
  top: 0,
});

/** 背包是否为空 */
const is_empty = computed(() => $knapsack.knapsack.length === 0);

watch(article_num, () => {
  if ($knapsack.articles[article_info.value.key] === 0) {
    handleSelect($knapsack.knapsack[0][0], 0);
  }
});

/* 选择的道具 */
const handleSelect = (v: Game.PropKey, index: number) => {
  article_info.value = GAME_PROP[v];
  article_index.value = index;

  shineRoundAdapter();
  shineRoundRef.value!.style.transform = "scale(0.75)";
  shineRoundRef.value!.style.opacity = "0.5";
  setTimeout(() => {
    shineRoundRef.value!.style.transform = `scale(1)`;
    shineRoundRef.value!.style.opacity = "1";
  }, 250);

  nextTick(() => {
    _article_info.value = GAME_PROP[v];
  });
};

/* 使用道具 */
const handleUseProp = (v: GamePropValue) => {
  //路由跳转
  const key_path: Partial<Record<Game.PropKey, string>> = {
    /** 英雄碎片 */
    HERO_DEBRIS: ROUTE_PATH.HERO_DEBRIS,
    /** 皮肤碎片 */
    SKIN_DEBRIS: ROUTE_PATH.SKIN_DEBRIS,
    /** 王者水晶 */
    KING_CRYSTAL: ROUTE_PATH.KING_CRYSTAL,
    /** 荣耀水晶 */
    HONOR_CRYSTAL: ROUTE_PATH.HONOR_CRYSTAL,
    /** 英雄夺宝抵扣石 */
    HERO_LOTTERY_STONE: ROUTE_PATH.HERO_LOTTERY,
    /** 皮肤夺宝抵扣石 */
    SKIN_LOTTERY_STONE: ROUTE_PATH.SKIN_LOTTERY,
    /** 英雄夺宝币 */
    HERO_LOTTERY_COIN: ROUTE_PATH.HERO_LOTTERY,
    /** 皮肤夺宝币 */
    SKIN_LOTTERY_COIN: ROUTE_PATH.SKIN_LOTTERY,
  };
  if (Object.keys(key_path).includes(v.key)) {
    $router.push(key_path[v.key]!);
  }

  //自选弹窗
  const key_optional: Partial<Record<Game.PropKey, OptionalMode>> = {
    /** 自选英雄宝箱 */
    HERO_CHEST_OPTIONAL: "HERO",
    /** 自选伴生皮肤 */
    SKIN_CARD_INITIAL: "INITIAL",
    /** 自选勇者皮肤 */
    SKIN_CHEST_BRAVE_OPTIONAL: "BRAVE",
    /** 自选史诗皮肤 */
    SKIN_CHEST_EPIC_OPTIONAL: "EPIC",
    /** 自选传说皮肤 */
    SKIN_CHEST_LEGEND_OPTIONAL: "LEGEND",
    /** 自选限定皮肤 */
    SKIN_CHEST_LIMIT_OPTIONAL: "LIMIT",
  };
  if (Object.keys(key_optional).includes(v.key)) {
    $optional(key_optional[v.key]!);
  }

  //英雄经验宝箱
  const exp_chest_keys: Game.PropKey[] = ["HERO_EXP_ONE", "HERO_EXP_TWO"];
  if (exp_chest_keys.includes(v.key)) {
    $upgrade(v.key as "HERO_EXP_ONE" | "HERO_EXP_TWO");
  }

  //随机系列
  const random_keys: Game.PropKey[] = [
    "HERO_TREASURE",
    "SKIN_BRAVE_TREASURE",
    "SKIN_EPIC_TREASURE",
    "SKIN_LEGEND_TREASURE",
    "SKIN_LIMIT_TREASURE",
  ];
  if (random_keys.includes(v.key)) {
    $batchProp(GAME_PROP[v.key]);
  }

  //抵扣石周卡
  const stone_week_card_keys: Game.PropKey[] = ["HERO_LOTTERY_WEEK", "SKIN_LOTTERY_WEEK"];
  if (stone_week_card_keys.includes(v.key)) {
    /** 七天 */
    const seven_day = 1000 * 60 * 60 * 24 * 7;
    /** 基础类型 */
    const type = v.key === "HERO_LOTTERY_WEEK" ? "HERO" : "SKIN";
    /** 道具名称 */
    const name = type === "HERO" ? "英雄夺宝抵扣石周卡" : "皮肤夺宝抵扣石周卡";
    /** 发放抵扣石键名 */
    const stone_key = type === "HERO" ? "HERO_LOTTERY_STONE" : "SKIN_LOTTERY_STONE";
    /** 发放夺宝币键名 */
    const coin_key = type === "HERO" ? "HERO_LOTTERY_COIN" : "SKIN_LOTTERY_COIN";
    /** 开卡时间的键名 */
    const time_key =
      type === "HERO" ? "heroLotteryStoneWeekCardExpireTime" : "skinLotteryStoneWeekCardExpireTime";
    /** 开卡推送邮箱标题 */
    const title = type === "HERO" ? "英雄夺宝抵扣石周卡发放" : "皮肤夺宝抵扣石周卡发放";

    //如果已经有抵扣石周卡正在生效，则提示是否延续
    if ($authStore.user_data[time_key] !== 0) {
      $confirm({
        text: $confirmText("jt83", { v: name }),
        confirm() {
          const timestamp = $authStore.user_data[time_key];

          //延续时间
          $authStore.updateUserData({
            [time_key]: _getNewDayTimestamp(timestamp + seven_day),
          });

          //扣除音效
          $knapsack.setGamePropNum(v.key, 1, "SUB");
          $audioStore.play("wm14");
        },
      });
      return;
    }

    //开卡确认
    $confirm({
      text: $confirmText("m2x2", { v: name }),
      confirm() {
        //设置到期时间
        $authStore.updateUserData({
          [time_key]: _getNewDayTimestamp(dayjs().valueOf() + seven_day),
        });

        //扣除音效及立即发放
        $knapsack.setGamePropNum(v.key, 1, "SUB");
        $audioStore.play("wm14");
        $message(MESSAGE_TIP.fo08);
        $mailStore.sendGiftMail({
          title: title,
          desc: "别忘了明天0点之前也来领取哦！",
          props: [
            {
              key: stone_key,
              num: LOTTERY_STONE_WEEK_CARD_GRANT[type].STONE,
            },
            {
              key: coin_key,
              num: LOTTERY_STONE_WEEK_CARD_GRANT[type].COIN,
            },
          ],
        });
      },
    });
  }

  //双倍卡
  const double_card_keys: Game.PropKey[] = ["DOUBLE_GOLD", "DOUBLE_EXP"];
  if (double_card_keys.includes(v.key)) {
    /** 一天 */
    const one_day = 1000 * 60 * 60 * 24;
    /** 基础类型 */
    const type = v.key === "DOUBLE_GOLD" ? "GOLD" : "EXP";
    /** 道具名称 */
    const name = type === "GOLD" ? "双倍金币卡" : "双倍经验卡";
    /** 开卡时间的键名 */
    const time_key = type === "GOLD" ? "doubleGoldCardExpireTime" : "doubleExpCardExpireTime";

    //如果已经有双倍卡正在生效，则提示是否延续
    if ($authStore.user_data[time_key] !== 0) {
      $confirm({
        text: $confirmText("jt83", { v: name }),
        confirm() {
          const timestamp = $authStore.user_data[time_key];

          //延续时间
          $authStore.updateUserData({
            [time_key]: timestamp + one_day,
          });

          //扣除音效
          $knapsack.setGamePropNum(v.key, 1, "SUB");
          $audioStore.play("wm14");
          $message(MESSAGE_TIP.fo08);
        },
      });
      return;
    }

    //开卡确认
    $confirm({
      text: $confirmText("m2x2", { v: name }),
      confirm() {
        //设置到期时间
        $authStore.updateUserData({
          [time_key]: dayjs().valueOf() + one_day,
        });

        //扣除音效及立即发放
        $knapsack.setGamePropNum(v.key, 1, "SUB");
        $audioStore.play("wm14");
      },
    });
  }
};

/* 光圈适配 */
const shineRoundAdapter = () => {
  nextTick(() => {
    const v = article_index.value;

    if (v === -1) {
      shineRoundRef.value!.style.opacity = "0";
      return;
    }

    const el = doms[v];
    const find = _classNameInclude(el, "article")!;

    shineRoundRef.value!.style.opacity = "1";

    shine_position.value = {
      left: find.offsetLeft,
      top: find.offsetTop,
    };
  });
};

const debounceShineRoundAdapter = _debounce(shineRoundAdapter, 500);
window.addEventListener("resize", debounceShineRoundAdapter);

onMounted(() => {
  $audioStore.play("fz02");
  doms = articleRef.value!;
  debounceShineRoundAdapter();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", debounceShineRoundAdapter);
});
</script>

<template>
  <div class="knapsack">
    <div v-if="!is_empty" class="article-list" @scroll="debounceShineRoundAdapter">
      <div
        ref="shineRoundRef"
        class="shine-round"
        :style="{
          left: shine_position.left + 'px',
          top: shine_position.top + 'px',
        }"
      ></div>
      <div
        v-for="(item, index) in $knapsack.knapsack"
        :key="index"
        ref="articleRef"
        class="article"
        :class="{
          active: article_info.label === GAME_PROP[item[0]].label,
        }"
        @click="handleSelect(item[0], index)"
      >
        <img :src="_getImgLink(GAME_PROP[item[0]].iconName)" alt="" />
        <div class="num">{{ item[1] }}</div>
      </div>
    </div>

    <div v-if="article_info" class="article-detail">
      <transition name="fade">
        <div
          v-show="_article_info.key === article_info.key"
          class="icon"
          :style="{
            backgroundImage: `url(${_getImgLink(_article_info.iconName)})`,
          }"
        ></div>
      </transition>
      <div class="name">{{ article_info?.label }}</div>
      <div class="have">
        <div class="text">拥有</div>
        <div
          v-animate-number="{
            num: article_num,
            once: false,
          }"
          class="num"
        ></div>
      </div>

      <div class="desc">{{ article_info?.desc }}</div>

      <KButton type="warning" class="k-button" @click="handleUseProp(article_info)">使用</KButton>
    </div>

    <KEmpty v-if="is_empty" tip="背包居然是空的！" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
