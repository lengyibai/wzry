/** @description 全局类型 */
declare namespace Global {
  /** @description 小贴士相关 */
  namespace Tip {
    /** @description 弹出位置 */
    type Position = "left-top" | "right-top" | "left-bottom" | "right-bottom";

    /** @description 提示文字Key */
    interface Key<T = string> {
      d7o5: T;
      f1y0: T;
      kr53: T;
      lp57: T;
      ma67: T;
      mu63: T;
      v44s: T;
      cl60: T;
    }

    /** @description 小贴士触发 */
    interface Prompt {
      /** 提示内容（在拥有key类型提示的情况下，支持字符串） */
      text: keyof Key<string> | string;
      /** 蒙版是否需要颜色，在元素聚焦的时候蒙版为透明 */
      color?: boolean;
      /** 在页面上的位置 */
      align?: Position;
      /** 按钮上的文字 */
      btnText?: string;
      /** 点击确认后执行的函数 */
      btnFn?: () => void;
      /** tip创建后执行的函数 */
      createFn?: () => void;
      /** 打字结束后调用 */
      done?: () => void;
    }
  }

  /** @description 消息提示相关 */
  namespace Message {
    /** @description 消息状态 */
    type Status = "info" | "warning" | "error";

    /** @description 提示信息 */
    interface Info {
      /** 唯一值 */
      id: number;
      /** 提示内容 */
      text: string;
      /** 提示类型 */
      type: Status;
      /** 消失倒计时 */
      duration: number;
    }

    /** @description 触发消息提示 */
    type Prompt = (text: string, type?: Status) => void;
  }

  /** @description 音效相关 */
  namespace Audio {
    /** @description 音效key */
    interface Key {
      /** 进入图集 */
      gz76: string;
      /** 进入夺宝 */
      bq69: string;
      /** 显示任务列表 */
      kj62: string;
      /** 返回，如从英雄详情左上角关闭 */
      p60v: string;
      /** 警示弹窗，如确认重置、确认丢弃 */
      cy87: string;
      /** 关闭弹窗 */
      ba09: string;
      /** 从下到上的弹窗 */
      e6b4: string;
      /** 点击确认按钮 */
      pj83: string;
      /** 默认点击 */
      h2w0: string;
      /** 删除（暂未使用） */
      kh79: string;
      /** 查看详情 */
      u4c5: string;
      /** 进入铭文列表 */
      h7t9: string;
      /** 进入装备列表 */
      ph23: string;
      /** 错误消息提示 */
      vw31: string;
      /** 折叠、展开侧边栏 */
      d5e2: string;
      /** 进入英雄列表 */
      iv51: string;
      /** 登录后的强提示 */
      p53r: string;
      /** 输入时触发（由于与手机键盘音冲突，取消使用） */
      al41: string;
      /** 点击登录 */
      e84n: string;
      /** 普通消息提示 */
      n74s: string;
      /** 暂未使用（游戏内对战模式选择音效） */
      le78: string;
      /** 滑动选择 */
      za86: string;
      /** （暂未使用）切换注册登录 */
      v6p0: string;
      /** 进入皮肤列表 */
      gz43: string;
      /** 展开下拉菜单 */
      n4r4: string;
      /** Tip小贴士弹出 */
      rt25: string;
      /** 警告提示 */
      p6q3: string;
      /** 夺宝 */
      o7r6: string;
      /** 夺宝获得奖品 */
      jo36: string;
      /** 背包 */
      fz02: string;
      /** 商城 */
      h3w0: string;
      /** 夺宝石到账 */
      bg51: string;
      /** 道具商店 */
      o3l2: string;
      /** 生效 */
      wm14: string;
      /** 进入乂宝页面 */
      jy55: string;
      /** 小返回 */
      hy43: string;
      /** 电视机关闭 */
      pk92: string;
      //au63: string;
      //gk90: string;
      //e90x: string;
      //kj35: string;
      //zm31: string;
      //dh38: string;
    }

