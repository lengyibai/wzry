export interface MouseTip {
  /** 是否显示 */
  show: boolean;
  /** 悬浮提示的文字 */
  text?: string;
  /** 是否处于禁用状态 */
  disabled?: boolean;
  /** 当前悬浮类型 */
  type?: "NORMAL" | "INPUT" | "TIP";
}
