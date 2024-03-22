import { PropRelateMarker } from "../interface";

/** @description 埋点中文名 */
export const MARKER_LABEL: Record<keyof Global.UserData["behaviorMarker"], string> = {
  nx46: "累计在线时长",
  mm27: "累计访问天数",
  lw77: "累计获取金币数量",
  b3q5: "累计消耗金币数量",
  vi12: "累计通过夺宝获取的金币数量",
  vg41: "累计通过开宝箱获取的金币数量",
  oa04: "累计获取钻石数量",
  kt48: "累计消耗钻石数量",
  b61i: "累计通过购买获取的钻石数量",
  jw74: "累计通过夺宝获取的钻石数量",
  bd02: "累计通过开宝箱获取的钻石数量",
  bf56: "累计获取英雄碎片数量",
  ul23: "累计消耗英雄碎片数量",
  ek44: "累计通过购买获取的英雄碎片数量",
  rn28: "累计通过夺宝获取的英雄碎片数量",
  p3d7: "累计通过开宝箱获取的英雄碎片数量",
  tc01: "累计获取皮肤碎片数量",
  rj65: "累计消耗皮肤碎片数量",
  e8g6: "累计通过购买获取的皮肤碎片数量",
  zf36: "累计通过夺宝获取的皮肤碎片数量",
  h1v0: "累计通过开宝箱获取的皮肤碎片数量",
  nk61: "通过英雄升级赠送的皮肤碎片数量",
  xm99: "累计获取英雄一级经验宝箱数量",
  p26a: "累计消耗英雄一级经验宝箱数量",
  wj24: "累计通过购买获取的英雄一级经验数量",
  v1l1: "累计通过夺宝获取的英雄一级经验数量",
  xu73: "累计通过开宝箱获取的英雄一级经验数量",
  tp67: "累计获取英雄二级经验宝箱数量",
  wx77: "累计消耗英雄二级经验宝箱数量",
  b9u6: "累计通过购买获取的英雄二级经验数量",
  t22a: "累计通过夺宝获取的英雄二级经验数量",
  a2w5: "累计通过开宝箱获取的英雄二级数量",
  dw22: "累计获取英雄夺宝抵扣石数量",
  vq84: "累计消耗英雄夺宝抵扣石数量",
  rf21: "累计通过购买获取的英雄夺宝抵扣石数量",
  tk65: "累计通过开宝箱获取的英雄夺宝抵扣石数量",
  wm57: "累计获取皮肤夺宝抵扣石数量",
  z88m: "累计消耗皮肤夺宝抵扣石数量",
  dm42: "累计通过购买获取的皮肤夺宝抵扣石数量",
  m7g3: "累计通过开宝箱获取的皮肤夺宝抵扣石数量",
  d1f9: "累计英雄夺宝次数",
  i71y: "累计皮肤夺宝次数",
  p2i5: "累计获取王者水晶数量",
  z4l8: "累计消耗王者水晶数量",
  i7k8: "累计获取荣耀水晶数量",
  le99: "累计消耗荣耀水晶数量",
  cs91: "累计获取伴生皮肤卡数量",
  rm08: "累计消耗伴生皮肤卡数量",
  j1p0: "累计获取英雄秘宝数量",
  fh87: "累计消耗英雄秘宝数量",
  pv44: "累计获取限定皮肤秘宝数量",
  pe35: "累计消耗限定皮肤秘宝数量",
  j9t8: "累计获取勇者皮肤秘宝数量",
  qg40: "累计消耗勇者皮肤秘宝数量",
  vp92: "累计获取史诗皮肤秘宝数量",
  bj32: "累计消耗史诗皮肤秘宝数量",
  hk57: "累计获取传说皮肤秘宝数量",
  zx89: "累计消耗传说皮肤秘宝数量",
  kv13: "累计获取自选英雄宝箱数量",
  ip47: "累计消耗自选英雄宝箱数量",
  mq70: "累计获取自选勇者皮肤宝箱数量",
  gq13: "累计消耗自选勇者皮肤宝箱数量",
  j7a9: "累计获取自选史诗皮肤宝箱数量",
  r6u2: "累计消耗自选史诗皮肤宝箱数量",
  b66u: "累计获取自选传说皮肤宝箱数量",
  ua59: "累计消耗自选传说皮肤宝箱数量",
  t84m: "累计获取自选限定皮肤宝箱数量",
  pm59: "累计消耗自选限定皮肤宝箱数量",
} as const;

