import { TaskType } from "../interface";

import { ROUTE_PATH } from "./route-path";

/** @description 熟练度名称 */
export const EXP_NAME: Record<string, string[]> = {
  坦克: ["见习坦克", "资深坦克", "精英坦克", "宗师坦克", "不灭的霸者"],
  战士: ["见习战士", "资深战士", "精英战士", "宗师战士", "传说的剑圣"],
  法师: ["见习法师", "资深法师", "精英法师", "宗师法师", "魔道的传奇"],
  刺客: ["见习刺客", "资深刺客", "精英刺客", "宗师刺客", "天诛的影刃"],
  射手: ["见习射手", "资深射手", "精英射手", "宗师射手", "鹰眼的神射"],
  辅助: ["见习辅助", "资深辅助", "精英辅助", "宗师辅助", "至圣的贤者"],
};

/** @description 升级包对应经验 */
export const UPGRADE_EXP = {
  HERO_EXP_ONE: 50,
  HERO_EXP_TWO: 100,
} as const;

/** @description 英雄等级区间 */
export const UPGRADE_RANGE = [0, 100, 300, 1000, 2000];

/** @description 升级赠送道具区间 */
export const UPGRADE_GIFT: Record<number, { key: Game.PropKey; count: number }> = {
  100: { key: "SKIN_DEBRIS", count: 1 },
  300: { key: "SKIN_DEBRIS", count: 2 },
  1000: { key: "SKIN_DEBRIS", count: 3 },
  2000: { key: "SKIN_CARD_INITIAL", count: 1 },
};

/** @description 夺宝转盘项 */
export const LOTTERY_AWARD: Record<
  "HERO" | "SKIN",
  { id: number; type: Game.PropKey; num?: number }[]
> = {
  HERO: [
    { id: 1, type: "KING_CRYSTAL" },
    { id: 4, type: "HERO_DEBRIS", num: 3 },
    { id: 7, type: "HERO_EXP_ONE", num: 1 },
    { id: 2, type: "HERO_CHEST_OPTIONAL" },
    { id: 5, type: "HERO_DEBRIS", num: 2 },
    { id: 8, type: "GOLD", num: 40 },
    { id: 3, type: "HERO_TREASURE" },
    { id: 9, type: "GOLD", num: 60 },
    { id: 6, type: "HERO_EXP_TWO", num: 1 },
    { id: 10, type: "GOLD", num: 80 },
  ],
  SKIN: [
    { id: 1, type: "HONOR_CRYSTAL" },
    { id: 2, type: "SKIN_BRAVE_TREASURE" },
    { id: 6, type: "SKIN_DEBRIS", num: 3 },
    { id: 9, type: "DIAMOND", num: 80 },
    { id: 3, type: "SKIN_EPIC_TREASURE" },
    { id: 7, type: "SKIN_DEBRIS", num: 2 },
    { id: 10, type: "DIAMOND", num: 60 },
    { id: 4, type: "SKIN_LEGEND_TREASURE" },
    { id: 8, type: "SKIN_DEBRIS", num: 1 },
    { id: 11, type: "DIAMOND", num: 40 },
    { id: 5, type: "SKIN_LIMIT_TREASURE" },
    { id: 12, type: "DIAMOND", num: 20 },
  ],
} as const;

/** @description 夺宝水晶赠送区间，注：值为索引号，不能等于最大值 */
export const LOTTERY_CRYSTAL_INTERVAL = {
  hero: [2, 3],
  skin: [150, 200],
};

