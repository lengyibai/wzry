/** @description: 装备信息 */
declare namespace Equip {
  /** @description: 装备数据 */
  interface Data {
    id: number; //标识符
    level: number; //等级
    num: number; //当前列第几个
    price: number; //价格
    type: string; //类型
    name: string; //名称
    icon: string; //图标
    note: string; //备注
    desc: string; //简述
    effect: Effect[]; //效果
    motivation: Motivation[]; //动机
  }

  /** @description: 装备效果 */
  interface Effect {
    name: string; //名称
    num: number; // +增益量
  }

  /** @description: 被动/主动信息 */
  interface Motivation {
    type: boolean | string; //主/被动
    name: string; //名称
    desc: string; //描述
    time: number; //冷却时间
    note: string; //备注
  }

  /** @description: 合成 */
  interface Synthetic {
    id: number;
    name: string;
    to?: { id: number; name: string }[];
    need?: { id: number; name: string }[];
  }
}

/** @description: 铭文信息 */
declare namespace Epigraph {
  /** @description: 铭文数据 */
  interface Data {
    id: number;
    name: string; //名称
    type: string[]; //类型
    img: string; //图标
    effect: EpigraphEffect[]; //效果
  }

  /** @description: 铭文效果 */
  interface EpigraphEffect {
    type: string; //效果类型
    num: string; // +增益值
  }
}
