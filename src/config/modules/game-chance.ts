import { TreasureChance } from "../interface";

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
    count: 1,
    num: 10,
    key: "HERO_DEBRIS",
  },
  HERO_EXP_ONE: {
    count: 1,
    num: 2,
    key: "HERO_EXP_ONE",
  },
  HERO_EXP_TWO: {
    count: 1,
    num: 2,
    key: "HERO_EXP_TWO",
  },
  HERO_LOTTERY_STONE: {
    count: 1,
    num: 1,
    key: "HERO_LOTTERY_STONE",
  },
};

/** @description 勇者皮肤秘宝概率 */
export const SKIN_BRAVE_TREASURE_CHANCE: TreasureChance = {
  SKIN_CHEST_BRAVE_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_BRAVE_OPTIONAL",
  },
  DIAMOND: {
    count: 1,
    num: 100,
    key: "DIAMOND",
  },
  SKIN_DEBRIS: {
    count: 1,
    num: 10,
    key: "SKIN_DEBRIS",
  },
  SKIN_LOTTERY_STONE: {
    count: 1,
    num: 1,
    key: "SKIN_LOTTERY_STONE",
  },
};

/** @description 史诗皮肤秘宝概率 */
export const SKIN_EPIC_TREASURE_CHANCE: TreasureChance = {
  SKIN_CHEST_LIMIT_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_EPIC_OPTIONAL",
  },
  DIAMOND: {
    count: 1,
    num: 100,
    key: "DIAMOND",
  },
  SKIN_DEBRIS: {
    count: 1,
    num: 10,
    key: "SKIN_DEBRIS",
  },
  SKIN_LOTTERY_STONE: {
    count: 1,
    num: 1,
    key: "SKIN_LOTTERY_STONE",
  },
};

/** @description 传说皮肤秘宝概率 */
export const SKIN_LEGEND_TREASURE_CHANCE: TreasureChance = {
  SKIN_CHEST_LEGEND_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_LEGEND_OPTIONAL",
  },
  DIAMOND: {
    count: 1,
    num: 100,
    key: "DIAMOND",
  },
  SKIN_DEBRIS: {
    count: 1,
    num: 10,
    key: "SKIN_DEBRIS",
  },
  SKIN_LOTTERY_STONE: {
    count: 1,
    num: 1,
    key: "SKIN_LOTTERY_STONE",
  },
};

/** @description 限定皮肤秘宝概率 */
export const SKIN_LIMIT_TREASURE_CHANCE: TreasureChance = {
  SKIN_CHEST_LIMIT_OPTIONAL: {
    count: 1,
    num: 1,
    key: "SKIN_CHEST_LIMIT_OPTIONAL",
  },
  DIAMOND: {
    count: 1,
    num: 100,
    key: "DIAMOND",
  },
  SKIN_DEBRIS: {
    count: 1,
    num: 10,
    key: "SKIN_DEBRIS",
  },
  SKIN_LOTTERY_STONE: {
    count: 1,
    num: 1,
    key: "SKIN_LOTTERY_STONE",
  },
};

/** @description 皮肤夺宝概率，key为奖品ID，value为分布数量，从2开始是因为1是荣耀水晶 */
export const SKIN_LOTTERY_CHANCE: Record<number, number> = {
  2: 1,
  3: 1,
  4: 10,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
  10: 1,
  11: 1,
  12: 1,
};

/** @description 英雄夺宝概率，key为奖品ID，value为分布数量，从2开始是因为1是王者水晶 */
export const HERO_LOTTERY_CHANCE: Record<number, number> = {
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
  10: 1,
};
