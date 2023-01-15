declare type TipType =
  | "left-top"
  | "right-top"
  | "left-bottom"
  | "right-bottom";

declare type MsgType = "info" | "warning" | "error";
declare interface MsgText {
  id: number;
  text: string;
  type: string;
}

declare interface SettingConfig {
  tip: boolean;
  videoBg: boolean;
  audio: boolean;
  audioVolume: number;
  music: boolean;
  musicVolume: number;
  lazy: boolean;
  theme: number;
  speed: number;
  loginSound: boolean;
}
