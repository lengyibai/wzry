import { ImageViewParams } from "../interface";

import { $bus } from "./eventBus";

/** @description 查看图片 */
const $imageView = (v: ImageViewParams) => {
  $bus.emit("img-view", v);
};

export { $imageView };
