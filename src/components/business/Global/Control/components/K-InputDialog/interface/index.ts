/** @description 输入弹窗配置 */
export interface InputConfig {
  /** 原始值 */
  value?: string;
  /** 左上角标题 */
  title: string;
  /** 输入框提示 */
  placeholder: string;
  /** 关闭回调 */
  close?: () => void;
  /**
   * @description 确定回调
   * @param value 输入的值
   * @param close 弹窗完全关闭后调用
   */
  confirm: (value: string, close: () => void) => void;
}
