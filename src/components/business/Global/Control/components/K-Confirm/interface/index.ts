export interface ConfirmTip {
  /** 提示文本 */
  text: string;
  /** 显示关闭和取消按钮 */
  close?: boolean;
  /** 确认回调 */
  confirm: () => void;
  /** 取消回调 */
  cancel?: () => void;
}