    /** @description 点击音效 */
    type Play = (name?: string) => void;
  }

  /** @description 音乐信息 */
  interface Music {
    /** 音乐名称 */
    name: string;
    /** 音乐播放地址 */
    url: string;
    /** 音乐时长 */
    time: string;
  }

  /** @description 弹幕信息 */
  interface Barrage {
    /** 英雄ID */
    heroId: number;
    /** 性别 */
    gender: Game.GenderText;
    /** 语音内容 */
    text: string;
    /** 语音链接 */
    link: string;
    /** 皮肤名 */
    skinName: string;
  }

  /** @description 版本相关 */
  namespace Version {
    /** @description 版本文件 */
    interface File {
      /** 远程数据版本 */
      dataVersion: string;
      /** 远程文件版本 */
      distVersion: string;
    }

    /** @description 更新日志 */
    interface UpdateLog {
      /** 远程更新时间 */
      time: string;
      /** 远程文件更新日志 */
      updateLog: {
        /** 新增特性 */
        new: { time: string; log: string }[];
        /** 功能优化 */
        function: { time: string; log: string }[];
        /** 样式优化 */
        style: { time: string; log: string }[];
        /** BUG修复 */
        bug: { time: string; log: string }[];
      };
    }

    /** @description 静态资源版本 */
    interface Static {
      /** 音效包列表 */
      audioVersion: string;
      /** 活动Banner图包列表 */
      imageActivityBannerVersion: string;
      /** 模糊海报图包列表 */
      imageBlurVersion: string;
      /** 英雄大头贴列表 */
      imageHeroAvatarVersion: string;
      /** Minecraft贴图包列表 */
      imageMinecraftVersion: string;
      /** 杂图包列表 */
      imageMiscVersion: string;
      /** 道具图包列表 */
      imagePropsVersion: string;
      /** 迷你英雄图包列表 */
      imageMiniHeroVersion: string;
      /** 主页视频列表 */
      videoHomeVersion: string;
      /** 数据包 */
      jsonDataVersion: string;
      /** 语音包 */
      jsonVoiceVersion: string;
    }
  }

  /** @description 网站计划 */
  interface Todo {
    /** 页面层 */
    surface: {
      /** 大类列表 */
      label: string;
      /** 分类列表 */
      value: {
        /** 小标题 */
        title: string;
        /** 计划 */
        todo: string;
      }[];
    }[];
    /** 代码层 */
    substrate: string[];
  }

  /** @description 邮箱 */
  interface Mail {
    /** 由于ID是请求成功之后生成的，所以只能通过标记来作为唯一性 */
    mark: string;
    /** 邮件独有类型 SIGN-签到 NEW-新手大礼包  SIGN-每日签到 COIN-每日夺宝币 DEFAULT-站内手动推送  */
    key: "SIGN" | "NEW" | "COIN" | "DEFAULT";
    /** 邮件类型 GIFT-可领取的 MSG-通知 */
    type: "GIFT" | "MSG";
    /** 标题 */
    title: string;
    /** 内容 */
    desc: string;
    /** 赠送的道具列表 */
    props: {
      /** 道具Key */
      key: Game.PropKey;
      /** 道具数量 */
      num: number;
    }[];
  }

  /** @description BUG与建议 */
  interface BugIdea {
    /** BUG或建议 */
    type: "BUG" | "IDEA";
    /** 描述 */
    desc: string;
    /** 提出时间 */
    time: number;
  }

  /** @description 设置配置项 */
  interface SettingConfig {
    /** 小贴士 */
    tip: boolean;
    /** 音效 */
    audio: boolean;
    /** 音效音量 */
    audioVolume: number;
    /** 音乐 */
    music: boolean;
    /** 音乐音量 */
    musicVolume: number;
    /** 弹幕语音 */
    barrage: boolean;
    /** 音乐进度控制 */
    musicProgress: boolean;
    /** 夺宝动画 */
    lotteryAnimation: boolean;
    /** 语言 */
    language: 0 | 1 | 2;
    /** 柔光 */
    shine: boolean;
    /** 粒子特效 */
    particle: boolean;
    /** 不再提示列表 */
    noTips: Global.Tip.Key<boolean>;
  }