/** @description 夺宝补给模式 */
export const LOTTERY_SUPPLY_MODE: Game.LotterySupply.Mode[] = [
  {
    label: "30秒/1个",
    seconds: 5,
    count: 1,
  },
  {
    label: "1分钟/2个",
    seconds: 10,
    count: 2,
  },
  {
    label: "3分钟/5个",
    seconds: 15,
    count: 5,
  },
  {
    label: "5分钟/7个",
    seconds: 20,
    count: 7,
  },
  {
    label: "10分钟/15个",
    seconds: 10 * 60,
    count: 15,
  },
  {
    label: "20分钟/30个",
    seconds: 20 * 60,
    count: 30,
  },
  {
    label: "30分钟/40个",
    seconds: 30 * 60,
    count: 40,
  },
  {
    label: "1小时/50个",
    seconds: 1 * 60 * 60,
    count: 50,
  },
  {
    label: "2小时/75个",
    seconds: 3 * 60 * 60,
    count: 75,
  },
  {
    label: "3小时/100个",
    seconds: 3 * 60 * 60,
    count: 100,
  },
  {
    label: "5小时/125个",
    seconds: 5 * 60 * 60,
    count: 125,
  },
  {
    label: "7小时/150个",
    seconds: 7 * 60 * 60,
    count: 150,
  },
  {
    label: "9小时/200个",
    seconds: 9 * 60 * 60,
    count: 200,
  },
];

/** @description 夺宝补给每日上限 */
export const LOTTERY_SUPPLY_LIMIT = 200;

/** @description 抵扣石周卡赠送道具数量 */
export const LOTTERY_STONE_WEEK_CARD_GRANT = {
  HERO: {
    STONE: 25,
    COIN: 25,
  },
  SKIN: {
    STONE: 25,
    COIN: 25,
  },
} as const;

