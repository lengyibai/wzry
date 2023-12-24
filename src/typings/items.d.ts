/** @description 装备信息 */
declare namespace Equip {
  /** @description 装备数据 */
  interface Data {
    /** 标识符 */
    id: number;
    /** 等级 */
    level: number;
    /** 价格 */
    price: number;
    /** 类型 */
    type: Category;
    /** 名称 */
    name: string;
    /** 图标 */
    icon: string;
    /** 小图标 */
    iconBlur: string;
    /** 备注 */
    note: string;
    /** 简述 */
    desc: string;
    /** 效果 */
    effect: Remote.Equip.Effect["value"];
    /** 动机 */
    motivation: Remote.Equip.Motivation["value"];
  }

  /** @description 装备类型 */
  type Category = "攻击" | "法术" | "防御" | "移动" | "打野" | "游走";

  /** @description 被动/主动信息 */
  type Motivation = Remote.Equip.Motivation;

  /** @description 单个装备合成表 */
  type Synthetic = Remote.Equip.Synthetic;
}

/** @description 铭文信息 */
declare namespace Epigraph {
  /** @description 铭文数据 */
  interface Data {
    /** 铭文id */
    id: number;
    /** 名称 */
    name: string;
    /** 类型 */
    type: Remote.DataType.Epigraph["value"][];
    /** 图标 */
    img: string;
    /** 小图标 */
    imgBlur: string;
    /** 效果 */
    effect: {
      /** 铭文类型 */
      type: string;
      /** 效果值 */
      num: string;
    }[];
  }

  /** @description 铭文类型 */
  type Category = "全部" | "攻击" | "生命" | "防御" | "功能" | "吸血" | "攻速" | "暴击" | "穿透";
}