/** @description 道具增加埋点key（任务） */
export const MARKER_PROP_KEY_TASK_ADD: PropRelateMarker = {};

/** @description 道具增加埋点key（商店） */
export const MARKER_PROP_KEY_SHOP_ADD: PropRelateMarker = {
  DIAMOND: "b61i",
  HERO_DEBRIS: "ek44",
  SKIN_DEBRIS: "e8g6",
  HERO_EXP_ONE: "wj24",
  HERO_EXP_TWO: "b9u6",
  HERO_LOTTERY_STONE: "rf21",
  SKIN_LOTTERY_STONE: "dm42",
};

/** @description 道具增加埋点key（夺宝） */
export const MARKER_PROP_KEY_LOTTERY_ADD: PropRelateMarker = {
  GOLD: "vi12",
  DIAMOND: "jw74",
  HERO_DEBRIS: "rn28",
  SKIN_DEBRIS: "zf36",
  HERO_EXP_ONE: "v1l1",
  HERO_EXP_TWO: "t22a",
  KING_CRYSTAL: "p2i5",
  HONOR_CRYSTAL: "i7k8",
  HERO_TREASURE: "j1p0",
  SKIN_BRAVE_TREASURE: "j9t8",
  SKIN_EPIC_TREASURE: "vp92",
  SKIN_LEGEND_TREASURE: "hk57",
  SKIN_LIMIT_TREASURE: "pv44",
};

/** @description 道具增加埋点key（开箱） */
export const MARKER_PROP_KEY_CHEST_ADD: PropRelateMarker = {
  GOLD: "vg41",
  DIAMOND: "bd02",
  HERO_DEBRIS: "p3d7",
  SKIN_DEBRIS: "h1v0",
  HERO_EXP_ONE: "xu73",
  HERO_EXP_TWO: "a2w5",
  HERO_LOTTERY_STONE: "tk65",
  SKIN_LOTTERY_STONE: "m7g3",
  HERO_CHEST_OPTIONAL: "kv13",
  SKIN_CHEST_BRAVE_OPTIONAL: "mq70",
  SKIN_CHEST_EPIC_OPTIONAL: "j7a9",
  SKIN_CHEST_LEGEND_OPTIONAL: "b66u",
  SKIN_CHEST_LIMIT_OPTIONAL: "t84m",
};

/** @description 道具增加埋点key（升级英雄） */
export const MARKER_PROP_KEY_UPGRADE_ADD: PropRelateMarker = {
  SKIN_CARD_INITIAL: "cs91",
  SKIN_DEBRIS: "nk61",
};

/** @description 道具增加埋点key（默认） */
export const MARKER_PROP_KEY_NORMAL_ADD: PropRelateMarker = {
  GOLD: "lw77",
  DIAMOND: "oa04",
  HERO_DEBRIS: "bf56",
  SKIN_DEBRIS: "tc01",
  HERO_EXP_ONE: "xm99",
  HERO_EXP_TWO: "tp67",
  HERO_LOTTERY_STONE: "dw22",
  SKIN_LOTTERY_STONE: "wm57",
};

/** @description 道具减少埋点key */
export const MARKER_PROP_KEY_SUB: PropRelateMarker = {
  GOLD: "b3q5",
  DIAMOND: "kt48",
  HERO_DEBRIS: "ul23",
  SKIN_DEBRIS: "rj65",
  HERO_EXP_ONE: "p26a",
  HERO_EXP_TWO: "wx77",
  HERO_LOTTERY_STONE: "vq84",
  SKIN_LOTTERY_STONE: "z88m",
  SKIN_CARD_INITIAL: "rm08",
  KING_CRYSTAL: "z4l8",
  HONOR_CRYSTAL: "le99",
  HERO_TREASURE: "fh87",
  SKIN_BRAVE_TREASURE: "qg40",
  SKIN_EPIC_TREASURE: "bj32",
  SKIN_LEGEND_TREASURE: "zx89",
  SKIN_LIMIT_TREASURE: "pe35",
  HERO_CHEST_OPTIONAL: "ip47",
  SKIN_CHEST_BRAVE_OPTIONAL: "gq13",
  SKIN_CHEST_EPIC_OPTIONAL: "r6u2",
  SKIN_CHEST_LEGEND_OPTIONAL: "ua59",
  SKIN_CHEST_LIMIT_OPTIONAL: "pm59",
};
