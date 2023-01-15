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
