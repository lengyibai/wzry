import { $bus } from "./eventBus";

interface ImageViewParams {
  type: "DEFAULT" | "HERO";
  /** 点击的事件对象 */
  event: Event;
  /** 英雄名 */
  heroName: string;
  /** 英雄头像 */
  heroAvatar: string;
  /** 皮肤名称 */
  skinName: string;
  /** 模糊图片 */
  blurImage: string;
  /** 大图 */
  bigImage: string;
  /** 语音列表 */
  voices?: Remote.Voice.Data["voice"];
}

/** @description 查看图片 */
const $imageView = (v: ImageViewParams) => {
  $bus.emit("img-view", v);
};

export { $imageView };
export type { ImageViewParams };
