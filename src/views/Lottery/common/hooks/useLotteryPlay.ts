import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

import { KnapsackStore } from "@/store/modules/knapsack";
import { CONFIRM_TIP, GAME_PROP, MESSAGE_TIP } from "@/config";
import { $confirm, $message, $obtain } from "@/utils/busTransfer";
import { LotteryStore } from "@/store/modules/lottery";
import { useLotteryChance } from "@/hooks/modules/useLotteryChance";
import { useSetMarker } from "@/hooks/modules/useSetMarker";
import { ObtainInfo } from "@/components/business/Global/Control/components/K-Obtain/interface";
import { AuthStore, SupplyStore } from "@/store";
import { LOTTERY_AWARD } from "@/config/modules/game-config";

/** @description 夺宝相关*/
const useLotteryPlay = (type: "HERO" | "SKIN") => {
  const $knapsackStore = KnapsackStore();
  const $lotteryStore = LotteryStore();
  const $supplyStore = SupplyStore();
  const $authStore = AuthStore();

  const $useSetMarker = useSetMarker();

  const { articles } = storeToRefs($knapsackStore);
  const { hero_supply_status, skin_supply_status } = storeToRefs($supplyStore);
  const { resetHeroLuck, resetSkinLuck, saveGameData } = $lotteryStore;

  const { gift_index, getLotteryIndex } = useLotteryChance(type);

  /** 当前夺宝奖项 */
  const awards = LOTTERY_AWARD[type];
  /** 当前要调用的重置幸运值 */
  const resetLuck = type === "HERO" ? resetHeroLuck : resetSkinLuck;
  /** 当前补给状态 */
  const supply_status = type === "HERO" ? hero_supply_status : skin_supply_status;
  /** 当前水晶名称 */
  const CRYSTAL = type === "HERO" ? "KING_CRYSTAL" : "HONOR_CRYSTAL";
  /** 当前抵扣石字段 */
  const LOTTERY_STONE = type === "HERO" ? "HERO_LOTTERY_STONE" : "SKIN_LOTTERY_STONE";
  /** 当前夺宝币字段 */
  const LOTTERY_COIN = type === "HERO" ? "HERO_LOTTERY_COIN" : "SKIN_LOTTERY_COIN";

  /** 是否处于旋转状态 */
  let is_playing = false;

  const ExposeData = {
    /** 奖励索引 */
    gift_index,
    /** 上一次奖励位置 */
    last_reward_position: ref(0),
  };
  const { last_reward_position } = ExposeData;

  /** 是否使用了双倍金币卡 */
  const double_gold = computed(() => $authStore.user_data.doubleGoldCardExpireTime !== 0);
  /** 是否使用了双倍经验卡 */
  const double_exp = computed(() => $authStore.user_data.doubleExpCardExpireTime !== 0);

  const ExposeComputed = {
    /** @description 拥有免费单次数 */
    have_alone_free: computed(() => {
      const v = articles.value;
      const LOTTERY_COIN = type === "HERO" ? v.HERO_LOTTERY_COIN : v.SKIN_LOTTERY_COIN;
      return LOTTERY_COIN >= 1;
    }),
    /** @description 拥有免费五次数 */
    have_multiple_free: computed(() => {
      const v = articles.value;
      const LOTTERY_COIN = type === "HERO" ? v.HERO_LOTTERY_COIN : v.SKIN_LOTTERY_COIN;
      return LOTTERY_COIN >= 5;
    }),
    /** @description 拥有单个抵扣石 */
    have_alone_discount: computed(() => {
      const v = articles.value;
      const LOTTERY_STONE = type === "HERO" ? v.HERO_LOTTERY_STONE : v.SKIN_LOTTERY_STONE;
      return LOTTERY_STONE > 0;
    }),
    /** @description 拥有五个以上的抵扣石 */
    have_multiple_discount: computed(() => {
      const v = articles.value;
      const LOTTERY_STONE = type === "HERO" ? v.HERO_LOTTERY_STONE : v.SKIN_LOTTERY_STONE;
      return LOTTERY_STONE > 5;
    }),
  };
  const { have_alone_free, have_multiple_free, have_alone_discount, have_multiple_discount } =
    ExposeComputed;

  const ExposeMethods = {
    /** @description 获取夺宝奖励索引 */
    getLotteryIndex,

    /** @description 检查是否有单次夺宝次数 */
    checkAloneNotCount() {
      if (is_playing) return true;

      //如果夺宝币和抵扣石都用完了
      if (!have_alone_free.value && !have_alone_discount.value) {
        /* 通过判断补给站状态来决定确定事件 */
        $confirm({
          text: CONFIRM_TIP.yb85,
          confirm() {
            //如果补给站处于空闲，则自动选择第一个模式
            if (supply_status.value === "IDLE") {
              $supplyStore.setTimeMode(type, 0);
              $supplyStore.startCountdown(type);
              return;
            }

            if (supply_status.value === "RUNNING") {
              $message(MESSAGE_TIP.yz00, "warning");
            }
          },
        });
        return true;
      }

      is_playing = true;
      return false;
    },

    /** @description 检查是否有五次夺宝次数 */
    checkMultipleNotCount(type: "FREE" | "DEDUCTION", play: () => void) {
      if (is_playing) return true;
      getLotteryIndex();

      //如果和抵扣石不满5个
      if (!have_multiple_discount.value && type === "DEDUCTION") {
        $confirm({
          text: CONFIRM_TIP.qv90,
          confirm: play,
        });
        return true;
      }

      //如果夺宝币不满5个
      if (!have_multiple_free.value && type === "FREE") {
        $confirm({
          text: CONFIRM_TIP.wr91,
          confirm() {
            setTimeout(() => {
              play();
            }, 1000);
          },
        });
        return true;
      }

      is_playing = true;
      return false;
    },

    /** @description 设置上一次的位置 */
    setLastPosition(position: number) {
      last_reward_position.value = position;
    },

    /** @description 单次旋转结算奖励 */
    calcAloneReward() {
      is_playing = false;

      //优先扣除抵扣石
      if (articles.value[LOTTERY_STONE] > 0) {
        $knapsackStore.setGamePropNum(LOTTERY_STONE, 1, "SUB");
      } else {
        $knapsackStore.setGamePropNum(LOTTERY_COIN, 1, "SUB");
      }

      let prop_num = awards[gift_index.value].num;
      const prop_key = awards[gift_index.value].type;

      //如果抽到了水晶，则重置状态
      if (prop_key === CRYSTAL) {
        resetLuck();
      }

      //如果使用了双倍金币卡，则再加一次
      if (prop_key === "GOLD" && double_gold.value) {
        prop_num! *= 2;
      }

      //如果使用了双倍经验卡，则再加一次
      if (["HERO_EXP_ONE", "HERO_EXP_TWO"].includes(prop_key) && double_exp.value) {
        prop_num! *= 2;
      }

      //发放奖励
      $knapsackStore.setGamePropNum(prop_key, prop_num || 1, "ADD");
      $useSetMarker.add(prop_key, prop_num || 1, "LOTTERY");

      //弹出奖励
      const prop = GAME_PROP[prop_key];
      $obtain({
        name: prop.label,
        icon: prop.icon,
        num: prop_num,
      });

      saveGameData();
    },

    /** @description 五次旋转结算率奖励 */
    calcMultipleReward(awards_index: number[]) {
      is_playing = false;

      //优先扣除抵扣石
      if (articles.value[LOTTERY_STONE] > 0) {
        $knapsackStore.setGamePropNum(LOTTERY_STONE, 5, "SUB");
      } else {
        $knapsackStore.setGamePropNum(LOTTERY_COIN, 5, "SUB");
      }

      //合并奖品数量
      const rewards: Partial<Record<Game.PropKey, number>> = {};
      awards_index.forEach((item) => {
        const prop_key = awards[item].type;
        const prop_num = awards[item].num;
        rewards[prop_key] ??= 0;
        rewards[prop_key]! += prop_num || 1;
      });

      //格式化奖品数据
      const obtain: ObtainInfo[] = [];
      for (const key in rewards) {
        const k = key as Game.PropKey;
        const prop = GAME_PROP[k];
        let num = rewards[k];

        //如果使用了双倍金币卡，则再加一次
        if (key === "GOLD" && double_gold.value) num! *= 2;

        //如果使用了双倍经验卡，则再加一次
        if (["HERO_EXP_ONE", "HERO_EXP_TWO"].includes(key) && double_exp.value) num! *= 2;

        obtain.push({
          icon: prop.icon,
          name: prop.label,
          num,
        });

        $knapsackStore.setGamePropNum(k, num!, "ADD");
        $useSetMarker.add(k, num!, "CHEST");
      }

      $obtain(obtain);
      saveGameData();
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
};

export { useLotteryPlay };
