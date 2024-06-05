<script setup lang="ts">
import { computed, nextTick, onActivated, onDeactivated, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { $confirmText, GAME_PROP, MESSAGE_TIP, ROUTE_PATH } from "@/config";
import { AuthStore, KnapsackStore, MailStore } from "@/store";
import { KButton, KEmpty } from "@/components/business";
import { vAnimateNumber, vMouseTip, vScrollVirtualization } from "@/directives";
import { $optional, $upgrade, $batchProp, $confirm, $message } from "@/utils/busTransfer";
import { _classNameInclude, _debounce, _getNewDayTimestamp, dayjs } from "@/utils/tool";
import { LOTTERY_STONE_WEEK_CARD_GRANT } from "@/config/modules/game-config";
import { OptionalMode } from "@/components/business/Global/Control/components/K-Optional/interface";
import { _getPropLink } from "@/utils/concise";
import { usePlayAudio, useRadialBorder } from "@/hooks";
import { useDialogSwitch } from "@/layout/components/Navbar/components/BtnIcon/hooks/useDialogSwitch";

defineOptions({
  name: "Knapsack",
});

const $router = useRouter();

const $knapsack = KnapsackStore();

const $authStore = AuthStore();
const $mailStore = MailStore();

const { knapsack } = storeToRefs($knapsack);

const { playAudio } = usePlayAudio();

const shineRoundRef = ref<HTMLElement>();
const articleRefs = ref<HTMLElement[]>();

/** 当前选中的道具信息 */
const article_key = ref<Game.PropKey>(knapsack.value[0]?.[0]);
/** 用于切换动画 */
const _article_key = ref<Game.PropKey>(knapsack.value[0]?.[0]);
/** 光圈位置 */
const shine_position = ref({
  left: 0,
  top: 0,
});

const { enableRadialBorder, disableRadialBorder } = useRadialBorder(articleRefs);

/** 当前选中的道具索引 */
const article_index = computed(() => {
  return knapsack.value.findIndex((item) => item[0] === article_key.value);
});
/** 当前选中的道具数量 */
const article_num = computed(() => knapsack.value[article_index.value]?.[1]);

/** 背包是否为空 */
const is_empty = computed(() => knapsack.value.length === 0);

/** @description 选择的道具
 * @param key 道具key
 * @param index 道具索引
 */
const handleSelect = (key: Game.PropKey) => {
  article_key.value = key;

  shineRoundAdapter();
  shineRoundRef.value!.style.transform = "scale(0.75)";
  shineRoundRef.value!.style.opacity = "0.5";
  setTimeout(() => {
    shineRoundRef.value!.style.transform = `scale(1)`;
    shineRoundRef.value!.style.opacity = "1";
  }, 250);

  nextTick(() => {
    _article_key.value = key;
    playAudio("n4r4");
  });
};

/** @description 使用道具
 * @param v 道具信息
 */
const handleUseProp = (key: Game.PropKey) => {
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
    /** 英雄夺宝石 */
    HERO_LOTTERY_STONE: ROUTE_PATH.HERO_LOTTERY,
    /** 皮肤夺宝石 */
    SKIN_LOTTERY_STONE: ROUTE_PATH.SKIN_LOTTERY,
    /** 英雄夺宝币 */
    HERO_LOTTERY_COIN: ROUTE_PATH.HERO_LOTTERY,
    /** 皮肤夺宝币 */
    SKIN_LOTTERY_COIN: ROUTE_PATH.SKIN_LOTTERY,
    /** 竞猜币 */
    GUESS_COIN: ROUTE_PATH.YI_BAO,
    /** 跳跳币 */
    JUMP_COIN: ROUTE_PATH.YI_BAO,
  };
  if (Object.keys(key_path).includes(key)) {
    $router.push(key_path[key]!);
    return;
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
  if (Object.keys(key_optional).includes(key)) {
    $optional(key_optional[key]!);
    return;
  }

  //英雄经验宝箱
  const exp_chest_keys: Game.PropKey[] = ["HERO_EXP_ONE", "HERO_EXP_TWO"];
  if (exp_chest_keys.includes(key)) {
    $upgrade(key as "HERO_EXP_ONE" | "HERO_EXP_TWO");
    return;
  }

  //宝箱系列
  const random_keys: Game.PropKey[] = [
    "BLESSING_BAG",
    "HERO_CHEST_RANDOM",
    "HERO_TREASURE",
    "SKIN_BRAVE_TREASURE",
    "SKIN_EPIC_TREASURE",
    "SKIN_LEGEND_TREASURE",
    "SKIN_LIMIT_TREASURE",
  ];
  if (random_keys.includes(key)) {
    $batchProp(key);
    return;
  }

  //夺宝石周卡
  const stone_week_card_keys: Game.PropKey[] = ["HERO_LOTTERY_WEEK", "SKIN_LOTTERY_WEEK"];
  if (stone_week_card_keys.includes(key)) {
    /** 七天 */
    const seven_day = 1000 * 60 * 60 * 24 * 7;
    /** 基础类型 */
    const type = key === "HERO_LOTTERY_WEEK" ? "HERO" : "SKIN";
    /** 道具名称 */
    const name = type === "HERO" ? "英雄夺宝石周卡" : "皮肤夺宝石周卡";
    /** 发放夺宝石键名 */
    const stone_key = type === "HERO" ? "HERO_LOTTERY_STONE" : "SKIN_LOTTERY_STONE";
    /** 发放夺宝币键名 */
    const coin_key = type === "HERO" ? "HERO_LOTTERY_COIN" : "SKIN_LOTTERY_COIN";
    /** 开卡时间的键名 */
    const time_key =
      type === "HERO" ? "heroLotteryStoneWeekCardExpireTime" : "skinLotteryStoneWeekCardExpireTime";
    /** 开卡推送邮箱标题 */
    const title = type === "HERO" ? "英雄夺宝石周卡奖励发放" : "皮肤夺宝石周卡奖励发放";

    //如果已经有夺宝石周卡正在生效，则提示是否延续
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
          $knapsack.setGamePropNum(key, 1, "SUB");
          playAudio("wm14");
          $message(MESSAGE_TIP.ep96);
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
        $knapsack.setGamePropNum(key, 1, "SUB");
        playAudio("wm14");
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
    return;
  }

  //双倍卡
  const double_card_keys: Game.PropKey[] = ["DOUBLE_GOLD", "DOUBLE_EXP"];
  if (double_card_keys.includes(key)) {
    /** 一天 */
    const one_day = 1000 * 60 * 60 * 24;
    /** 基础类型 */
    const type = key === "DOUBLE_GOLD" ? "GOLD" : "EXP";
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
          $knapsack.setGamePropNum(key, 1, "SUB");
          playAudio("wm14");
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
        $knapsack.setGamePropNum(key, 1, "SUB");
        playAudio("wm14");
      },
    });

    return;
  }

  //竞猜券
  if (key === "GUESS_CARD") {
    useDialogSwitch().setActivityShow(true);

    setTimeout(() => {
      $message(MESSAGE_TIP.yk98, "warning");
    }, 2000);
  }
};

