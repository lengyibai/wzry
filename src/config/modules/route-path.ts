/** @description 鼠标悬浮提示 */
const ROUTE_PATH = {
  /** 登录页 */
  LOGIN: "/login",
  /** 英雄列表 */
  HERO: "/hero",
  /** 皮肤列表 */
  SKIN: "/skin",
  /** 图集列表 */
  SAVOR: "/savor",
  /** 装备列表 */
  EQUIP: "/equip",
  /** 铭文列表 */
  EPIGRAPH: "/epigraph",
  /** 背包列表 */
  KNAPSACK: "/knapsack",
  /** 乂宝 */
  YI_BAO: "/yibao",
  /** 英雄夺宝 */
  HERO_LOTTERY: "/lottery/hero",
  /** 皮肤夺宝 */
  SKIN_LOTTERY: "/lottery/skin",
  /** 英雄碎片兑换商店 */
  HERO_DEBRIS: "/shop/debris/hero",
  /** 皮肤碎片兑换商店 */
  SKIN_DEBRIS: "/shop/debris/skin",
  /** 王者水晶兑换商店 */
  KING_CRYSTAL: "/shop/crystal/king",
  /** 荣耀水晶兑换商店 */
  HONOR_CRYSTAL: "/shop/crystal/honor",
  /** 道具商店 */
  PROP_SHOP: "/shop/prop",
} as const;

export { ROUTE_PATH };
