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

/** @description 商品信息 */
export interface GoodsInfo {
  /** 购买方式 */
  way: "GOLD" | "DIAMOND";
  /** 商品Key */
  key: Game.PropKey;
  /** 价格 */
  price: number;
  /** 购买数量 */
  num: number;
}

/** @description 秘宝概率分配 */
export type TreasureChance = Partial<
  Record<
    string,
    {
      /** 分布数量 */
      count: number;
      /** 道具数量 */
      num: number;
      /** 道具Key */
      key: Game.PropKey;
    }
  >
>;

/** @description 任务进度类型 */
export interface TaskSchedule {
  /** 任务列表单个任务ID */
  taskId: string;
  /** 任务进度是否为单次，而不是累加 */
  once: boolean;
  data: {
    /** 任务列表单个任务下的子任务需要匹配的任务状态Key，来获取任务状态数据 */
    key: keyof Game.Task;
    /** 任务列表单个任务下的子任务的标题 */
    label: string;
  }[];
}

/** @description 道具键名对应的埋点键名 */
export type PropRelateMarker = Partial<Record<Game.PropKey, keyof User.Data["behaviorMarker"]>>;

/** @description 埋点状态Key */
export type MarkerStatusKey =
  | "ONLINE_TIME"
  | "VISIT_DAY"
  | "HERO_LOTTERY_COUNT"
  | "SKIN_LOTTERY_COUNT"
  | "POSTER_GUESS_COUNT"
  | "POSTER_GUESS_WRONG_COUNT"
  | "SKILL_GUESS_COUNT"
  | "SKILL_GUESS_WRONG_COUNT";

/** @description 状态对应的埋点键名 */
export type StatusRelateMarker = Partial<
  Record<MarkerStatusKey, keyof User.Data["behaviorMarker"]>
>;

/** @description 任务类型 */
export interface TaskType {
  /** 任务ID */
  id: string;
  /** 任务类型 */
  type: "DAILY" | "WEEKLY";
  /** 任务标题 */
  label: string;
  /** 任务描述 */
  desc: string;
  /** 任务进度数量 */
  schedule: {
    /** 进度描述 */
    label: string;
    /** 进度单位 */
    unit: string;
    /** 当前完成 */
    value: number;
    /** 任务目标 */
    total: number;
  }[];
  /** 是否已领取奖励 */
  receive: boolean;
  /** 点击前往时跳转的路由地址，如果没有则隐藏前往按钮 */
  path?: string;
  /** 奖励道具 */
  props: {
    /** 道具键名 */
    key: Game.PropKey;
    /** 道具数量 */
    num: number;
  }[];
}

/** @description 乂宝部件键值信息列表 */
export type YiBaoPartKeyInfo = Record<
  string,
  { type: Game.YiBao.StyleType; name: string; price: string }
>;
