/** @description: 弹窗位置 */
type TipType = "left-top" | "right-top" | "left-bottom" | "right-bottom";

/** @description: 消息类型 */
type MsgType = "info" | "warning" | "error";
interface MsgText {
  id: number; //唯一值
  text: string; //提示内容
  type: MsgType; //提示类型
}

/** @description: 设置配置项 */
interface SettingConfig {
  tip: boolean; //小贴士
  videoBg: boolean; //使用视频背景
  audio: boolean; //音效
  audioVolume: number; //音效音量
  music: boolean; //音乐
  musicVolume: number; //音乐音量
  speed: 0 | 1 | 2; //动画速率
  particle: boolean; //粒子特效
  muted: boolean; //登录页视频静音
  noTips: Tips<boolean>; //不再提示列表
}

/** @description: 开关 */
declare namespace Switch {
  type ClickAudio = (name?: string) => void;
  type Msg = (text: string, type?: MsgType) => void;

  type Tip = (obj: {
    title?: string; //左上角标题
    text: TipKeys | string; //提示内容
    align?: TipType; //在页面上的位置
    btnText?: string; //按钮上的文字
    btnFn?: () => void; //点击确认后执行的函数
  }) => void;

  interface Loading {
    show: (text?: string) => void;
    close: () => void;
  }
}

/** @description: Tips提示信息 */
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

/** @description: Tips属性名 */
type TipKeys = keyof Tips<string>;

/** @description: 版本更新 */
type VersionUpdate = {
  main: string; //数据版本
  file: string; //文件版本
  log: string; //文件更新日志
};
