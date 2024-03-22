import type { GameProp, GoodsInfo } from "../interface";

import {
  HERO_TREASURE_CHANCE as HERO,
  SKIN_BRAVE_TREASURE_CHANCE as BRAVE,
  SKIN_EPIC_TREASURE_CHANCE as EPIC,
  SKIN_LEGEND_TREASURE_CHANCE as LEGEND,
  SKIN_LIMIT_TREASURE_CHANCE as LIMIT,
} from "./game-chance";
import { LOTTERY_STONE_WEEK_CARD_GRANT } from "./game-config";

import { _getImgLink } from "@/utils/concise";

/**
 * @description 游戏道具及物品
 * 警告：严禁修改Key，及删除道具，会导致召唤师卡内的字段无法匹配道具，导致道具丢失
 */
export const GAME_PROP: GameProp = {
  GOLD: {
    label: "金币",
    key: "GOLD",
    icon: _getImgLink("gold"),
    desc: "通过英雄夺宝及钻石购买获得，仅用于道具商店购买",
  },
  DIAMOND: {
    label: "钻石",
    key: "DIAMOND",
    icon: _getImgLink("diamond"),
    desc: "通过皮肤夺宝获得，仅用于道具商店购买",
  },
  HERO_DEBRIS: {
    label: "英雄碎片",
    key: "HERO_DEBRIS",
    icon: _getImgLink("hero_debris"),
    desc: "可用于兑换英雄",
  },
  SKIN_DEBRIS: {
    label: "皮肤碎片",
    key: "SKIN_DEBRIS",
    icon: _getImgLink("skin_debris"),
    desc: "仅可用于兑换支持在游戏内点券购买的皮肤，但不能兑换伴生、限定、源梦",
  },
  BLESSING_BAG: {
    label: "每日福袋",
    key: "BLESSING_BAG",
    icon: _getImgLink("blessing_bag"),
    desc: "每日登录赠送福袋，打开后获得以下奖励：随机50-100钻石、随机1-3英雄碎片、随机1-3皮肤碎片",
  },
  TASK_REWARDS_OPTIONAL: {
    label: "奖励自选礼包",
    key: "TASK_REWARDS_OPTIONAL",
    icon: _getImgLink("task_rewards_optional"),
    desc: "完成任务可获得",
  },
  GIFT_BOX: {
    label: "开发者的礼盒",
    key: "GIFT_BOX",
    icon: _getImgLink("gift_box"),
    desc: "完成一些特殊任务后，发送你的ID给开发者，由开发者发放任务奖励",
  },
  KING_CRYSTAL: {
    label: "王者水晶",
    key: "KING_CRYSTAL",
    icon: _getImgLink("king_crystal"),
    desc: "仅可用于兑换周年系列、赛季系列、王者之证系列、活动专属系列、源梦系列、星会员系列、新春专属系列、珍宝阁系列",
  },
  HONOR_CRYSTAL: {
    label: "荣耀水晶",
    key: "HONOR_CRYSTAL",
    icon: _getImgLink("honor_crystal"),
    desc: "可用于兑换荣耀典藏皮肤",
  },
  HERO_EXP_ONE: {
    label: "英雄100经验",
    key: "HERO_EXP_ONE",
    icon: _getImgLink("hero_exp"),
    desc: "可用于提升英雄熟练度，熟练度达到一定等级可领取英雄的伴生皮肤",
  },
  HERO_EXP_TWO: {
    label: "英雄200经验",
    key: "HERO_EXP_TWO",
    icon: _getImgLink("hero_exp"),
    desc: "可用于提升英雄熟练度，熟练度达到一定等级可领取英雄的伴生皮肤",
  },
  DOUBLE_GOLD: {
    label: "双倍金币卡",
    key: "DOUBLE_GOLD",
    icon: _getImgLink("double_gold", "1"),
    desc: "在夺宝获得的金币数量翻倍",
  },
  DOUBLE_EXP: {
    label: "双倍经验卡",
    key: "DOUBLE_EXP",
    icon: _getImgLink("double_exp", "1"),
    desc: "在夺宝获得的经验宝箱数量翻倍",
  },
  HERO_LOTTERY_COIN: {
    label: "英雄夺宝币",
    key: "HERO_LOTTERY_COIN",
    icon: _getImgLink("hero_lottery_coin"),
    desc: "每日发放英雄夺宝币，可用于英雄夺宝，夺宝币当日有效，次日归零。",
  },
  SKIN_LOTTERY_COIN: {
    label: "皮肤夺宝币",
    key: "SKIN_LOTTERY_COIN",
    icon: _getImgLink("skin_lottery_coin"),
    desc: "每日发放皮肤夺宝币，可用于皮肤夺宝，夺宝币当日有效，次日归零。",
  },
  HERO_LOTTERY_STONE: {
    label: "英雄夺宝抵用石",
    key: "HERO_LOTTERY_STONE",
    icon: _getImgLink("hero_lottery_stone"),
    desc: "当英雄夺宝币用完后，可使用该道具增加一次英雄夺宝次数",
  },
  SKIN_LOTTERY_STONE: {
    label: "皮肤夺宝抵用石",
    key: "SKIN_LOTTERY_STONE",
    icon: _getImgLink("skin_lottery_stone"),
    desc: "当皮肤夺宝币用完后，可使用该道具增加一次皮肤夺宝次数",
  },
  HERO_LOTTERY_WEEK: {
    label: "英雄夺宝抵扣石周卡",
    key: "HERO_LOTTERY_WEEK",
    icon: _getImgLink("hero_lottery_week"),
    desc: `使用此卡后，从当日0点开始，每日通过邮箱发放英雄夺宝抵扣石*${LOTTERY_STONE_WEEK_CARD_GRANT.HERO.STONE}，并赠送英雄夺宝币*${LOTTERY_STONE_WEEK_CARD_GRANT.HERO.COIN}，重复使用此卡不会叠加奖励，只会延续时长。`,
  },
  SKIN_LOTTERY_WEEK: {
    label: "皮肤夺宝抵扣石周卡",
    key: "SKIN_LOTTERY_WEEK",
    icon: _getImgLink("skin_lottery_week"),
    desc: `使用此卡后，从当日0点开始，每日通过邮箱发放皮肤夺宝抵扣石*${LOTTERY_STONE_WEEK_CARD_GRANT.HERO.STONE}，并赠送皮肤夺宝币*${LOTTERY_STONE_WEEK_CARD_GRANT.HERO.COIN}，重复使用此卡不会叠加奖励，只会延续时长。`,
  },
  SKIN_CARD_INITIAL: {
    label: "伴生皮肤卡",
    key: "SKIN_CARD_INITIAL",
    icon: _getImgLink("skin_card_initial"),
    desc: "可用于兑换任意英雄的伴生皮肤，当英雄满级后获取次卡",
  },
  HERO_TREASURE: {
    label: "英雄秘宝",
    key: "HERO_TREASURE",
    icon: _getImgLink("hero_treasure", "2"),
    desc: `打开后随机获得以下奖励之一：自选限定皮肤宝箱、金币*${HERO.GOLD?.num}、英雄碎片*${HERO.HERO_DEBRIS?.num}、英雄100经验*${HERO.HERO_EXP_ONE?.num}、英雄200经验*${HERO.HERO_EXP_TWO?.num}、英雄夺宝抵用石*${HERO.HERO_LOTTERY_STONE?.num}`,
  },
  SKIN_BRAVE_TREASURE: {
    label: "勇者皮肤秘宝",
    key: "SKIN_BRAVE_TREASURE",
    icon: _getImgLink("skin_brave_treasure", "2"),
    desc: `打开后随机获得以下奖励之一：自选勇者皮肤宝箱、钻石*${BRAVE.DIAMOND?.num}、皮肤碎片*${BRAVE.SKIN_DEBRIS?.num}、皮肤夺宝抵用石*${BRAVE.SKIN_LOTTERY_STONE?.num}`,
  },
  SKIN_EPIC_TREASURE: {
    label: "史诗皮肤秘宝",
    key: "SKIN_EPIC_TREASURE",
    icon: _getImgLink("skin_epic_treasure", "2"),
    desc: `打开后随机获得以下奖励之一：自选史诗皮肤宝箱、钻石*${EPIC.DIAMOND?.num}、皮肤碎片*${EPIC.SKIN_DEBRIS?.num}、皮肤夺宝抵用石*${EPIC.SKIN_LOTTERY_STONE?.num}`,
  },
  SKIN_LEGEND_TREASURE: {
    label: "传说皮肤秘宝",
    key: "SKIN_LEGEND_TREASURE",
    icon: _getImgLink("skin_legend_treasure", "2"),
    desc: `打开后随机获得以下奖励之一：自选史诗皮肤宝箱、钻石*${LEGEND.DIAMOND?.num}、皮肤碎片*${LEGEND.SKIN_DEBRIS?.num}、皮肤夺宝抵用石*${LEGEND.SKIN_LOTTERY_STONE?.num}`,
  },
  SKIN_LIMIT_TREASURE: {
    label: "限定皮肤秘宝",
    key: "SKIN_LIMIT_TREASURE",
    icon: _getImgLink("skin_limit_treasure", "3"),
    desc: `打开后随机获得以下奖励之一：自选限定皮肤宝箱、钻石*${LIMIT.DIAMOND?.num}、皮肤碎片*${LIMIT.SKIN_DEBRIS?.num}、皮肤夺宝抵用石*${LIMIT.SKIN_LOTTERY_STONE?.num}`,
  },
  HERO_CHEST_OPTIONAL: {
    label: "自选英雄宝箱",
    key: "HERO_CHEST_OPTIONAL",
    icon: _getImgLink("hero_chest_optional", "1"),
    desc: "打开后自选一个英雄",
  },
  SKIN_CHEST_BRAVE_OPTIONAL: {
    label: "自选勇者皮肤",
    key: "SKIN_CHEST_BRAVE_OPTIONAL",
    icon: _getImgLink("skin_chest_brave_optional", "1"),
    desc: "打开后自选一款勇者皮肤",
  },
  SKIN_CHEST_EPIC_OPTIONAL: {
    label: "自选史诗皮肤",
    key: "SKIN_CHEST_EPIC_OPTIONAL",
    icon: _getImgLink("skin_chest_epic_optional"),
    desc: "打开后自选一个史诗皮肤",
  },
  SKIN_CHEST_LEGEND_OPTIONAL: {
    label: "自选传说皮肤",
    key: "SKIN_CHEST_LEGEND_OPTIONAL",
    icon: _getImgLink("skin_chest_legend_optional"),
    desc: "打开后自选一个款传说皮肤",
  },
  SKIN_CHEST_LIMIT_OPTIONAL: {
    label: "自选限定皮肤",
    key: "SKIN_CHEST_LIMIT_OPTIONAL",
    icon: _getImgLink("skin_chest_limit_optional"),
    desc: "打开后自选一款限定皮肤",
  },
};

