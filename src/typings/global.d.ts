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
      /** 进入本地数据管理 */
      bq69: string;
      /** 显示网站计划 */
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
      /** 选择图片 */
      v6p0: string;
      /** 进入皮肤列表 */
      gz43: string;
      /** 展开下拉菜单 */
      n4r4: string;
      /** Tip小贴士弹出 */
      rt25: string;
      /** 警告提示 */
      p6q3: string;
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
    /** 权重 */
    sort: 0 | 1;
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
    /** @description 更新日志 */
    type UpdateLog = Omit<File, "dataVersion" | "distVersion" | "dataKey" | "voiceKey">;

    /** @description 更新文件结构 */
    interface File {
      /** 远程数据版本 */
      dataVersion: string;
      /** 远程文件版本 */
      distVersion: string;
      /** 数据要更新的key */
      dataKey: string[];
      /** 语音要更新的key */
      voiceKey: string[];
      /** 远程更新时间 */
      time: string;
      /** 远程数据更新日志 */
      dataLog: string[];
      /** 远程语音更新日志 */
      voiceLog: string[];
      /** 远程文件更新日志 */
      distLog: {
        /** 页面层 */
        surface: {
          /** 新增特性 */
          new: string[];
          /** 功能优化 */
          function: string[];
          /** 样式优化 */
          style: string[];
          /** BUG修复 */
          bug: string[];
        };
        /** 代码层 */
        substrate: string[];
      };
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
    /** 语言 */
    language: 0 | 1 | 2;
    /** 线条 */
    border: boolean;
    /** 阴影 */
    shadow: boolean;
    /** 柔光 */
    shine: boolean;
    /** 粒子特效 */
    particle: boolean;
    /** 登录页视频静音 */
    muted: boolean;
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
    avatar?: string;
    /** token */
    wzryToken?: number;
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
