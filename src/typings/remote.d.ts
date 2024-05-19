/** @description 远程文件数据类型 */
declare namespace Remote {
  /** @description 英雄ID */
  interface Id {
    /** 英雄id */
    id: number;
  }

  /** @description 英雄相关 */
  namespace Hero {
    /** @description 英雄价格列表 */
    interface Price extends Id {
      /** 英雄价格 */
      value: string;
    }

    /** @description 英雄属性列表 */
    interface Attr extends Id {
      /** 生存能力 */
      survival: number;
      /** 攻击伤害 */
      attack: number;
      /** 技能效果 */
      effect: number;
      /** 上手难度 */
      difficulty: number;
    }

    /** @description 英雄阵营列表 */
    interface Camp extends Id {
      /** 英雄阵营ID */
      value: number;
    }

    /** @description 英雄性别列表 */
    interface Gender extends Id {
      /** 英雄性别 */
      value: Game.GenderText;
    }

    /** @description 英雄头像列表 */
    interface Avatar extends Id {
      /** 英雄头像 */
      value: string;
    }

    /** @description 英雄身高列表 */
    interface Height extends Id {
      /** 英雄身高 */
      value: number;
    }

    /** @description 英雄简述列表 */
    interface Resume extends Id {
      /** 英雄简述 */
      value: string;
    }

    /** @description 英雄身份列表 */
    interface Identity extends Id {
      /** 英雄身份 */
      value: string;
    }

    /** @description 英雄图片列表 */
    interface Image extends Id {
      /** 海报（标准大小） */
      poster: string;
      /** 海报（模糊小图） */
      posterBlur: string;
      /** 海报（4k大图） */
      posterBig: string;
      /** 竖版封面（标准大小） */
      cover: string;
      /** 竖版封面（模糊小图） */
      coverBlur: string;
    }

    /** @description 英雄定位列表 */
    interface Location extends Id {
      /** 英雄定位 */
      value: string;
    }

    /** @description 英雄名列表 */
    interface Mark extends Id {
      /** 英雄代号 */
      value: string;
    }

    /** @description 英雄名列表 */
    interface Name extends Id {
      /** 英雄名 */
      value: string;
    }

    /** @description 英雄时期列表 */
    interface Period extends Id {
      /** 英雄时期ID */
      value: number;
    }

    /** @description 英雄名拼音列表 */
    interface Pinyin extends Id {
      /** 英雄名拼音 */
      value: string;
    }

    /** @description 英雄职业列表 */
    interface Profession extends Id {
      /** 英雄职业ID */
      value: number[];
    }

    /** @description 英雄种族列表 */
    interface Race extends Id {
      /** 英雄种族 */
      value: string;
    }

    /** @description 英雄关系列表 */
    interface Relationship extends Id {
      /** 英雄关系 */
      value: {
        /** 关系英雄id */
        id: number;
        /** 对应关系名称 */
        relation: string;
        /** 对应关系描述 */
        desc: string;
      }[];
    }

    /** @description 英雄技能单位列表 */
    interface SkillUnit extends Id {
      /** 英雄技能单位 */
      value: string;
    }

    /** @description 英雄皮肤列表 */
    interface Skin extends Id {
      /** 英雄皮肤id列表 */
      value: number[];
    }

    /** @description 英雄特长列表 */
    interface Specialty extends Id {
      /** 英雄特长列表 */
      value: string[];
    }
  }

  /** @description 技能相关 */
  namespace Skill {
    /** @description 单个技能信息 */
    interface Info {
      /** 冷却时间 */
      cd: number;
      /** 技能消耗 */
      consume: number;
      /** 技能名称 */
      name: string;
      /**技能描述 */
      desc: string;
      /** 技能图标 */
      img: string;
      /** 技能类型 */
      type: string[];
      /** 技能效果 */
      effect: {
        /** 效果名称 */
        name: string;
        /** 阶段值，百分比或数字 */
        phase: string[];
      }[];
    }
    /** @description 技能数据 */
    interface Data extends Id {
      /** 单位 */
      unit: string;
      /** 技能组，可为多套技能 */
      skills: Info[][];
    }
  }

  /** @description 皮肤相关 */
  namespace Skin {
    /** @description 皮肤所属英雄列表 */
    interface Hero {
      /** 皮肤id */
      id: number;
      /** 英雄id */
      value: number;
    }

    /** @description 皮肤图片列表 */
    interface Image {
      /** 皮肤id */
      id: number;
      /** 头像 */
      avatar: string;
      /** 海报 */
      poster: string;
      /** 海报模糊小图 */
      posterBlur: string;
      /** 海报4K图 */
      posterBig: string;
      /** 海报封面 */
      cover: string;
    }

    /** @description 皮肤名列表 */
    interface Name {
      /** 皮肤id */
      id: number;
      /** 皮肤名 */
      value: string;
    }

    /** @description 皮肤价格 */
    interface Price {
      /** 皮肤id */
      id: number;
      /** 皮肤价格 */
      value: string;
      /** 兑换所需皮肤碎片 */
      debris?: string;
    }

    /** @description 皮肤类型 */
    interface Type {
      /** 皮肤id */
      id: number;
      /** 皮肤类型 */
      value: number;
    }
  }

  /** @description 装备相关 */
  namespace Equip {
    /** @description 装备ID */
    interface Id {
      /** 装备ID */
      id: number;
    }

