import type { GoodsInfo, TreasureChance } from "../interface";

import {
  BLESSING_BAG_CHANCE,
  HERO_TREASURE_CHANCE,
  SKIN_BRAVE_TREASURE_CHANCE,
  SKIN_EPIC_TREASURE_CHANCE,
  SKIN_LEGEND_TREASURE_CHANCE,
  SKIN_LIMIT_TREASURE_CHANCE,
} from "./game-chance";
import { UPGRADE_EXP, LOTTERY_STONE_WEEK_CARD_GRANT } from "./game-config";

const getPropChanceNum = (chance: TreasureChance, gameProp: Record<Game.PropKey, string>) => {
  let text = "";
  for (const key in chance) {
    const chance_prop = chance[key as Game.PropKey]!;
    const name = gameProp[chance_prop.key];
    text += `${name}*${chance_prop.num}、`;
  }

  return text.slice(0, -1);
};

/** @description 游戏道具Key对应名称 */
export const NAME: Record<Game.PropKey, string> = {
  GOLD: "金币",
  DIAMOND: "钻石",
  HERO_DEBRIS: "英雄碎片",
  SKIN_DEBRIS: "皮肤碎片",
  BLESSING_BAG: "每日福袋",
  KING_CRYSTAL: "王者水晶",
  HONOR_CRYSTAL: "荣耀水晶",
  HERO_EXP_ONE: `英雄${UPGRADE_EXP.HERO_EXP_ONE}经验`,
  HERO_EXP_TWO: `英雄${UPGRADE_EXP.HERO_EXP_TWO}经验`,
  DOUBLE_GOLD: "双倍金币卡",
  DOUBLE_EXP: "双倍经验卡",
  HERO_LOTTERY_COIN: "英雄夺宝币",
  SKIN_LOTTERY_COIN: "皮肤夺宝币",
  HERO_LOTTERY_STONE: "英雄夺宝石",
  SKIN_LOTTERY_STONE: "皮肤夺宝石",
  HERO_LOTTERY_WEEK: "英雄夺宝石周卡",
  SKIN_LOTTERY_WEEK: "皮肤夺宝石周卡",
  SKIN_CARD_INITIAL: "伴生皮肤卡",
  HERO_TREASURE: "英雄秘宝",
  HERO_CHEST_RANDOM: "随机英雄宝箱",
  SKIN_BRAVE_TREASURE: "勇者皮肤秘宝",
  SKIN_EPIC_TREASURE: "史诗皮肤秘宝",
  SKIN_LEGEND_TREASURE: "传说皮肤秘宝",
  SKIN_LIMIT_TREASURE: "限定皮肤秘宝",
  HERO_CHEST_OPTIONAL: "自选英雄宝箱",
  SKIN_CHEST_BRAVE_OPTIONAL: "自选勇者皮肤",
  SKIN_CHEST_EPIC_OPTIONAL: "自选史诗皮肤",
  SKIN_CHEST_LEGEND_OPTIONAL: "自选传说皮肤",
  SKIN_CHEST_LIMIT_OPTIONAL: "自选限定皮肤",
  GUESS_CARD: "竞猜券",
  GUESS_COIN: "竞猜币",
  JUMP_COIN: "跳跳币",
};

/** @description 游戏道具Key对应Key名称 */
export const KEY: Record<Game.PropKey, string> = {
  GOLD: "GOLD",
  DIAMOND: "DIAMOND",
  HERO_DEBRIS: "HERO_DEBRIS",
  SKIN_DEBRIS: "SKIN_DEBRIS",
  BLESSING_BAG: "BLESSING_BAG",
  KING_CRYSTAL: "KING_CRYSTAL",
  HONOR_CRYSTAL: "HONOR_CRYSTAL",
  HERO_EXP_ONE: "HERO_EXP_ONE",
  HERO_EXP_TWO: "HERO_EXP_TWO",
  DOUBLE_GOLD: "DOUBLE_GOLD",
  DOUBLE_EXP: "DOUBLE_EXP",
  HERO_LOTTERY_COIN: "HERO_LOTTERY_COIN",
  SKIN_LOTTERY_COIN: "SKIN_LOTTERY_COIN",
  HERO_LOTTERY_STONE: "HERO_LOTTERY_STONE",
  SKIN_LOTTERY_STONE: "SKIN_LOTTERY_STONE",
  HERO_LOTTERY_WEEK: "HERO_LOTTERY_WEEK",
  SKIN_LOTTERY_WEEK: "SKIN_LOTTERY_WEEK",
  SKIN_CARD_INITIAL: "SKIN_CARD_INITIAL",
  HERO_TREASURE: "HERO_TREASURE",
  HERO_CHEST_RANDOM: "HERO_CHEST_RANDOM",
  SKIN_BRAVE_TREASURE: "SKIN_BRAVE_TREASURE",
  SKIN_EPIC_TREASURE: "SKIN_EPIC_TREASURE",
  SKIN_LEGEND_TREASURE: "SKIN_LEGEND_TREASURE",
  SKIN_LIMIT_TREASURE: "SKIN_LIMIT_TREASURE",
  HERO_CHEST_OPTIONAL: "HERO_CHEST_OPTIONAL",
  SKIN_CHEST_BRAVE_OPTIONAL: "SKIN_CHEST_BRAVE_OPTIONAL",
  SKIN_CHEST_EPIC_OPTIONAL: "SKIN_CHEST_EPIC_OPTIONAL",
  SKIN_CHEST_LEGEND_OPTIONAL: "SKIN_CHEST_LEGEND_OPTIONAL",
  SKIN_CHEST_LIMIT_OPTIONAL: "SKIN_CHEST_LIMIT_OPTIONAL",
  GUESS_CARD: "GUESS_CARD",
  GUESS_COIN: "GUESS_COIN",
  JUMP_COIN: "JUMP_COIN",
};

