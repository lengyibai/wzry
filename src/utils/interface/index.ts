/** @description 查看图片参数 */
export interface ImageViewParams {
  type: "DEFAULT" | "HERO";
  /** 点击的事件对象 */
  event: Event;
  /** 英雄名 */
  heroName?: string;
  /** 英雄头像 */
  heroAvatar?: string;
  /** 皮肤名称 */
  skinName?: string;
  /** 模糊图片 */
  blurImage: string;
  /** 大图 */
  bigImage: string;
  /** 语音列表 */
  voices?: Remote.Voice.Data["voice"];
}

/** @description 图片压缩参数 */
export type ImageOptimizerOptions = {
  el?: HTMLInputElement;
  file?: File;
  /** 压缩尺寸 */
  width?: number;
  /** 压缩率 */
  ratio?: number;
  /** 超过多大进行压缩 */
  maxSize?: number;
  /** 成功回调 */
  success: (data: FormData, file: File, url: string) => void;
  /** 失败回调 */
  fail?: (error: ErrorEvent) => void;
};
