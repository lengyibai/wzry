export interface GamePropValue {
  /** 道具名称 */
  label: string;
  /** 道具键名 */
  key: Game.PropKey;
  /** 道具图标名 */
  iconName: string;
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

/** @description 任务类型 */
export interface TaskType {
  /** 任务ID */
  id: string;
  /** 任务标题 */
  label: string;
  /** 任务描述 */
  desc: string;
  /** 任务进度数量 */
  schedule: number;
  /** 任务相关数量总数 */
  total: number;
  /** 是否已领取奖励 */
  receive: boolean;
  /** 点击前往时跳转的路由地址，如果没有则隐藏前往按钮 */
  path?: string;
  /** 奖励道具 */
  props: {
    /** 道具键名 */
    type: Game.PropKey;
    /** 道具数量 */
    num: number;
  }[];
}
