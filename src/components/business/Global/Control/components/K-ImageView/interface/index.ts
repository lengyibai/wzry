/** @description 查看图片参数 */
export interface ImageView {
  type: "DEFAULT" | "SKIN";
  /** 点击的事件对象 */
  parent: HTMLElement;
  /** 模糊图片 */
  blurImage?: string;
  /** 大图 */
  bigImage?: string;
  /** 皮肤ID */
  id?: number;
  /** 英雄名 */
  heroName?: string;
  /** 英雄头像 */
  heroAvatar?: string;
  /** 皮肤名称 */
  skinName?: string;
  /** 语音列表 */
  voices?: Remote.Voice.Data["voice"];
}
