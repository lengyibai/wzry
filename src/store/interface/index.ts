/** @description 英雄详情相关 */
export namespace HeroDetailStoreType {
  /** @description 滚动结束后触发函数组
   * @param hero_id 英雄id
   * @param skin_name 皮肤名称
   */
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
  /** @description 铭文数量信息 */
  export type Info = Record<
    number,
    {
      epigraph?: Game.Epigraph.Data;
      count: number;
    }
  >;

  /** @description 当前侧边栏显示状态 */
  export type SidebarStatus = "EFFECT" | "INVENTORY" | "SUIT";
}

/** @description 邮件相关 */
export namespace MailStoreType {
  export interface GiftMail {
    /** 邮件标题 */
    title: string;
    /** 邮件内容 */
    desc: string;
    /** 道具 */
    props: Game.Mail["props"];
  }
  export interface MsgMail {
    /** 邮件标题 */
    title: string;
    /** 邮件内容 */
    desc: string;
  }
}

/** @description 乂宝相关 */
export namespace YiBaoStoreType {
  /** @description 部件类型ID对应详情 */
  export type SuitDetail = Record<
    Game.YiBao.PartType,
    {
      /** 背景类型 COLOR-颜色背景 IMG-图片背景 */
      type: Game.YiBao.StyleType;
      /** 配置ID */
      id: string;
    }
  >;

  /** @description 部件颜色 */
  export interface PartColor {
    /** 圆环 */
    annulus: string;
    /** 天线 */
    antenna: string[];
    /** 腮红 */
    blush: string;
    /** 眼睛 */
    eye: string[];
    /** 嘴巴 */
    mouth: string[];
    /** 六面 */
    side: string[];
    /** 羽翅 */
    wing: string;
  }

  /** @description 部件贴图 */
  export interface PartTexture extends Partial<Record<Game.YiBao.PartType, any>> {
    /** 圆环 */
    annulus: string;
    /** 天线 */
    antenna: string;
    /** 羽翅 */
    wing: string;
    /** 六面 */
    side: {
      front: string;
      back: string;
      top: string;
      bottom: string;
      left: string;
      right: string;
    };
  }

  /** @description 选中的付费部件列表信息 */
  export type PayPartInfoList = Record<
    Game.YiBao.PartType,
    {
      /** ID */
      id: string;
      /** 价格 */
      price: string;
      /** 风格类型 */
      type: Game.YiBao.StyleType;
      /** 部件风格名称 */
      name: string;
    }
  >;
}

/** @description 埋点相关 */
export namespace MarkerStoreType {
  /** @description 埋点Key */
  export type MarkerKey = keyof User.Data["behaviorMarker"];
}
