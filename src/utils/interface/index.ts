/** @description 查看图片参数 */
export interface ImageViewParams {
  type: "DEFAULT" | "SKIN";
  /** 点击的事件对象 */
  parent: HTMLElement;
  /** 模糊图片(当type为SKIN时可以不填) */
  blurImage?: string;
  /** 大图(当type为SKIN时可以不填) */
  bigImage?: string;
  /** 皮肤ID(当type为SKIN时必填) */
  id?: number;
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

/** @description Zip类型 */
export type ZipType =
  | "AUDIO"
  | "IMAGE_ACTIVITY_BANNER"
  | "IMAGE_BLUR"
  | "IMAGE_HERO_AVATAR"
  | "IMAGE_MINECRAFT"
  | "IMAGE_MISC"
  | "IMAGE_PROPS"
  | "IMAGE_MINI_HERO"
  | "VIDEO_HOME"
  | "JSON_DATA"
  | "JSON_VOICE";