/** @description 道具价格表 */
export const PROP_PRICE: GoodsInfo[] = [
  {
    way: "GOLD",
    data: GAME_PROP.DIAMOND,
    price: 200,
    num: 100,
  },
  {
    way: "GOLD",
    data: GAME_PROP.HERO_DEBRIS,
    price: 50,
    num: 1,
  },
  {
    way: "DIAMOND",
    data: GAME_PROP.SKIN_DEBRIS,
    price: 50,
    num: 1,
  },
  {
    way: "GOLD",
    data: GAME_PROP.HERO_EXP_ONE,
    price: 100,
    num: 1,
  },
  {
    way: "GOLD",
    data: GAME_PROP.HERO_EXP_TWO,
    price: 200,
    num: 1,
  },
  {
    way: "GOLD",
    data: GAME_PROP.HERO_LOTTERY_WEEK,
    price: 100,
    num: 1,
  },
  {
    way: "DIAMOND",
    data: GAME_PROP.SKIN_LOTTERY_WEEK,
    price: 100,
    num: 1,
  },
  {
    way: "DIAMOND",
    data: GAME_PROP.DOUBLE_EXP,
    price: 100,
    num: 1,
  },
  {
    way: "GOLD",
    data: GAME_PROP.DOUBLE_GOLD,
    price: 100,
    num: 1,
  },
];
