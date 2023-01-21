/** @description: 弹窗位置 */
declare type TipType =
  | "left-top"
  | "right-top"
  | "left-bottom"
  | "right-bottom";

/** @description: 消息类型 */
declare type MsgType = "info" | "warning" | "error";
declare interface MsgText {
  id: number;
  text: string;
  type: string;
}

/** @description: 设置配置项 */
declare interface SettingConfig {
  tip: boolean;
  videoBg: boolean;
  audio: boolean;
  audioVolume: number;
  music: boolean;
  musicVolume: number;
  speed: 0 | 1 | 2;
  particle: boolean;
  muted: boolean;
}

/** @description: 开关 */
declare namespace Switch {
  type ClickAudio = (name?: string) => void;
  type Msg = (text: string, type?: MsgType) => void;
  type Tip = (name: string, align?: TipType) => void;
  interface Loading {
    show: (text?: string) => void;
    close: () => Promise<void>;
  }
}
