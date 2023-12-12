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
  noTips: Tips<boolean>;
}

/** @description 开关 */
declare namespace Control {
  /** @description 点击音效 */
  type ClickAudio = (name?: string) => void;

  /** @description 消息提醒 */
  type Msg = (text: string, type?: MsgType) => void;

  /** @description 小贴士 */
  interface Tip {
    /** 左上角标题 */
    title?: string;
    /** 提示内容（在拥有key类型提示的情况下，支持字符串） */
    text: keyof Tips<string> | string;
    /** 在页面上的位置 */
    align?: TipType;
    /** 按钮上的文字 */
    btnText?: string;
    /** 点击确认后执行的函数 */
    btnFn?: () => void;
    /** tip创建后执行的函数 */
    createFn?: () => void;
  }

  /** @description loading */
  interface Loading {
    /**
     * 显示loading
     * @param text 右上角加载描述
     */
    show: (text?: string) => void;
    /** 关闭loading */
    close: () => void;
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

/** @description 音效类型 */
interface AudioKeys {
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
  /** 标识符 */
  id: number;
  /** 英雄ID */
  heroId: number;
  /** 性别 */
  gender: "男" | "女";
  /** 语音内容 */
  text: string;
  /** 语音链接 */
  link: string;
  /** 皮肤名 */
  skinName: string;
}
