/** @description 全局类型 */
declare namespace Game {
  /** @description 英雄相关 */
  namespace Hero {
    /** @description 英雄图片 */
    type Image = Pick<Data, "id" | "cover" | "coverBlur" | "poster" | "posterBlur" | "posterBig">;

    /** @description 职业类型 */
    type Profession = "全部" | "坦克" | "战士" | "刺客" | "法师" | "射手" | "辅助";

    /** @description 主要数据 */
    interface Data {
      /** 英雄id */
      id: number;
      /** 攻击 */
      attack: number;
      /** 难度 */
      difficulty: number;
      /** 增益 */
      effect: number;
      /** 生存 */
      survival: number;
      /** 阵营 */
      camp: string;
      /** 头像 */
      avatar: string;
      /** 封面 */
      cover: string;
      /** 小图模糊加载 */
      coverBlur: string;
      /** 海报 */
      poster: string;
      /** 小图模糊加载 */
      posterBlur: string;
      /** 海报大图 */
      posterBig: string;
      /** 身高 */
      height: number;
      /** 身份 */
      identity: string;
      /** 区域 */
      location: string;
      /** 代号 */
      mark: string;
      /** 英雄名称 */
      name: string;
      /** 时期 */
      period: string;
      /** 种族 */
      race: string;
      /** 技能消耗单位 */
      skillUnit: string;
      /** 性别 */
      gender: GenderText;
      /** 职业 */
      profession: Profession[];
      /** 特长 */
      specialty: string[];
      /** 关系数量 */
      relationCount: number;
      /** 皮肤数量 */
      skinCount: number;
      /** 技能列表 */
      skills: Skill[][];
    }

    /** @description 英雄详情数据 */
    interface Detail extends Data {
      /** 皮肤 */
      skins: Skin[];
      /** 关系表 */
      relationships: RelationType[];
    }

    /** @description 语音字列表 */
    type Voices = Remote.Voice.Data;

    /** @description 技能信息 */
    type Skill = Remote.Skill.Info;

    /** @description 返回的技能 */
    interface SkillParams {
      /** 技能id */
      id: number;
      /** 消耗单位 */
      unit: string;
      /** 技能列表 */
      skills: Skill[][];
    }

    /** @description 技能类型 */
    interface SkillType {
      /** 类型id */
      id: number;
      /** 类型名 */
      name: string;
    }

    /** @description 技能键 */
    interface SkillKey {
      /** 生存能力 */
      survival: string;
      /** 攻击伤害 */
      attack: string;
      /** 技能效果 */
      effect: string;
      /** 上手难度 */
      difficulty: string;
    }

    /** @description 关系信息 */
    interface Relationship {
      /** 英雄id */
      id: number;
      /** 英雄名称 */
      name: string;
      /** 存在关系的英雄 */
      relationships: RelationType[];
    }

    /** @description 关系类型 */
    interface RelationType {
      /** 英雄id */
      id: number;
      /** 对应关系 */
      relation: string;
      /** 关系描述 */
      desc: string;
      /** 英雄名 */
      heroName: string;
      /** 英雄头像 */
      avatar: string;
    }

    /** @description 皮肤信息 */
    interface Skin {
      /** 皮肤ID */
      id: number;
      /** 所属英雄id */
      hero: number;
      /** 价格 */
      price: string;
      /** 皮肤类型链接图 */
      link: string;
      /** 皮肤类型ID */
      type: number;
      /** 皮肤类型名 */
      category: string;
      /** 性别 */
      gender: GenderText;
      /** 皮肤名称 */
      name: string;
      /** 备用皮肤名称 */
      skin_name?: string;
      /** 海报 */
      poster: string;
      /** 海报小图 */
      posterBlur: string;
      /** 海报大图 */
      posterBig: string;
      /** 封面 */
      cover: string;
      /** 头像 */
      avatar: string;
      /** 英雄名称 */
      heroName: string;
      /** 备用英雄名称 */
      hero_name?: string;
      /** 职业 */
      profession: Profession[];
    }

    /** @description 英雄皮肤图片 */
    interface SkinImage {
      /** 英雄id */
      id: number;
      skins: Pick<Skin, "id" | "avatar" | "poster" | "cover" | "posterBlur" | "posterBig">[];
    }

    /** @description 皮肤类型 */
    interface SkinType {
      /** 类型id */
      id: number;
      /** 类型名 */
      name: string;
      /** 类型图片 */
      link: string;
    }

    /** @description 英雄图集列表 */
    interface Atlas
      extends Pick<
        Data,
        | "id"
        | "name"
        | "gender"
        | "profession"
        | "poster"
        | "cover"
        | "posterBlur"
        | "posterBig"
        | "coverBlur"
      > {
      /** 皮肤图集 */
      skins: Pick<Skin, "id" | "name" | "poster" | "cover" | "posterBlur" | "posterBig">[];
    }

    /** @description 独立图集类型 */
    interface AloneAtlas
      extends Pick<
        Data,
        | "id"
        | "cover"
        | "poster"
        | "name"
        | "profession"
        | "gender"
        | "posterBig"
        | "posterBlur"
        | "coverBlur"
      > {
      /** 图集类型 */
      type: "HERO" | "SKIN";
      /** 英雄名 */
      heroName: string;
    }
  }

  /** @description 装备相关 */
  namespace Equip {
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

    /** @description 单个装备合成表 */
    type Synthetic = Remote.Equip.Synthetic;
  }

  /** @description 铭文相关 */
  namespace Epigraph {
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

  /** @description 性别 */
  type GenderId = 0 | 1 | 2;

  /** @description 性别名 */
  type GenderText = "男" | "女";
}
