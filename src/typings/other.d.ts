/** @description 弹窗位置 */
type TipType = "left-top" | "right-top" | "left-bottom" | "right-bottom";

/** @description 消息类型 */
type MsgType = "info" | "warning" | "error";

/** @description 消息提醒 */
interface MsgText {
  /** 唯一值 */
  id: number;
  /** 提示内容 */
  text: string;
  /** 提示类型 */
  type: MsgType;
}

/** @description 设置配置项 */
interface SettingConfig {
  /** 小贴士 */
  tip: boolean;
  /** 使用视频背景 */
  videoBg: boolean;
  /** 音效 */
  audio: boolean;
  /** 音效音量 */
  audioVolume: number;
  /** 音乐 */
  music: boolean;
  /** 音乐音量 */
  musicVolume: number;
  /** 音乐进度控制 */
  musicProgress: boolean;
  /** 动画速率 */
  speed: 0 | 1 | 2;
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
  noTips: Tips<boolean>;
}

/** @description 开关 */
declare namespace Switch {
  /** @description 点击音效 */
  type ClickAudio = (name?: string) => void;

  /** @description 消息提醒 */
  type Msg = (text: string, type?: MsgType) => void;

  /** @description 小贴士 */
  type Tip = (obj: {
    /** 左上角标题 */
    title?: string;
    /** 提示内容 */
    text: TipKeys | string;
    /** 在页面上的位置 */
    align?: TipType;
    /** 按钮上的文字 */
    btnText?: string;
    /** 点击确认后执行的函数 */
    btnFn?: Func;
  }) => void;

  /** @description loading */
  interface Loading {
    /**
     * 显示loading
     * @param text 右上角加载描述
     */
    show: (text?: string) => void;
    /** 关闭loading */
    close: Func;
  }
}

/** @description Tips提示信息 */
interface Tips<T> {
  "2rb7": T;
  "9f5m": T;
  "05su": T;
  "9oy5": T;
  "58mz": T;
  "1w7o": T;
  "0vk2": T;
  "1zs6": T;
  "3vi5": T;
  "2l5m": T;
  "9ms5": T;
}

/** @description Tips属性名 */
type TipKeys = keyof Tips<string>;

/** @description 版本更新 */
interface VersionUpdate {
  /** 数据版本 */
  main: string;
  /** 文件版本 */
  file: string;
  /** 文件更新日志 */
  log: string;
  /** 更新时间 */
  time: string;
}

/** @description 更新日志 */
interface UpdateLog {
  /** 基础数据更新 */
  data: string;
  /** 语音数据更新 */
  voice: string;
  /** 文件更新 */
  file: string;
  /** 更新时间 */
  time: string;
}

/** @description 性别 */
type Gender = 0 | 1 | 2;
