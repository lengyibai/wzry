/** 英雄信息  */
declare namespace Hero {
  /** @description 主要数据 */
  interface Data extends Record<string, any> {
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
    /** 封面 */
    cover: string;
    /** 头像 */
    headImg: string;
    /** 身高 */
    height: number;
    /** 身份 */
    identity: string;
    /** 区域 */
    location: string;
    /** 代号 */
    mark: string;
    /** 名字 */
    name: string;
    /** 时期 */
    period: string;
    /** 海报 */
    poster: string;
    /** 种族 */
    race: string;
    /** 技能消耗单位 */
    skillUnit: string;
    /** 性别 */
    gender: "男" | "女";
    /** 职业 */
    profession: Profession[];
    /** 特长 */
    specialty: string[];
    /** 语音 */
    voices: Voice[];
    /** 技能 */
    skills: Skill[][];
    /** 皮肤 */
    skins: Skin[];
    /** 关系表 */
    relationships: RelationType[];
  }

  /** @description 职业类型 */
  type Profession = "全部" | "坦克" | "战士" | "刺客" | "法师" | "射手" | "辅助";

  /** @description 语音 */
  interface Voice {
    /** 语音文字 */
    text: string;
    /** 语音链接 */
    link: string;
  }

  /** @description 语音字列表 */
  interface Voices {
    /** 皮肤名 */
    name: string;
    /** 语音列表 */
    voice: Voice[];
  }

  /** @description 技能信息 */
  interface Skill {
    /** 技能冷却 */
    cd?: number;
    /** 消耗 */
    consume?: number | "";
    /** 名称 */
    name: string;
    /** 简述 */
    desc: string;
    /** 图标 */
    img: string;
    /** 类型 */
    type: string[];
    /** 效果 */
    effect?: SkillEffect[];
  }

  /** @description 返回的技能 */
  interface SkillParams {
    /** 技能id */
    id: number;
    /** 消耗单位 */
    unit: string;
    /** 技能列表 */
    skills: Skill[][];
  }

  /** @description 技能效果 */
  interface SkillEffect {
    /** 技能类型 */
    type: string;
    /** 效果等级数值 */
    phase: number[];
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
    relationship: RelationType[];
  }

  /** @description 关系类型 */
  interface RelationType {
    /** 英雄id */
    id: number;
    /** 对应关系 */
    relation: string;
    /** 英雄头像 */
    hero: HeadImg;
  }

  /** @description 皮肤信息 */
  interface Skin {
    /** 标识 */
    id: number;
    /** 所属英雄id */
    hero: number;
    /** 序号 */
    num: number;
    /** 价格 */
    price: string | number;
    /** 类型 */
    type: number | string;
    /** 皮肤类型名 */
    category: string;
    /** 性别 */
    gender: "男" | "女";
    /** 皮肤名称 */
    name: string;
    /** 备用皮肤名称 */
    skin_name?: string;
    /** 海报 */
    poster: string;
    /** 封面 */
    cover: string;
    /** 头像 */
    headImg: string;
    /** 英雄名称 */
    heroName: string;
    /** 备用英雄名称 */
    hero_name?: string;
    /** 职业 */
    profession: string[];
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

  /** @description 英雄头像列表 */
  interface HeadImg extends General {
    /** 头像 */
    headImg: string;
  }

  /** @description 英雄基础列表 */
  interface Basic extends General {
    /** 英雄拼音 */
    pinyin: string;
  }
}

/** @description 用户信息 */
interface User {
  /** 用户id */
  id: string;
  /** 密码 */
  password: string;
  /** 权限 */
  role: 0 | 1;
  /** 昵称 */
  nickname?: string;
  /** 头像 */
  headImg?: string;
  /** token */
  wzryToken?: number;
}

/** @description 基础类型 */
interface General {
  /** 通用id */
  id: number;
  /** 通用name */
  name: string;
}