/** @description 光圈适配 */
const shineRoundAdapter = () => {
  nextTick(() => {
    const v = article_index.value;

    if (v === -1 || !articleRefs.value?.length) {
      shineRoundRef.value && (shineRoundRef.value.style.opacity = "0");
      return;
    }

    const el = articleRefs.value[v];
    const find = _classNameInclude(el, "article")!;

    shineRoundRef.value!.style.opacity = "1";

    shine_position.value = {
      left: find.offsetLeft,
      top: find.offsetTop,
    };
  });
};

//防抖更新光圈位置
const debounceShineRoundAdapter = _debounce(shineRoundAdapter, 500);

//如果当前选择的道具数量为0，则选中第一个道具
watch(article_num, () => {
  if ($knapsack.articles[article_key.value] === 0) {
    handleSelect(knapsack.value[0][0]);
  }
});

//当道具列表新增道具时，更新光圈位置
watch(() => knapsack.value.length, debounceShineRoundAdapter);

onActivated(() => {
  window.addEventListener("resize", debounceShineRoundAdapter);
  debounceShineRoundAdapter();
  playAudio("fz02");
});

onDeactivated(() => {
  window.removeEventListener("resize", debounceShineRoundAdapter);
});
</script>

<template>
  <div class="knapsack" @mouseenter="enableRadialBorder" @mouseleave="disableRadialBorder">
    <transition name="to-right-opacity" appear>
      <div v-if="!is_empty" v-scroll-virtualization class="article-list">
        <div
          ref="shineRoundRef"
          class="shine-round"
          :style="{
            left: shine_position.left + 'px',
            top: shine_position.top + 'px',
          }"
        ></div>
        <div
          v-for="(item, index) in knapsack"
          :key="index"
          ref="articleRefs"
          v-mouse-tip="{
            text: GAME_PROP.NAME[item[0]],
          }"
          class="article"
          :class="{
            active: article_key === item[0],
          }"
          @click="handleSelect(item[0])"
        >
          <img :src="_getPropLink(GAME_PROP.ICON[item[0]])" alt="" />
          <div class="num" :data-text="item[1]">{{ item[1] }}</div>
        </div>
      </div>
    </transition>

    <!-- 装备详情 -->
    <transition name="to-top-opacity" appear>
      <div v-if="article_key" class="article-detail">
        <transition name="fade">
          <div
            v-show="_article_key === article_key"
            class="icon"
            :style="{
              backgroundImage: `url(${_getPropLink(GAME_PROP.ICON[_article_key])})`,
            }"
          ></div>
        </transition>
        <div class="name">{{ GAME_PROP.NAME[article_key] }}</div>
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

        <div class="desc">{{ GAME_PROP.DESC[article_key] }}</div>

        <KButton v-mouse-tip type="warning" class="k-button" @click="handleUseProp(article_key)">
          使用
        </KButton>
      </div>
    </transition>

    <KEmpty v-if="is_empty" tip="背包居然是空的！" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
