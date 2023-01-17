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
  speed: 0 | 1 | 2;
  loginSound: boolean;
  particle: boolean;
}