/** @description 游戏道具Key对应图标名称 */
export const ICON: Record<Game.PropKey, string> = {
  GOLD: "gold",
  DIAMOND: "diamond",
  HERO_DEBRIS: "hero_debris",
  SKIN_DEBRIS: "skin_debris",
  BLESSING_BAG: "blessing_bag",
  KING_CRYSTAL: "king_crystal",
  HONOR_CRYSTAL: "honor_crystal",
  HERO_EXP_ONE: "hero_exp",
  HERO_EXP_TWO: "hero_exp",
  DOUBLE_GOLD: "double_gold",
  DOUBLE_EXP: "double_exp",
  HERO_LOTTERY_COIN: "hero_lottery_coin",
  SKIN_LOTTERY_COIN: "skin_lottery_coin",
  HERO_LOTTERY_STONE: "hero_lottery_stone",
  SKIN_LOTTERY_STONE: "skin_lottery_stone",
  HERO_LOTTERY_WEEK: "hero_lottery_week",
  SKIN_LOTTERY_WEEK: "skin_lottery_week",
  SKIN_CARD_INITIAL: "skin_card_initial",
  HERO_TREASURE: "hero_treasure",
  HERO_CHEST_RANDOM: "hero_chest_random",
  SKIN_BRAVE_TREASURE: "skin_brave_treasure",
  SKIN_EPIC_TREASURE: "skin_epic_treasure",
  SKIN_LEGEND_TREASURE: "skin_legend_treasure",
  SKIN_LIMIT_TREASURE: "skin_limit_treasure",
  HERO_CHEST_OPTIONAL: "hero_chest_optional",
  SKIN_CHEST_BRAVE_OPTIONAL: "skin_chest_brave_optional",
  SKIN_CHEST_EPIC_OPTIONAL: "skin_chest_epic_optional",
  SKIN_CHEST_LEGEND_OPTIONAL: "skin_chest_legend_optional",
  SKIN_CHEST_LIMIT_OPTIONAL: "skin_chest_limit_optional",
  GUESS_CARD: "guess_card",
  GUESS_COIN: "guess_coin",
  JUMP_COIN: "jump_coin",
};

