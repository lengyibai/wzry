import { ref } from "vue";

import { HERO_LOTTERY_CHANCE, SKIN_LOTTERY_CHANCE } from "@/config/modules/game-chance";
import { LotteryStore } from "@/store/modules/lottery";
import { LOTTERY_AWARD, LOTTERY_CRYSTAL_INTERVAL } from "@/config/modules/game-config";
import { _random, _shuffleArray } from "@/utils/tool";

/** @description 通过夺宝概率，获得夺宝索引
 * @param type 夺宝类型
 */
export function useLotteryChance(type: "HERO" | "SKIN") {
  const $lotteryStore = LotteryStore();

  /** 当前概率类型 */
  const chance = type === "HERO" ? HERO_LOTTERY_CHANCE : SKIN_LOTTERY_CHANCE;
  /** 幸运值类型 */
  const luck_key = type === "HERO" ? "hero_lucky" : "skin_lucky";
  /** 水晶索引区间 */
  const crystal_interval =
    type === "HERO" ? LOTTERY_CRYSTAL_INTERVAL.hero : LOTTERY_CRYSTAL_INTERVAL.skin;

  const ExposeData = {
    /** 夺宝奖励索引 */
    gift_index: ref(0),
    /** 水晶索引 */
    crystal_index: ref(_random(crystal_interval[0], crystal_interval[1])),
  };
  const { gift_index, crystal_index } = ExposeData;

  const ExposeMethods = {
    /** @description 获取夺宝奖励索引 */
    getLotteryIndex() {
      if ($lotteryStore[luck_key] === crystal_index.value) {
        gift_index.value = 0;
        crystal_index.value = _random(crystal_interval[0], crystal_interval[1]);
        return;
      }
      //布置奖池
      const award_jackpot: number[] = [];
      for (const [k, v] of Object.entries(chance)) {
        for (let i = 0; i < v; i++) {
          award_jackpot.push(Number(k));
        }
      }

      //打乱奖池并随机获取奖品ID
      const shuffle_jackpot = _shuffleArray(award_jackpot);
      const random_index = _random(0, award_jackpot.length - 1);
      const id = shuffle_jackpot[random_index];

      gift_index.value = LOTTERY_AWARD[type].findIndex((item) => item.id === id);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
}
