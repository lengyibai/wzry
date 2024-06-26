import type { TaskSchedule, TaskType } from "../interface";

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
    { id: 4, type: "HERO_DEBRIS", num: 2 },
    { id: 7, type: "HERO_EXP_ONE", num: 1 },
    { id: 2, type: "HERO_CHEST_RANDOM" },
    { id: 5, type: "HERO_DEBRIS", num: 1 },
    { id: 8, type: "GOLD", num: 25 },
    { id: 3, type: "HERO_TREASURE" },
    { id: 9, type: "GOLD", num: 50 },
    { id: 6, type: "HERO_EXP_TWO", num: 1 },
    { id: 10, type: "GOLD", num: 75 },
  ],
  SKIN: [
    { id: 1, type: "HONOR_CRYSTAL" },
    { id: 2, type: "SKIN_BRAVE_TREASURE" },
    { id: 6, type: "SKIN_DEBRIS", num: 3 },
    { id: 9, type: "DIAMOND", num: 100 },
    { id: 3, type: "SKIN_EPIC_TREASURE" },
    { id: 7, type: "SKIN_DEBRIS", num: 2 },
    { id: 10, type: "DIAMOND", num: 75 },
    { id: 4, type: "SKIN_LEGEND_TREASURE" },
    { id: 8, type: "SKIN_DEBRIS", num: 1 },
    { id: 11, type: "DIAMOND", num: 50 },
    { id: 5, type: "SKIN_LIMIT_TREASURE" },
    { id: 12, type: "DIAMOND", num: 25 },
  ],
} as const;

/** @description 夺宝水晶赠送区间，注：值为索引号，不能等于最大值 */
export const LOTTERY_CRYSTAL_INTERVAL = {
  hero: [50, 150],
  skin: [100, 190],
};

/** @description 夺宝补给模式 */
export const LOTTERY_SUPPLY_MODE: Game.LotterySupply.Mode[] = [
  {
    label: "15秒/1个",
    seconds: 15,
    count: 1,
  },
  {
    label: "1分钟/5个",
    seconds: 60,
    count: 5,
  },
  {
    label: "3分钟/12个",
    seconds: 3 * 60,
    count: 12,
  },
  {
    label: "5分钟/20个",
    seconds: 5 * 60,
    count: 20,
  },
  {
    label: "10分钟/35个",
    seconds: 10 * 60,
    count: 35,
  },
  {
    label: "20分钟/60个",
    seconds: 20 * 60,
    count: 60,
  },
  {
    label: "30分钟/75个",
    seconds: 30 * 60,
    count: 75,
  },
  {
    label: "1小时/125个",
    seconds: 1 * 60 * 60,
    count: 125,
  },
  {
    label: "2小时/200个",
    seconds: 2 * 60 * 60,
    count: 200,
  },
];

/** @description 夺宝补给每日上限额度 */
export const LOTTERY_SUPPLY_LIMIT = 5;

