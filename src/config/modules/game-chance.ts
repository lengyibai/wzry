import type { TreasureChance } from "../interface";

/** @description 每日福袋概率 */
export const BLESSING_BAG_CHANCE: TreasureChance = {
  SKIN_CHEST_BRAVE_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_BRAVE_OPTIONAL",
  },
  HERO_DEBRIS: {
    count: 1,
    num: 5,
    key: "SKIN_EPIC_TREASURE",
  },
  SKIN_DEBRIS: {
    count: 1,
    num: 50,
    key: "SKIN_DEBRIS",
  },
};

/** @description 英雄秘宝概率 */
export const HERO_TREASURE_CHANCE: TreasureChance = {
  HERO_CHEST_OPTIONAL: {
    count: 1,
    num: 1,
    key: "HERO_CHEST_OPTIONAL",
  },
  GOLD: {
    count: 1,
    num: 100,
    key: "GOLD",
  },
  HERO_DEBRIS: {
    count: 2,
    num: 1,
    key: "HERO_DEBRIS",
  },
  HERO_EXP_ONE: {
    count: 2,
    num: 1,
    key: "HERO_EXP_ONE",
  },
  HERO_EXP_TWO: {
    count: 2,
    num: 1,
    key: "HERO_EXP_TWO",
  },
  HERO_LOTTERY_COIN: {
    count: 1,
    num: 1,
    key: "HERO_LOTTERY_COIN",
  },
  GUESS_CARD: {
    count: 1,
    num: 1,
    key: "GUESS_CARD",
  },
};

/** @description 勇者皮肤秘宝概率 */
export const SKIN_BRAVE_TREASURE_CHANCE: TreasureChance = {
  SKIN_CHEST_BRAVE_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_BRAVE_OPTIONAL",
  },
  DIAMOND1: {
    count: 2,
    num: 50,
    key: "DIAMOND",
  },
  DIAMOND2: {
    count: 2,
    num: 75,
    key: "DIAMOND",
  },
  SKIN_DEBRIS: {
    count: 2,
    num: 2,
    key: "SKIN_DEBRIS",
  },
  SKIN_LOTTERY_COIN: {
    count: 1,
    num: 2,
    key: "SKIN_LOTTERY_COIN",
  },
  GUESS_CARD: {
    count: 1,
    num: 3,
    key: "GUESS_CARD",
  },
};

/** @description 史诗皮肤秘宝概率 */
export const SKIN_EPIC_TREASURE_CHANCE: TreasureChance = {
  SKIN_CHEST_LIMIT_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_EPIC_OPTIONAL",
  },
  DIAMOND1: {
    count: 2,
    num: 75,
    key: "DIAMOND",
  },
  DIAMOND2: {
    count: 2,
    num: 100,
    key: "DIAMOND",
  },
  SKIN_DEBRIS: {
    count: 2,
    num: 3,
    key: "SKIN_DEBRIS",
  },
  SKIN_LOTTERY_COIN: {
    count: 1,
    num: 3,
    key: "SKIN_LOTTERY_COIN",
  },
  GUESS_CARD: {
    count: 1,
    num: 4,
    key: "GUESS_CARD",
  },
};

/** @description 传说皮肤秘宝概率 */
export const SKIN_LEGEND_TREASURE_CHANCE: TreasureChance = {
  SKIN_CHEST_LEGEND_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_LEGEND_OPTIONAL",
  },
  DIAMOND1: {
    count: 2,
    num: 100,
    key: "DIAMOND",
  },
  DIAMOND2: {
    count: 2,
    num: 150,
    key: "DIAMOND",
  },
  SKIN_DEBRIS: {
    count: 2,
    num: 5,
    key: "SKIN_DEBRIS",
  },
  SKIN_LOTTERY_COIN: {
    count: 1,
    num: 4,
    key: "SKIN_LOTTERY_COIN",
  },
  GUESS_CARD: {
    count: 1,
    num: 5,
    key: "GUESS_CARD",
  },
};

/** @description 限定皮肤秘宝概率 */
export const SKIN_LIMIT_TREASURE_CHANCE: TreasureChance = {
  SKIN_CHEST_LIMIT_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_LIMIT_OPTIONAL",
  },
  DIAMOND1: {
    count: 2,
    num: 75,
    key: "DIAMOND",
  },
  DIAMOND2: {
    count: 2,
    num: 100,
    key: "DIAMOND",
  },
  SKIN_DEBRIS: {
    count: 2,
    num: 4,
    key: "SKIN_DEBRIS",
  },
  SKIN_LOTTERY_COIN: {
    count: 1,
    num: 3,
    key: "SKIN_LOTTERY_COIN",
  },
  GUESS_CARD: {
    count: 1,
    num: 4,
    key: "GUESS_CARD",
  },
};

/** @description 英雄夺宝概率，key为奖品ID，value为分布数量，从2开始是因为1是王者水晶 */
export const HERO_LOTTERY_CHANCE: Record<number, number> = {
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 2,
  9: 2,
  10: 2,
};

/** @description 皮肤夺宝概率，key为奖品ID，value为分布数量，从2开始是因为1是荣耀水晶 */
export const SKIN_LOTTERY_CHANCE: Record<number, number> = {
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 2,
  10: 2,
  11: 2,
  12: 2,
};