/** @description 游戏道具Key对应描述 */
export const DESC: Record<Game.PropKey, string> = {
  GOLD: "通过英雄夺宝获得，可用于道具商店购买道具。",
  DIAMOND: "通过皮肤夺宝获得，可用于道具商店购买道具。",
  HERO_DEBRIS: "通过英雄夺宝获得，可用于商城-碎片商店兑换英雄。",
  SKIN_DEBRIS: "通过皮肤夺宝获得，可用于商城-碎片商店兑换皮肤。",
  BLESSING_BAG: `通过每日登录邮箱领取福袋，打开后获得以下奖励：${getPropChanceNum(
    BLESSING_BAG_CHANCE,
    NAME,
  )}。`,
  KING_CRYSTAL: "通过英雄夺宝获得，可用于商城-水晶商店兑换皮肤。",
  HONOR_CRYSTAL: "通过皮肤夺宝获得，可用于商城-水晶商店兑换皮肤。",
  HERO_EXP_ONE:
    "通过英雄夺宝及商城-道具商店购买获得，可用于提升英雄熟练度，熟练度达到一定等级可领取英雄的伴生皮肤卡。",
  HERO_EXP_TWO:
    "通过英雄夺宝及商城-道具商店金币购买获得，可用于提升英雄熟练度，熟练度达到一定等级可领取英雄的伴生皮肤卡。",
  DOUBLE_GOLD:
    "通过商城-道具商店购买获得，使用后在夺宝时获得的金币数量翻倍，有效时间：24小时，重复使用此卡不会叠加奖励，只会延续时长。",
  DOUBLE_EXP:
    "通过商城-道具商店购买获得，使用后在夺宝时获得的经验宝箱数量翻倍，有效时间：24小时，重复使用此卡不会叠加奖励，只会延续时长。",
  HERO_LOTTERY_COIN: "通过每日登录邮箱领取英雄夺宝币，可用于英雄夺宝，夺宝币当日有效，次日归零。",
  SKIN_LOTTERY_COIN: "通过每日登录邮箱领取英雄夺宝币，可用于皮肤夺宝，夺宝币当日有效，次日归零。",
  HERO_LOTTERY_STONE:
    "通过英雄夺宝石补给站、夺宝石周卡获得，当英雄夺宝币用完后，可使用夺宝石增加一次英雄夺宝次数。",
  SKIN_LOTTERY_STONE:
    "通过皮肤夺宝石补给站、夺宝石周卡获得，当英雄夺宝币用完后，可使用夺宝石增加一次英雄夺宝次数。",
  HERO_LOTTERY_WEEK: `通过商城-道具商店购买获得，使用此卡后，从当日0点开始，每日通过邮箱发放英雄夺宝石*${LOTTERY_STONE_WEEK_CARD_GRANT.HERO.STONE}，并赠送英雄夺宝币*${LOTTERY_STONE_WEEK_CARD_GRANT.HERO.COIN}，重复使用此卡不会叠加奖励，只会延续时长。`,
  SKIN_LOTTERY_WEEK: `通过商城-道具商店购买获得，使用此卡后，从当日0点开始，每日通过邮箱发放皮肤夺宝石*${LOTTERY_STONE_WEEK_CARD_GRANT.HERO.STONE}，并赠送皮肤夺宝币*${LOTTERY_STONE_WEEK_CARD_GRANT.HERO.COIN}，重复使用此卡不会叠加奖励，只会延续时长。`,
  SKIN_CARD_INITIAL: "通过英雄满级后获得，可用于兑换任意英雄的伴生皮肤",
  HERO_TREASURE: `通过英雄夺宝获得，打开后随机获得以下奖励之一：${getPropChanceNum(
    HERO_TREASURE_CHANCE,
    NAME,
  )}。`,
  HERO_CHEST_RANDOM: "通过英雄夺宝获得，打开后随机获得一个英雄。",
  SKIN_BRAVE_TREASURE: `通过皮肤夺宝获得，打开后随机获得以下奖励之一：${getPropChanceNum(
    SKIN_BRAVE_TREASURE_CHANCE,
    NAME,
  )}，皮肤秘宝品质越高，获得的稀有道具概率越高。`,
  SKIN_EPIC_TREASURE: `通过皮肤夺宝获得，打开后随机获得以下奖励之一：${getPropChanceNum(
    SKIN_EPIC_TREASURE_CHANCE,
    NAME,
  )}，皮肤秘宝品质越高，获得的稀有道具概率越高。`,
  SKIN_LEGEND_TREASURE: `通过皮肤夺宝获得，打开后随机获得以下奖励之一：${getPropChanceNum(
    SKIN_LEGEND_TREASURE_CHANCE,
    NAME,
  )}，皮肤秘宝品质越高，获得的稀有道具概率越高。`,
  SKIN_LIMIT_TREASURE: `通过皮肤夺宝获得，打开后随机获得以下奖励之一：${getPropChanceNum(
    SKIN_LIMIT_TREASURE_CHANCE,
    NAME,
  )}，皮肤秘宝品质越高，获得的稀有道具概率越高。`,
  HERO_CHEST_OPTIONAL: "通过英雄秘宝获得，打开后自选一个英雄。",
  SKIN_CHEST_BRAVE_OPTIONAL: "通过皮肤夺宝获得，打开后自选一款勇者皮肤。",
  SKIN_CHEST_EPIC_OPTIONAL: "通过皮肤夺宝获得，打开后自选一个史诗皮肤。",
  SKIN_CHEST_LEGEND_OPTIONAL: "通过皮肤夺宝获得，打开后自选一个款传说皮肤。",
  SKIN_CHEST_LIMIT_OPTIONAL: "通过皮肤夺宝获得，打开后自选一款限定皮肤。",
  GUESS_CARD: "通过商城-道具商店购买获得，用于参加竞猜活动。",
  GUESS_COIN: "通过参与竞猜活动，答对题目获得，用于兑换乂宝部件装扮。",
  JUMP_COIN: "通过乂宝跳跃获得，用于兑换乂宝纯色风格的部件。",
};

/** @description 道具价格表 */
export const PRICE: GoodsInfo[] = [
  {
    way: "GOLD",
    key: "HERO_EXP_ONE",
    price: 100,
    num: 1,
  },
  {
    way: "GOLD",
    key: "HERO_EXP_TWO",
    price: 200,
    num: 1,
  },
  {
    way: "DIAMOND",
    key: "HERO_LOTTERY_WEEK",
    price: 300,
    num: 1,
  },
  {
    way: "DIAMOND",
    key: "SKIN_LOTTERY_WEEK",
    price: 500,
    num: 1,
  },
  {
    way: "DIAMOND",
    key: "DOUBLE_EXP",
    price: 250,
    num: 1,
  },
  {
    way: "DIAMOND",
    key: "DOUBLE_GOLD",
    price: 500,
    num: 1,
  },
  {
    way: "DIAMOND",
    key: "HERO_LOTTERY_STONE",
    price: 100,
    num: 1,
  },
  {
    way: "GOLD",
    key: "SKIN_LOTTERY_STONE",
    price: 200,
    num: 1,
  },
  {
    way: "DIAMOND",
    key: "GUESS_CARD",
    price: 50,
    num: 1,
  },
];