/** @description 夺宝石周卡赠送道具数量 */
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
export const TASK_LIST: () => TaskType[] = () => [
  {
    id: "de89",
    type: "DAILY",
    label: "在线奖励",
    desc: "在线时间超过10分钟",
    receive: false,
    props: [
      {
        key: "GOLD",
        num: 100,
      },
      {
        key: "DIAMOND",
        num: 50,
      },
    ],
    schedule: [
      {
        label: "今日已在线",
        unit: "(分钟)",
        value: 0,
        total: 10,
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
        key: "GOLD",
        num: 100,
      },
      {
        key: "DIAMOND",
        num: 50,
      },
    ],
    schedule: [
      {
        label: "今日已消费金币",
        unit: "(次)",
        value: 0,
        total: 1,
      },
      {
        label: "今日已消费钻石",
        unit: "(次)",
        value: 0,
        total: 1,
      },
    ],
  },
  {
    id: "mx25",
    type: "DAILY",
    label: "每日夺宝",
    desc: "完成5次英雄夺宝和皮肤夺宝",
    receive: false,
    props: [
      {
        key: "HERO_LOTTERY_STONE",
        num: 5,
      },
      {
        key: "SKIN_LOTTERY_STONE",
        num: 5,
      },
    ],
    schedule: [
      {
        label: "今日英雄夺宝",
        unit: "(次)",
        value: 0,
        total: 5,
      },
      {
        label: "今日皮肤夺宝",
        unit: "(次)",
        value: 0,
        total: 5,
      },
    ],
  },
  {
    id: "r88v",
    type: "DAILY",
    label: "双倍的诱惑",
    desc: "使用一次双倍金币卡和双倍经验卡",
    receive: false,
    props: [
      {
        key: "GOLD",
        num: 100,
      },
      {
        key: "DIAMOND",
        num: 50,
      },
    ],
    schedule: [
      {
        label: "今日已使用双倍金币卡",
        unit: "(次)",
        value: 0,
        total: 1,
      },
      {
        label: "今日已使用双倍经验卡",
        unit: "(次)",
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
    props: [
      {
        key: "HERO_LOTTERY_COIN",
        num: 5,
      },
      {
        key: "SKIN_LOTTERY_COIN",
        num: 5,
      },
    ],
    schedule: [
      {
        label: "今日英雄夺宝补给领取",
        unit: "(次)",
        value: 0,
        total: 1,
      },
      {
        label: "今日皮肤夺宝补给领取",
        unit: "(次)",
        value: 0,
        total: 1,
      },
    ],
  },
  {
    id: "d1b7",
    type: "DAILY",
    label: "英雄夺宝达人",
    desc: "消耗完今日赠送的英雄夺宝币和夺宝石",
    receive: false,
    path: ROUTE_PATH.HERO_LOTTERY,
    props: [
      {
        key: "HERO_LOTTERY_COIN",
        num: 5,
      },
      {
        key: "HERO_LOTTERY_STONE",
        num: 5,
      },
    ],
    schedule: [
      {
        label: "今日已消耗夺宝币",
        unit: "(枚)",
        value: 0,
        total: 25,
      },
      {
        label: "今日已消耗夺宝石",
        unit: "(个)",
        value: 0,
        total: 25,
      },
    ],
  },
  {
    id: "q35i",
    type: "DAILY",
    label: "皮肤夺宝达人",
    desc: "消耗完今日赠送的皮肤夺宝币和夺宝石",
    receive: false,
    path: ROUTE_PATH.SKIN_LOTTERY,
    props: [
      {
        key: "SKIN_LOTTERY_COIN",
        num: 5,
      },
      {
        key: "SKIN_LOTTERY_STONE",
        num: 5,
      },
    ],
    schedule: [
      {
        label: "今日已消耗夺宝币",
        unit: "(枚)",
        value: 0,
        total: 25,
      },
      {
        label: "今日已消耗夺宝石",
        unit: "(个)",
        value: 0,
        total: 25,
      },
    ],
  },
  {
    id: "o1u8",
    type: "DAILY",
    label: "免费英雄夺宝石",
    desc: "通过英雄夺宝补给站获取25个英雄夺宝石",
    receive: false,
    path: ROUTE_PATH.HERO_LOTTERY,
    props: [
      {
        key: "HERO_LOTTERY_COIN",
        num: 5,
      },
      {
        key: "HERO_LOTTERY_STONE",
        num: 5,
      },
    ],
    schedule: [
      {
        label: "今日已获取夺宝石",
        unit: "(个)",
        value: 0,
        total: 25,
      },
    ],
  },
  {
    id: "vk13",
    type: "DAILY",
    label: "免费皮肤夺宝石",
    desc: "通过皮肤夺宝补给站获取25个皮肤夺宝石",
    receive: false,
    path: ROUTE_PATH.SKIN_LOTTERY,
    props: [
      {
        key: "SKIN_LOTTERY_COIN",
        num: 5,
      },
      {
        key: "SKIN_LOTTERY_STONE",
        num: 5,
      },
    ],
    schedule: [
      {
        label: "今日已获取夺宝石",
        unit: "(个)",
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
        key: "HERO_DEBRIS",
        num: 5,
      },
      {
        key: "SKIN_DEBRIS",
        num: 10,
      },
    ],
    schedule: [
      {
        label: "本周已在线",
        unit: "(分钟)",
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
        key: "HERO_TREASURE",
        num: 3,
      },
      {
        key: "SKIN_BRAVE_TREASURE",
        num: 4,
      },
      {
        key: "SKIN_EPIC_TREASURE",
        num: 3,
      },
      {
        key: "SKIN_LEGEND_TREASURE",
        num: 1,
      },
      {
        key: "SKIN_LIMIT_TREASURE",
        num: 2,
      },
    ],
    schedule: [
      {
        label: "本周已登录",
        unit: "(天)",
        value: 0,
        total: 7,
      },
    ],
  },
  {
    id: "a6b9",
    type: "WEEKLY",
    label: "天天领取夺宝石",
    desc: "使用一次英雄夺宝石周卡和皮肤夺宝石周卡",
    receive: false,
    path: ROUTE_PATH.PROP_SHOP,
    props: [
      {
        key: "GUESS_CARD",
        num: 10,
      },
    ],
    schedule: [
      {
        label: "本周英雄夺宝石周卡",
        unit: "(次)",
        value: 0,
        total: 1,
      },
      {
        label: "本周皮肤夺宝石周卡",
        unit: "(次)",
        value: 0,
        total: 1,
      },
    ],
  },
  {
    id: "pc22",
    type: "WEEKLY",
    label: "一块都没有了",
    desc: "两次用完所有英雄或皮肤夺宝石补给站的额度",
    receive: false,
    props: [
      {
        key: "HERO_LOTTERY_STONE",
        num: 100,
      },
      {
        key: "SKIN_LOTTERY_STONE",
        num: 100,
      },
    ],
    schedule: [
      {
        label: "本周用完某日英雄或皮肤夺宝石补给站额度",
        unit: "(次)",
        value: 0,
        total: 2,
      },
    ],
  },
  {
    id: "om70",
    type: "WEEKLY",
    label: "夺宝狂魔",
    desc: "连续一周消耗完每日赠送的夺宝币",
    receive: false,
    props: [
      {
        key: "HERO_DEBRIS",
        num: 10,
      },
      {
        key: "SKIN_DEBRIS",
        num: 20,
      },
    ],
    schedule: [
      {
        label: "本周消耗英雄夺宝币",
        unit: "(枚)",
        value: 0,
        total: 25 * 7,
      },
      {
        label: "本周消耗皮肤夺宝币",
        unit: "(枚)",
        value: 0,
        total: 25 * 7,
      },
    ],
  },
];

/** @description 今日及本周任务列表键值匹配 */
export const TASK_KV_LIST: () => TaskSchedule[] = () => [
  {
    once: false,
    taskId: "de89",
    data: [{ key: "today_online_duration", label: "今日已在线" }],
  },
  {
    once: true,
    taskId: "qw27",
    data: [
      { key: "today_gold_consume", label: "今日已消费金币" },
      { key: "today_diamond_consume", label: "今日已消费钻石" },
    ],
  },
  {
    once: false,
    taskId: "mx25",
    data: [
      { key: "today_hero_lottery", label: "今日英雄夺宝" },
      { key: "today_skin_lottery", label: "今日皮肤夺宝" },
    ],
  },
  {
    once: true,
    taskId: "r88v",
    data: [
      { key: "today_double_gold_card", label: "今日已使用双倍金币卡" },
      { key: "today_double_exp_card", label: "今日已使用双倍经验卡" },
    ],
  },
  {
    once: true,
    taskId: "sp37",
    data: [
      { key: "today_hero_supply", label: "今日英雄夺宝补给领取" },
      { key: "today_skin_supply", label: "今日皮肤夺宝补给领取" },
    ],
  },
  {
    once: false,
    taskId: "d1b7",
    data: [
      { key: "today_hero_coin", label: "今日已消耗夺宝币" },
      { key: "today_hero_stone", label: "今日已消耗夺宝石" },
    ],
  },
  {
    once: false,
    taskId: "q35i",
    data: [
      { key: "today_skin_coin", label: "今日已消耗夺宝币" },
      { key: "today_skin_stone", label: "今日已消耗夺宝石" },
    ],
  },
  {
    once: false,
    taskId: "o1u8",
    data: [{ key: "today_hero_supply", label: "今日已获取夺宝石" }],
  },
  {
    once: false,
    taskId: "vk13",
    data: [{ key: "today_skin_supply", label: "今日已获取夺宝石" }],
  },
  {
    once: false,
    taskId: "q20y",
    data: [{ key: "week_online_duration", label: "本周已在线" }],
  },
  { once: false, taskId: "a21l", data: [{ key: "week_login_day", label: "本周已登录" }] },
  {
    once: true,
    taskId: "a6b9",
    data: [
      { key: "week_hero_stone_card", label: "本周英雄夺宝石周卡" },
      { key: "week_skin_stone_card", label: "本周皮肤夺宝石周卡" },
    ],
  },
  {
    once: false,
    taskId: "pc22",
    data: [{ key: "week_zero_supply", label: "本周用完某日英雄或皮肤夺宝石补给站额度" }],
  },
  {
    once: false,
    taskId: "om70",
    data: [
      { key: "week_hero_coin", label: "本周消耗英雄夺宝币" },
      { key: "week_skin_coin", label: "本周消耗皮肤夺宝币" },
    ],
  },
];

/** @description 每日竞猜限制次数 */
export const GUESS_COUNT_LIMIT = 25;

/** @description 跳跳币需要跳跃领取的次数 */
export const JUMP_COIN_RECEIVE_CLAIM = 5;

/** @description 竞猜币答题奖励区间 */
export const GUESS_COIN_REWARD_RANGE = [24, 75];
