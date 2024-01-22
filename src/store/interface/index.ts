/** @description 英雄详情相关 */
export namespace HeroDetailStoreType {
  /** @description 滚动结束后触发函数组 */
  export type SkinToggleFn = (hero_id: number, skin_name: string) => void;

  /** @description 皮肤切换后触发函数组 */
  export type ScrollFn = { name: string; fn: (pageName: string) => void }[];

  /** @description 当前悬浮显示的关系信息 */
  export interface RelationInfoType extends Game.Hero.RelationType {
    /** 对应关系英雄的回复 */
    reply: string;
    /** 对应关系 */
    replyRelation: string;
    /** 对应关系的性别 */
    replyGender: string;
  }
}

/** @description 装备相关 */
export namespace EquipStoreType {
  /** 装备Dom元素信息 */
  export type Element = {
    /** 装备名称 */
    name: string;
    /** 装备Dom元素 */
    el: HTMLElement | undefined;
    /** 装备id */
    id: number;
  };
}

/** @description 铭文相关 */
export namespace EpigraphCollocationStoreType {
  /** @description 三色铭文列表 */
  export type Colors = Record<Remote.Epigraph.Color["value"], Game.Epigraph.Data[] | undefined[]>;

  /** @description 铭文库存 */
  export type Inventory = Record<
    Remote.Epigraph.Color["value"],
    {
      epigraph: Game.Epigraph.Data;
      count: number;
    }[]
  >;

  /** @description 铭文数量信息 */
  export type Info = Record<
    number,
    {
      epigraph?: Game.Epigraph.Data;
      count: number;
    }
  >;

  /** @description 铭文套装 */
  export interface Suit {
    /** 标识符 */
    id: string;
    /** 套装名称 */
    label: string;
    /** 三色列表 */
    colors: Colors;
    /** 库存 */
    inventory: Inventory;
  }

  /** @description 当前侧边栏显示状态 */
  export type SidebarStatus = "EFFECT" | "INVENTORY" | "SUIT";
}