/** @description 今日及本周任务列表 */
export const TASK_LIST: TaskType[] = [
  {
    id: "de89",
    type: "DAILY",
    label: "在线奖励",
    desc: "在线时间超过30分钟",
    receive: false,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "今日已在线(分钟)",
        value: 30,
        total: 30,
      },
    ],
  },
  {
    id: "qw27",
    type: "DAILY",
    label: "每日消费",
    desc: "去商城使用金币和钻石购买一次道具",
    receive: false,
    path: ROUTE_PATH.PROP_SHOP,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "今日已消费金币",
        value: 0,
        total: 1,
      },
      {
        label: "今日已消费钻石",
        value: 0,
        total: 1,
      },
    ],
  },
  {
    id: "mx25",
    type: "DAILY",
    label: "每日夺宝",
    desc: "完成一次英雄夺宝和皮肤夺宝",
    receive: false,
    path: ROUTE_PATH.HERO_LOTTERY,
    props: [
      {
        type: "HERO_LOTTERY_COIN",
        num: 1,
      },
      {
        type: "SKIN_LOTTERY_COIN",
        num: 1,
      },
    ],
    schedule: [
      {
        label: "今日英雄夺宝",
        value: 0,
        total: 1,
      },
      {
        label: "今日皮肤夺宝",
        value: 0,
        total: 1,
      },
    ],
  },
  {
    id: "r88v",
    type: "DAILY",
    label: "双倍的诱惑",
    desc: "使用一次双倍金币卡或双倍经验卡",
    receive: false,
    path: ROUTE_PATH.KNAPSACK,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "今日已使用",
        value: 0,
        total: 1,
      },
    ],
  },
  {
    id: "sp37",
    type: "DAILY",
    label: "每日补给",
    desc: "领取一次英雄夺宝补给和皮肤夺宝补给",
    receive: false,
    path: ROUTE_PATH.HERO_LOTTERY,
    props: [
      {
        type: "HERO_LOTTERY_STONE",
        num: 1,
      },
      {
        type: "SKIN_LOTTERY_STONE",
        num: 1,
      },
    ],
    schedule: [
      {
        label: "今日英雄夺宝补给领取",
        value: 0,
        total: 1,
      },
      {
        label: "今日皮肤夺宝补给领取",
        value: 0,
        total: 1,
      },
    ],
  },
  {
    id: "d1b7",
    type: "DAILY",
    label: "英雄夺宝达人",
    desc: "消耗完今日赠送的英雄夺宝币和抵扣石",
    receive: false,
    path: ROUTE_PATH.HERO_LOTTERY,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "今日已消耗夺宝币",
        value: 0,
        total: 25,
      },
      {
        label: "今日已消耗抵扣石",
        value: 0,
        total: 25,
      },
    ],
  },
  {
    id: "q35i",
    type: "DAILY",
    label: "皮肤夺宝达人",
    desc: "消耗完今日赠送的皮肤夺宝币和抵扣石",
    receive: false,
    path: ROUTE_PATH.SKIN_LOTTERY,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "今日已消耗夺宝币",
        value: 0,
        total: 25,
      },
      {
        label: "今日已消耗抵扣石",
        value: 0,
        total: 25,
      },
    ],
  },
  {
    id: "o1u8",
    type: "DAILY",
    label: "免费英雄夺宝抵扣石",
    desc: "今日通过英雄夺宝补给站获取25个英雄夺宝抵扣石",
    receive: false,
    path: ROUTE_PATH.HERO_LOTTERY,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "今日已获取抵扣石",
        value: 0,
        total: 25,
      },
    ],
  },
  {
    id: "vk13",
    type: "DAILY",
    label: "免费皮肤夺宝抵扣石",
    desc: "今日通过皮肤夺宝补给站获取25个皮肤夺宝抵扣石",
    receive: false,
    path: ROUTE_PATH.SKIN_LOTTERY,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "今日已获取抵扣石",
        value: 0,
        total: 25,
      },
    ],
  },
  {
    id: "q20y",
    type: "WEEKLY",
    label: "闲暇时光",
    desc: "在线时长累计两小时",
    receive: false,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "本周已在线(分钟)",
        value: 0,
        total: 120,
      },
    ],
  },
  {
    id: "a21l",
    type: "WEEKLY",
    label: "常往の客",
    desc: "连续七天登录",
    receive: false,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "本周已登录(天)",
        value: 0,
        total: 7,
      },
    ],
  },
  {
    id: "a6b9",
    type: "WEEKLY",
    label: "天天领取抵扣石",
    desc: "使用一次英雄抵扣石周卡和皮肤抵扣石周卡",
    receive: false,
    path: ROUTE_PATH.PROP_SHOP,
    props: [
      {
        type: "GOLD",
        num: 200,
      },
      {
        type: "DIAMOND",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "本周英雄抵扣石周卡",
        value: 0,
        total: 1,
      },
      {
        label: "本周皮肤抵扣石周卡",
        value: 0,
        total: 1,
      },
    ],
  },
  {
    id: "pc22",
    type: "WEEKLY",
    label: "一块都没有了",
    desc: "消耗某日的所有英雄抵扣石补给站和皮肤夺宝补给站的额度",
    receive: false,
    props: [
      {
        type: "HERO_LOTTERY_STONE",
        num: 200,
      },
      {
        type: "SKIN_LOTTERY_STONE",
        num: 200,
      },
    ],
    schedule: [
      {
        label: "本周英雄抵扣石补给站额度",
        value: 0,
        total: 200,
      },
      {
        label: "本周皮肤抵扣石补给站额度",
        value: 0,
        total: 200,
      },
    ],
  },
  {
    id: "om70",
    type: "WEEKLY",
    label: "夺宝狂魔",
    desc: "连续一周消耗完所有赠送的夺宝币、抵扣石，补给站除外",
    receive: false,
    props: [
      {
        type: "HERO_LOTTERY_COIN",
        num: 25,
      },
      {
        type: "HERO_LOTTERY_STONE",
        num: 25,
      },
      {
        type: "SKIN_LOTTERY_COIN",
        num: 225,
      },
      {
        type: "SKIN_LOTTERY_STONE",
        num: 225,
      },
    ],
    schedule: [
      {
        label: "本周消耗英雄夺宝币",
        value: 0,
        total: 25 * 7,
      },
      {
        label: "本周消耗皮肤夺宝币",
        value: 0,
        total: 25 * 7,
      },
      {
        label: "本周消耗英雄抵扣石",
        value: 0,
        total: 25 * 7,
      },
      {
        label: "本周消耗皮肤抵扣石",
        value: 0,
        total: 25 * 7,
      },
    ],
  },
];
