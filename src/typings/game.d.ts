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
      /** 价格 */
      price: string;
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
      /** 简述 */
      resume: string;
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
      skills: Remote.Skill.Info[][];
    }

    /** @description 英雄详情数据 */
    interface Detail extends Data {
      /** 皮肤 */
      skins: Skin[];
      /** 关系表 */
      relationships: RelationType[];
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
      /** 兑换所需皮肤碎片 */
      debris: string;
      /** 皮肤类型链接图 */
      link: string;
      /** 皮肤类型ID */
      type: number;
      /** 皮肤类型名 */
      category: string;
      /** 皮肤类型别名 */
      alias: string;
      /** 性别 */
      gender: GenderText;
      /** 皮肤名称 */
      name: string;
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
      /** 英雄ID */
      heroId: number;
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
      effect: {
        /** 效果名称 */
        name: string;
        /** 阶段值，百分比或数字 */
        num: string;
      }[];
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
      /** 颜色 */
      color: Remote.Epigraph.Color["value"];
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

    /** @description 三色铭文列表 */
    type Colors = Record<Remote.Epigraph.Color["value"], Game.Epigraph.Data[] | undefined[]>;

    /** @description 铭文库存 */
    type Inventory = Record<
      Remote.Epigraph.Color["value"],
      {
        epigraph: Game.Epigraph.Data;
        count: number;
      }[]
    >;

    /** @description 铭文套装 */
    interface Suit {
      /** 标识符 */
      id: string;
      /** 套装名称 */
      label: string;
      /** 三色列表 */
      colors: Colors;
      /** 库存 */
      inventory: Inventory;
    }
  }

  /** @description 夺宝补给相关 */
  namespace LotterySupply {
    /** @description 补给模式 */
    interface Mode {
      /** 模式描述 */
      label: string;
      /** 倒计时秒数 */
      seconds: number;
      /** 每次领取数量 */
      count: number;
    }

    /** @description 补给状态 IDLE-空闲 SELECT-选择模式 READY-准备开始 RUNNING-运行中 RECEIVE-可领取 */
    type Status = "IDLE" | "SELECT" | "READY" | "RUNNING" | "RECEIVE";
  }

  /** @description 邮件 */
  interface Mail {
    /** 邮件ID，请求的文件里没有id */
    id: string;
    /** 由于ID是请求成功之后生成的，所以只能通过标记来作为唯一性 */
    mark?: string;
    /** 邮件唯一Key */
    key: Global.Mail["key"];
    /** 邮件类型 */
    type: Global.Mail["type"];
    /** 标题 */
    title: string;
    /** 内容 */
    desc: string;
    /** 发送时间 */
    time: number;
    /** 已读状态 */
    read: boolean;
    /** 道具列表 */
    props?: {
      /** 键名 */
      key: PropKey;
      /** 数量 */
      num: number;
    }[];
  }

  /** @description 任务今日和本周数据状态 */
  interface Task {
    /** 今日在线时长 */
    today_online_duration: number;
    /** 今日金币消费数量 */
    today_gold_consume: number;
    /** 今日钻石消费数量 */
    today_diamond_consume: number;
    /** 今日参与英雄夺宝次数 */
    today_hero_lottery: number;
    /** 今日参与皮肤夺宝次数 */
    today_skin_lottery: number;
    /** 今日使用双倍金币卡次数 */
    today_double_gold_card: number;
    /** 今日使用双倍经验卡次数 */
    today_double_exp_card: number;
    /** 今日消耗英雄夺宝币数量 */
    today_hero_coin: number;
    /** 今日消耗皮肤夺宝币数量 */
    today_skin_coin: number;
    /** 今日消耗英雄夺宝石数量 */
    today_hero_stone: number;
    /** 今日消耗皮肤夺宝石数量 */
    today_skin_stone: number;
    /** 今日领取英雄夺宝石补给数量 */
    today_hero_supply: number;
    /** 今日领取皮肤夺宝石补给数量 */
    today_skin_supply: number;

    /** 本周在线时长 */
    week_online_duration: number;
    /** 本周本周登录天数 */
    week_login_day: number;
    /** 本周使用了英雄夺宝石周卡次数 */
    week_hero_stone_card: number;
    /** 本周使用了皮肤夺宝石周卡次数 */
    week_skin_stone_card: number;
    /** 本周触发英雄或皮肤夺宝石补给站0额度次数 */
    week_zero_supply: number;
    /** 本周消耗英雄夺宝币数量 */
    week_hero_coin: number;
    /** 本周消耗皮肤夺宝币数量 */
    week_skin_coin: number;
  }

  /** @description 道具Key */
  type PropKey =
    | "DIAMOND"
    | "GOLD"
    | "BLESSING_BAG"
    | "HONOR_CRYSTAL"
    | "KING_CRYSTAL"
    | "HERO_CHEST_OPTIONAL"
    | "HERO_DEBRIS"
    | "HERO_EXP_ONE"
    | "HERO_EXP_TWO"
    | "DOUBLE_GOLD"
    | "DOUBLE_EXP"
    | "HERO_LOTTERY_COIN"
    | "SKIN_LOTTERY_COIN"
    | "HERO_LOTTERY_STONE"
    | "HERO_LOTTERY_WEEK"
    | "SKIN_LOTTERY_WEEK"
    | "HERO_TREASURE"
    | "HERO_CHEST_RANDOM"
    | "SKIN_DEBRIS"
    | "SKIN_CARD_INITIAL"
    | "SKIN_CHEST_BRAVE_OPTIONAL"
    | "SKIN_CHEST_EPIC_OPTIONAL"
    | "SKIN_CHEST_LEGEND_OPTIONAL"
    | "SKIN_CHEST_LIMIT_OPTIONAL"
    | "SKIN_EPIC_TREASURE"
    | "SKIN_LEGEND_TREASURE"
    | "SKIN_BRAVE_TREASURE"
    | "SKIN_LIMIT_TREASURE"
    | "SKIN_LOTTERY_STONE"
    | "GUESS_CARD"
    | "GUESS_COIN"
    | "JUMP_COIN";

  /** @description 性别 */
  type GenderId = 0 | 1 | 2;

  /** @description 性别名 */
  type GenderText = "男" | "女";

  /** @description 乂宝相关 */
  namespace YiBao {
    /** @description 风格类型 */
    type StyleType = "COLOR" | "IMG";
    /** @description 部件类型  antenna-天线 annulus-眼圈 blush-腮红 eye-眼睛 mouth-嘴巴 side-六面 wing-翅膀  */
    type PartType = "antenna" | "annulus" | "blush" | "eye" | "mouth" | "side" | "wing";
  }
}
