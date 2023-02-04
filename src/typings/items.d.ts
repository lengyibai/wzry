/** 装备信息 */
declare namespace Equip {
  /** 装备数据 */
  interface Data {
    /** 标识符 */
    id: number;
    /** 等级 */
    level: number;
    /** 当前列第几个 */
    num: number;
    /** 价格 */
    price: number;
    /** 类型 */
    type: Category;
    /** 名称 */
    name: string;
    /** 图标 */
    icon: string;
    /** 备注 */
    note: string;
    /** 简述 */
    desc: string;
    /** 效果 */
    effect: Effect[];
    /** 动机 */
    motivation: Motivation[];
  }

  /** 装备类型 */
  type Category = "攻击" | "法术" | "防御" | "移动" | "打野" | "游走";

  /** 装备效果 */
  interface Effect {
    /** 名称 */
    name: string;
    /** 增益量 */
    num: number;
  }

  /** 被动/主动信息 */
  interface Motivation {
    /** 主/被动 */
    type: boolean | string;
    /** 名称 */
    name: string;
    /** 描述 */
    desc: string;
    /** 冷却时间 */
    time: number;
    /** 备注 */
    note: string;
  }

  /** 单个装备合成表 */
  interface Synthetic {
    /** 装备id */
    id: number;
    /** 装备名称 */
    name: string;
    /** 可合成的装备 */
    to?: { id: number; name: string }[];
    /** 需要合成的装备 */
    need?: { id: number; name: string }[];
  }
}

/** 铭文信息 */
declare namespace Epigraph {
  /** 铭文数据 */
  interface Data {
    /** 铭文id */
    id: number;
    /** 名称 */
    name: string;
    /** 类型 */
    type: string[];
    /** 图标 */
    img: string;
    /** 效果 */
    effect: EpigraphEffect[];
  }

  /** 铭文类型 */
  type Category = "全部" | "攻击" | "生命" | "防御" | "功能" | "吸血" | "攻速" | "暴击" | "穿透";

  /** 铭文效果 */
  interface EpigraphEffect {
    /** 效果类型 */
    type: string;
    /** 增益值 */
    num: string;
  }
}
