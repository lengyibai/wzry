import type { PropRelateMarker, StatusRelateMarker } from "../interface";

/** @description 埋点中文名 */
export const MARKER_LABEL: Record<keyof User.Data["behaviorMarker"], string> = {
  mc93: "累计在线时长-秒",
  tg73: "累计访问天数",
  d24r: "累计英雄夺宝次数",
  y8b2: "累计皮肤夺宝次数",
  h3t4: "累计消耗金币数量",
  cq65: "累计消耗钻石数量",
  vu33: "累计消耗英雄碎片数量",
  i0k4: "累计消耗皮肤碎片数量",
  iu48: "累计消耗英雄一级经验宝箱数量",
  nn05: "累计消耗英雄二级经验宝箱数量",
  ku27: "累计消耗英雄夺宝石数量",
  i87h: "累计消耗皮肤夺宝石数量",
  g45c: "累计消耗英雄夺宝币数量",
  al38: "累计消耗皮肤夺宝币数量",
  rj89: "累计消耗王者水晶数量",
  q9y1: "累计消耗荣耀水晶数量",
  er27: "累计消耗英雄夺宝周卡数量",
  ml55: "累计消耗皮肤夺宝周卡数量",
  e13s: "累计消耗双倍经验卡数量",
  c8k7: "累计消耗双倍金币卡数量",
  mh01: "累计消耗伴生皮肤卡数量",
  kj05: "累计消耗英雄秘宝数量",
  aw51: "累计消耗勇者皮肤秘宝数量",
  ez16: "累计消耗史诗皮肤秘宝数量",
  cz62: "累计消耗传说皮肤秘宝数量",
  cs01: "累计消耗限定皮肤秘宝数量",
  er08: "累计消耗随机英雄宝箱数量",
  q65b: "累计消耗自选英雄宝箱数量",
  k4f6: "累计消耗自选勇者皮肤宝箱数量",
  yq53: "累计消耗自选史诗皮肤宝箱数量",
  ag35: "累计消耗自选传说皮肤宝箱数量",
  cj13: "累计消耗自选限定皮肤宝箱数量",
  pa16: "累计消耗竞猜币数量",
  j7m4: "累计消耗竞猜券数量",
  my02: "累计消耗跳跳币数量",
  ks52: "累计海报竞猜次数",
  v87u: "累计海报竞猜答错次数",
  ht88: "累计技能竞猜次数",
  ff88: "累计技能竞猜答错次数",
} as const;

/** @description 状态埋点 */
export const MARKER_STATUS_KEY: StatusRelateMarker = {
  /** 累计在线时长-秒 */
  ONLINE_TIME: "mc93",
  /** 累计访问天数 */
  VISIT_DAY: "tg73",
  /** 累计英雄夺宝次数 */
  HERO_LOTTERY_COUNT: "d24r",
  /** 累计皮肤夺宝次数 */
  SKIN_LOTTERY_COUNT: "y8b2",
  /** 累计海报竞猜次数 */
  POSTER_GUESS_COUNT: "ks52",
  /** 累计海报竞猜答错次数 */
  POSTER_GUESS_WRONG_COUNT: "v87u",
  /** 累计技能竞猜次数 */
  SKILL_GUESS_COUNT: "ht88",
  /** 累计技能竞猜答错次数 */
  SKILL_GUESS_WRONG_COUNT: "ff88",
};

/** @description 道具消耗埋点key */
export const MARKER_PROP_KEY_SUB: PropRelateMarker = {
  GOLD: "h3t4",
  DIAMOND: "cq65",
  HERO_DEBRIS: "vu33",
  SKIN_DEBRIS: "i0k4",
  HERO_EXP_ONE: "iu48",
  HERO_EXP_TWO: "nn05",
  HERO_LOTTERY_STONE: "ku27",
  SKIN_LOTTERY_STONE: "i87h",
  HERO_LOTTERY_COIN: "g45c",
  SKIN_LOTTERY_COIN: "al38",
  KING_CRYSTAL: "rj89",
  HONOR_CRYSTAL: "q9y1",
  HERO_LOTTERY_WEEK: "er27",
  SKIN_LOTTERY_WEEK: "ml55",
  DOUBLE_EXP: "e13s",
  DOUBLE_GOLD: "c8k7",
  SKIN_CARD_INITIAL: "mh01",
  HERO_TREASURE: "kj05",
  SKIN_BRAVE_TREASURE: "aw51",
  SKIN_EPIC_TREASURE: "ez16",
  SKIN_LEGEND_TREASURE: "cz62",
  SKIN_LIMIT_TREASURE: "cs01",
  HERO_CHEST_RANDOM: "er08",
  HERO_CHEST_OPTIONAL: "q65b",
  SKIN_CHEST_BRAVE_OPTIONAL: "k4f6",
  SKIN_CHEST_EPIC_OPTIONAL: "yq53",
  SKIN_CHEST_LEGEND_OPTIONAL: "ag35",
  SKIN_CHEST_LIMIT_OPTIONAL: "cj13",
  GUESS_COIN: "pa16",
  GUESS_CARD: "j7m4",
  JUMP_COIN: "my02",
};
