import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

import { useLotteryChance } from "./useLotteryChance";

import { KnapsackStore } from "@/store/modules/knapsack";
import { CONFIRM_TIP, GAME_PROP, MESSAGE_TIP } from "@/config";
import { $confirm, $message, $obtain } from "@/utils/busTransfer";
import { LotteryStore } from "@/store/modules/lottery";
import type { ObtainInfo } from "@/components/business/Global/Control/components/K-Obtain/interface";
import { AuthStore, SupplyStore } from "@/store";
import { LOTTERY_AWARD } from "@/config/modules/game-config";
import { _getPropLink } from "@/utils/concise";

/** @description 夺宝相关*/
const useLotteryPlay = (type: "HERO" | "SKIN") => {
  const $knapsackStore = KnapsackStore();
  const $lotteryStore = LotteryStore();
  const $supplyStore = SupplyStore();
  const $authStore = AuthStore();

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
  const crystal_name = type === "HERO" ? "KING_CRYSTAL" : "HONOR_CRYSTAL";
  /** 当前夺宝石字段 */
  const lottery_stone = type === "HERO" ? "HERO_LOTTERY_STONE" : "SKIN_LOTTERY_STONE";
  /** 当前夺宝币字段 */
  const lottery_coin = type === "HERO" ? "HERO_LOTTERY_COIN" : "SKIN_LOTTERY_COIN";

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
      const v = $knapsackStore.articles;
      const LOTTERY_COIN = type === "HERO" ? v.HERO_LOTTERY_COIN : v.SKIN_LOTTERY_COIN;
      return LOTTERY_COIN >= 1;
    }),
    /** @description 拥有免费五次数 */
    have_multiple_free: computed(() => {
      const v = $knapsackStore.articles;
      const LOTTERY_COIN = type === "HERO" ? v.HERO_LOTTERY_COIN : v.SKIN_LOTTERY_COIN;
      return LOTTERY_COIN >= 5;
    }),
    /** @description 拥有单个夺宝石 */
    have_alone_discount: computed(() => {
      const v = $knapsackStore.articles;
      const LOTTERY_STONE = type === "HERO" ? v.HERO_LOTTERY_STONE : v.SKIN_LOTTERY_STONE;
      return LOTTERY_STONE > 0;
    }),
    /** @description 拥有五个以上的夺宝石 */
    have_multiple_discount: computed(() => {
      const v = $knapsackStore.articles;
      const LOTTERY_STONE = type === "HERO" ? v.HERO_LOTTERY_STONE : v.SKIN_LOTTERY_STONE;
      return LOTTERY_STONE >= 5;
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

      //如果夺宝币和夺宝石都用完了
      if (!have_alone_free.value && !have_alone_discount.value) {
        //通过判断补给站状态来决定确定事件
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

    /** @description 检查是否有五次夺宝次数
     * @param type 抽奖模式类型
     * @param play 旋转回调
     */
    checkMultipleNotCount(type: "FREE" | "DEDUCTION", play: () => void) {
      if (is_playing) return true;
      getLotteryIndex();

      //如果和夺宝石不满5个
      if (!have_multiple_discount.value && type === "DEDUCTION") {
        $confirm({
          text: CONFIRM_TIP.qv90,
          confirm() {
            setTimeout(() => {
              play();
            }, 1250);
          },
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
            }, 1250);
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

      //优先扣除夺宝币
      if ($knapsackStore.articles[lottery_coin] > 0) {
        $knapsackStore.setGamePropNum(lottery_coin, 1, "SUB");
      } else {
        $knapsackStore.setGamePropNum(lottery_stone, 1, "SUB");
      }

      let num = awards[gift_index.value].num;
      const prop_key = awards[gift_index.value].type;

      //如果抽到了水晶，则重置状态
      if (prop_key === crystal_name) {
        resetLuck();
      }

      //如果使用了双倍金币卡，则再加一次
      if (prop_key === "GOLD" && double_gold.value) {
        num! *= 2;
      }

      //如果使用了双倍经验卡，则再加一次
      if (["HERO_EXP_ONE", "HERO_EXP_TWO"].includes(prop_key) && double_exp.value) {
        num! *= 2;
      }

      //弹出奖励
      $obtain({
        name: GAME_PROP.NAME[prop_key],
        num,
        icon: _getPropLink(GAME_PROP.ICON[prop_key]),
      });

      saveGameData();
    },

    /** @description 五次旋转结算奖励 */
    calcMultipleReward(awards_index: number[]) {
      is_playing = false;

      //优先扣除夺宝币
      if ($knapsackStore.articles[lottery_coin] > 0) {
        $knapsackStore.setGamePropNum(lottery_coin, 5, "SUB");
      } else {
        $knapsackStore.setGamePropNum(lottery_stone, 5, "SUB");
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
      for (const k in rewards) {
        const key = k as Game.PropKey;
        let num = rewards[key];

        //如果使用了双倍金币卡，则再加一次
        if (key === "GOLD" && double_gold.value) num! *= 2;

        //如果使用了双倍经验卡，则再加一次
        if (["HERO_EXP_ONE", "HERO_EXP_TWO"].includes(key) && double_exp.value) num! *= 2;

        obtain.push({
          num,
          name: GAME_PROP.NAME[key],
          key,
          icon: _getPropLink(GAME_PROP.ICON[key]),
        });
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
