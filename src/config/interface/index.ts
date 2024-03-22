export interface GamePropValue {
  /** 道具名称 */
  label: string;
  /** 道具键名 */
  key: Game.PropKey;
  /** 道具图标 */
  icon: string;
  /** 道具描述 */
  desc: string;
}

/** @description 道具信息 */
export type GameProp = Record<Game.PropKey, GamePropValue>;

/** @description 商品信息 */
export interface GoodsInfo {
  /** 购买方式 */
  way: "GOLD" | "DIAMOND";
  /** 商品详情 */
  data: GamePropValue;
  /** 价格 */
  price: number;
  /** 购买数量 */
  num: number;
}

/** @description 秘宝概率分配 */
export type TreasureChance = Partial<
  Record<
    Game.PropKey,
    {
      /** 分布数量 */
      count: number;
      /** 道具数量 */
      num: number;
      /** 道具数量 */
      key: Game.PropKey;
    }
  >
>;

/** @description 道具键名对应的埋点键名 */
export type PropRelateMarker = Partial<
  Record<Game.PropKey, keyof Global.UserData["behaviorMarker"]>
>;
