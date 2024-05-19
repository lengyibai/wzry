/** @description 获得的物品信息 */
export interface ObtainInfo {
  /** 道具图标及皮肤头像 */
  icon: string;
  /** 道具及英雄名称 */
  name: string;
  /** 道具键名 */
  key?: Game.PropKey;
  /** 数量 */
  num?: number;
  /** 弹窗点击关闭时立即调用 */
  onClose?: () => void;
}
