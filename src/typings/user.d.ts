/** @description 用户数据 */
declare namespace User {
  interface Data {
    /** 可用于奖励发放 */
    id: string;
    /** 昵称 */
    username: string;
    /** 密码 */
    password: string;
    /** 修改资料的二级密码 */
    secondaryPassword: string;
    /** 权限 0-管理员 1-用户 */
    role: 0 | 1;
    /** 是否为开发环境专属卡片 */
    isDev: boolean;
    /** 头像 */
    avatar: string;
    /** 注册时间 */
    createTime: number;
    /** 上次登录时间 */
    lastLoginTime: number;
    /** 英雄夺宝石周卡到期时间戳 */
    heroLotteryStoneWeekCardExpireTime: number;
    /** 皮肤夺宝石周卡到期时间戳 */
    skinLotteryStoneWeekCardExpireTime: number;
    /** 双倍金币卡到期时间戳 */
    doubleGoldCardExpireTime: number;
    /** 双倍经验卡到期时间戳 */
    doubleExpCardExpireTime: number;
    /** 正在竞猜的活动 */
    guess: {
      /** 海报竞猜 */
      poster: {
        /** 今日已竞猜次数 */
        guessCount: number;
        /** 是否处于竞猜中 */
        guessing: boolean;
        /** 回答正确的皮肤ID */
        skinIds: number[];
      };
      /** 技能竞猜 */
      skill: {
        /** 今日已竞猜次数 */
        guessCount: number;
        /** 是否处于竞猜中 */
        guessing: boolean;
        /** 以英雄ID为key的技能索引数组对象 */
        skillIds: Record<number, number[]>;
      };
    };
    /** 设置配置项 */
    settingConfig: SettingConfig;
    /** 铭文套装 */
    epigraphSuit: Game.Epigraph.Suit[];
    /** 邮箱列表 */
    mail: Game.Mail[];
    /** 邮件标记，避免用户重复收到推送 */
    mallMark: string[];
    /** 任务完成列表ID */
    taskFinish: string[];
    /** 任务数据状态 */
    taskStatus: Game.Task;
    /** 提出的BUG与建议 */
    bugIdea: BugIdea[];
    /** 埋点 */
    behaviorMarker: {
      /** 累计在线时长-秒 */
      mc93: number;
      /** 累计访问天数 */
      tg73: number;

      /** 累计消耗金币数量 */
      h3t4: number;
      /** 累计消耗钻石数量 */
      cq65: number;
      /** 累计英雄夺宝次数 */
      d24r: number;
      /** 累计皮肤夺宝次数 */
      y8b2: number;
      /** 累计消耗英雄碎片数量 */
      vu33: number;
      /** 累计消耗皮肤碎片数量 */
      i0k4: number;
      /** 累计消耗英雄一级经验宝箱数量 */
      iu48: number;
      /** 累计消耗英雄二级经验宝箱数量 */
      nn05: number;
      /** 累计消耗英雄夺宝石数量 */
      ku27: number;
      /** 累计消耗皮肤夺宝石数量 */
      i87h: number;
      /** 累计消耗英雄夺宝币数量 */
      g45c: number;
      /** 累计消耗皮肤夺宝币数量 */
      al38: number;
      /** 累计消耗王者水晶数量 */
      rj89: number;
      /** 累计消耗荣耀水晶数量 */
      q9y1: number;
      /** 累计消耗英雄秘宝数量 */
      kj05: number;
      /** 累计消耗勇者皮肤秘宝数量 */
      aw51: number;
      /** 累计消耗史诗皮肤秘宝数量 */
      ez16: number;
      /** 累计消耗传说皮肤秘宝数量 */
      cz62: number;
      /** 累计消耗限定皮肤秘宝数量 */
      cs01: number;
      /** 累计消耗随机英雄宝箱数量 */
      er08: number;
      /** 累计消耗自选英雄宝箱数量 */
      q65b: number;
      /** 累计消耗自选勇者皮肤宝箱数量 */
      k4f6: number;
      /** 累计消耗自选史诗皮肤宝箱数量 */
      yq53: number;
      /** 累计消耗自选传说皮肤宝箱数量 */
      ag35: number;
      /** 累计消耗自选限定皮肤宝箱数量 */
      cj13: number;
      /** 累计消耗竞猜币数量 */
      pa16: number;
      /** 累计消耗竞猜券数量 */
      j7m4: number;
      /** 累计消耗跳跳币数量 */
      my02: number;
      /** 累计消耗英雄夺宝周卡卡数量 */
      er27: number;
      /** 累计消耗皮肤夺宝周卡卡数量 */
      ml55: number;
      /** 累计消耗双倍经验卡数量 */
      e13s: number;
      /** 累计消耗双倍金币卡数量 */
      c8k7: number;
      /** 累计消耗伴生皮肤卡数量 */
      mh01: number;

      /** 累计海报竞猜次数 */
      ks52: number;
      /** 累计海报竞猜答错次数 */
      v87u: number;
      /** 累计技能竞猜次数 */
      ht88: number;
      /** 累计技能竞猜答错次数 */
      ff88: number;
    };

    /** 夺宝信息 */
    lottery: {
      /** 英雄夺宝幸运值 */
      heroLucky: number;
      /** 皮肤夺宝幸运值 */
      skinLucky: number;
    };
    /** 背包 */
    knapsack: {
      /** 已拥有的英雄 */
      heroList: Record<number, { exp: number }>;
      /** 已拥有的英雄 */
      skinList: number[];
      /** 物品列表 */
      articles: Record<Game.PropKey, number>;
    };
    /** 补给信息 */
    supply: {
      /** 英雄夺宝补给信息 */
      hero: {
        /** 今日剩余补给数量 */
        supply_remain_num: number;
        /** 模式信息 */
        mode?: Game.LotterySupply.Mode;
        /** 补给开始时间戳 */
        startTime: number;
        /** 当前状态 */
        status: Game.LotterySupply.Status;
      };
      /** 皮肤夺宝补给信息 */
      skin: {
        /** 今日剩余补给数量 */
        supply_remain_num: number;
        /** 模式信息 */
        mode?: Game.LotterySupply.Mode;
        /** 补给开始时间戳 */
        startTime: number;
        /** 当前状态 */
        status: Game.LotterySupply.Status;
      };
    };
    /** 乂宝信息 */
    yibao: {
      /** 当前可领取跳跳币 */
      jumpCoinReceive: number;
      /** 已拥有部件 */
      ownedPartIds: string[];
      /** 当前部件信息 */
      partDetail: Record<Game.YiBao.PartType, { type: Game.YiBao.StyleType; id: string }>;
    };
  }
}