  /** @description loading提示 */
  interface Loading {
    /**
     * 显示loading
     * @param text 右上角加载描述
     */
    show: (text?: string) => void;
    /** 关闭loading */
    close: () => void;
  }

  /** @description 用户数据 */
  interface UserData {
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
    heroLotteryStoneWeekCardExpireTime: 0;
    /** 皮肤夺宝石周卡到期时间戳 */
    skinLotteryStoneWeekCardExpireTime: 0;
    /** 双倍金币卡到期时间戳 */
    doubleGoldCardExpireTime: 0;
    /** 双倍经验卡到期时间戳 */
    doubleExpCardExpireTime: 0;
    /** 正在竞猜的活动 */
    guess: {
      /** 海报竞猜 */
      poster: {
        /** 是否处于竞猜中 */
        guessing: boolean;
        /** 回答正确的皮肤ID */
        skinIds: number[];
      };
      /** 技能竞猜 */
      skill: {
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
      nx46: number;
      /** 累计访问天数 */
      mm27: number;

      /** 累计英雄夺宝次数 */
      d1f9: number;
      /** 累计皮肤夺宝次数 */
      i71y: number;

      /** 累计获取伴生皮肤卡数量 */
      cs91: number;
      /** 累计消耗伴生皮肤卡数量 */
      rm08: number;

      /** 累计获取金币数量 */
      lw77: number;
      /** 累计消耗金币数量 */
      b3q5: number;
      /** 累计通过夺宝获取的金币数量 */
      vi12: number;
      /** 累计通过开宝箱获取的金币数量 */
      vg41: number;

      /** 累计获取钻石数量 */
      oa04: number;
      /** 累计消耗钻石数量 */
      kt48: number;
      /** 累计通过购买获取的钻石数量 */
      jw74: number;
      /** 累计通过夺宝获取的钻石数量 */
      b61i: number;
      /** 累计通过开宝箱获取的钻石数量 */
      bd02: number;

      /** 累计获取英雄碎片数量 */
      bf56: number;
      /** 累计消耗英雄碎片数量 */
      ul23: number;
      /** 累计通过购买获取的英雄碎片数量 */
      ek44: number;
      /** 累计通过夺宝获取的英雄碎片数量 */
      rn28: number;
      /** 累计通过开宝箱获取的英雄碎片数量 */
      p3d7: number;

      /** 累计获取皮肤碎片数量 */
      tc01: number;
      /** 累计消耗皮肤碎片数量 */
      rj65: number;
      /** 累计通过购买获取的皮肤碎片数量 */
      e8g6: number;
      /** 累计通过夺宝获取的皮肤碎片数量 */
      zf36: number;
      /** 累计通过开宝箱获取的皮肤碎片数量 */
      h1v0: number;
      /** 通过英雄升级赠送的皮肤碎片数量 */
      nk61: number;

      /** 累计获取英雄一级经验宝箱数量 */
      xm99: number;
      /** 累计消耗英雄一级经验宝箱数量 */
      p26a: number;
      /** 累计通过购买获取的英雄一级经验数量 */
      wj24: number;
      /** 累计通过夺宝获取的英雄一级经验数量 */
      v1l1: number;
      /** 累计通过开宝箱获取的英雄一级经验数量 */
      xu73: number;

      /** 累计获取英雄二级经验宝箱数量 */
      tp67: number;
      /** 累计消耗英雄二级经验宝箱数量 */
      wx77: number;
      /** 累计通过购买获取的英雄二级经验数量 */
      b9u6: number;
      /** 累计通过夺宝获取的英雄二级经验数量 */
      t22a: number;
      /** 累计通过开宝箱获取的英雄二级数量 */
      a2w5: number;

      /** 累计获取英雄夺宝石数量 */
      dw22: number;
      /** 累计消耗英雄夺宝石数量 */
      vq84: number;
      /** 累计通过购买获取的英雄夺宝石数量 */
      rf21: number;
      /** 累计通过开宝箱获取的英雄夺宝石数量 */
      tk65: number;

      /** 累计获取皮肤夺宝石数量 */
      wm57: number;
      /** 累计消耗皮肤夺宝石数量 */
      z88m: number;
      /** 累计通过购买获取的皮肤夺宝石数量 */
      dm42: number;
      /** 累计通过开宝箱获取的皮肤夺宝石数量 */
      m7g3: number;

      /** 累计通过夺宝获取王者水晶数量 */
      p2i5: number;
      /** 累计消耗王者水晶数量 */
      z4l8: number;
      /** 累计通过夺宝获取荣耀水晶数量 */
      i7k8: number;
      /** 累计消耗荣耀水晶数量 */
      le99: number;

      /** 累计通过夺宝获取英雄秘宝数量 */
      j1p0: number;
      /** 累计消耗英雄秘宝数量 */
      fh87: number;
      /** 累计通过夺宝获取勇者皮肤秘宝数量 */
      j9t8: number;
      /** 累计消耗勇者皮肤秘宝数量 */
      qg40: number;
      /** 累计通过夺宝获取史诗皮肤秘宝数量 */
      vp92: number;
      /** 累计消耗史诗皮肤秘宝数量 */
      bj32: number;
      /** 累计通过夺宝获取传说皮肤秘宝数量 */
      hk57: number;
      /** 累计消耗传说皮肤秘宝数量 */
      zx89: number;
      /** 累计通过夺宝获取限定皮肤秘宝数量 */
      pv44: number;
      /** 累计消耗限定皮肤秘宝数量 */
      pe35: number;

      /** 累计通过开宝箱获取自选英雄宝箱数量 */
      kv13: number;
      /** 累计消耗自选英雄宝箱数量 */
      ip47: number;
      /** 累计通过开宝箱获取自选勇者皮肤宝箱数量 */
      mq70: number;
      /** 累计消耗自选勇者皮肤宝箱数量 */
      gq13: number;
      /** 累计通过开宝箱获取自选史诗皮肤宝箱数量 */
      j7a9: number;
      /** 累计消耗自选史诗皮肤宝箱数量 */
      r6u2: number;
      /** 累计通过开宝箱获取自选传说皮肤宝箱数量 */
      b66u: number;
      /** 累计消耗自选传说皮肤宝箱数量 */
      ua59: number;
      /** 累计通过开宝箱获取自选限定皮肤宝箱数量 */
      t84m: number;
      /** 累计消耗自选限定皮肤宝箱数量 */
      pm59: number;
      //sj63: number;
      //xc54: number;
      //sm97: number;
      //tx06: number;
      //oy14: number;
      //b6x0: number;
      //st34: number;
      //zx83: number;
      //ql45: number;
      //ko87: number;
      //d9w5: number;
    };
    /** 夺宝信息 */
    lottery: {
      /** 英雄夺宝幸运值 */
      hero_lucky: number;
      /** 皮肤夺宝幸运值 */
      skin_lucky: number;
    };
    /** 背包 */
    knapsack: {
      /** 已拥有的英雄 */
      hero_list: Record<number, { exp: number }>;
      /** 已拥有的英雄 */
      skin_list: number[];
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
  }

  /** @description 基础类型 */
  interface Basic<T = string> {
    /** 通用id */
    id: number;
    /** 通用值 */
    value: T;
  }

  /** @description 通用类型 */
  interface General<T = string> {
    /** 通用名 */
    label: string;
    /** 通用name */
    value: T;
  }
}