    /** @description 装备简述列表 */
    interface Desc extends Id {
      /** 装备简述 */
      value: string;
    }

    /** @description 装备效果 */
    interface Effect extends Id {
      value: {
        /** 效果ID */
        name: number;
        /** 阶段值，百分比或数字 */
        num: string;
      }[];
    }

    /** @description 装备图片列表 */
    interface Image extends Id {
      /** 装备图标 */
      icon: string;
      /** 装备模糊图标 */
      iconBlur: string;
    }

    /** @description 装备等级列表 */
    interface Level extends Id {
      /** 装备等级 */
      value: number;
    }

    /** @description 装备动机列表 */
    interface Motivation extends Id {
      /** 动机列表 */
      value: {
        /** 动机类型，主动或被动 */
        type: string;
        /** 动机名称 */
        name: string;
        /** 动机描述 */
        desc: string;
        /** 备注 */
        note: string;
        /** 冷却时间 */
        time: string;
      }[];
    }

    /** @description 装备名称列表 */
    interface Name extends Id {
      /** 装备名称 */
      value: string;
    }

    /** @description 装备备注列表 */
    interface Note extends Id {
      /** 装备备注 */
      value: string;
    }

    /** @description 装备价格 */
    interface Price extends Id {
      /** 装备价格 */
      value: number;
    }

    /** @description 装备合成 */
    interface Synthetic extends Id {
      /** 装备名称 */
      name: string;
      /** 需要的材料 */
      need?: Name[];
      /** 可合成  */
      to?: Name[];
    }

    /** @description 装备类型列表 */
    interface Type extends Id {
      /** 装备类型 */
      value: number;
    }
  }

  /** @description 铭文相关 */
  namespace Epigraph {
    /** @description 铭文ID */
    interface Id {
      /** 铭文ID */
      id: number;
    }

    /** @description 铭文效果 */
    interface Effect extends Id {
      /** 阶段值，百分比或数字 */
      value: {
        /** 铭文类型 */
        type: number;
        /** 效果值 */
        num: string;
      }[];
    }

    /** @description 铭文颜色 */
    interface Color extends Id {
      /** 铭文颜色 */
      value: "BLUE" | "GREEN" | "RED";
    }

    /** @description 铭文图片 */
    interface Image extends Id {
      /** 铭文图标 */
      img: string;
      /** 铭文模糊小图 */
      imgBlur: string;
    }

    /** @description 铭文名称 */
    interface Name extends Id {
      /** 铭文名称 */
      value: string;
    }

    /** @description 铭文类型 */
    interface Type extends Id {
      /** 铭文类型 */
      value: number[];
    }
  }

  /** @description 语音相关 */
  namespace Voice {
    /** @description 语音数据 */
    interface Data {
      /** 语音所属皮肤名称 */
      name: string;
      /** 语音列表 */
      voice: {
        /** 语音文字 */
        text: string;
        /** 语音链接 */
        link: string;
      }[];
    }
  }

  /** @description 类型表相关 */
  namespace DataType {
    /** @description 阵营类型表 */
    interface Camp {
      /** 标识 */
      id: number;
      /** 阵营类型 */
      value: string;
    }

    /** @description 铭文类型表 */
    interface Epigraph {
      /** 标识 */
      id: number;
      /** 铭文类型 */
      value: "全部" | "攻击" | "生命" | "防御" | "功能" | "吸血" | "攻速" | "暴击" | "穿透";
    }

    /** @description 铭文效果类型表 */
    interface EpigraphEffect {
      /** 标识 */
      id: number;
      /** 铭文效果类型 */
      value: string;
    }

    /** @description 装备类型表 */
    interface Equip {
      /** 标识 */
      id: number;
      /** 装备类型 */
      value: Game.Equip.Category;
    }

    /** @description 装备效果类型表 */
    interface EquipEffect {
      /** 标识 */
      id: number;
      /** 装备效果类型 */
      value: string;
    }

    /** @description 英雄定位类型表 */
    interface Location {
      /** 标识 */
      id: number;
      /** 英雄定位类型 */
      value: string;
    }

    /** @description 英雄时期类型表 */
    interface Period {
      /** 标识 */
      id: number;
      /** 英雄时期 */
      value: string;
    }

    /** @description 英雄职业类型表 */
    interface Profession {
      /** 职业ID */
      id: number;
      /** 英雄职业类型 */
      value: "坦克" | "战士" | "刺客" | "法师" | "射手" | "辅助";
    }

    /** @description 英雄种族类型表 */
    interface Race {
      /** 标识 */
      id: number;
      /** 英雄种族类型 */
      value: string;
    }

    /** @description 皮肤类型表 */
    interface Skin {
      /** 标识 */
      id: number;
      /** 皮肤类型名 */
      name: string;
      /** 类型图标链接 */
      link: string;
      /** 皮肤别名，用于筛选 */
      alias: string;
      /** 皮肤类型排序，用于筛选列表排序 */
      sort: number;
    }

    /** @description 英雄技能类型表 */
    interface Skill {
      /** 标识 */
      id: number;
      /** 英雄技能类型 */
      value: string;
    }

    /** @description 英雄特长类型表 */
    interface Specialty {
      /** 标识 */
      id: number;
      /** 英雄特长类型 */
      value: string;
    }
  }
}
