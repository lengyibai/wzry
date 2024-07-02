import mitt from "mitt";

import type { ImageViewParams } from "./interface";

import type { MouseTip } from "@/components/business/Global/Control/components/K-MouseTip/interface";

type EventData = {
  loading: { text?: string; show: boolean };
  /** 全局手指抬起事件 */
  mouseup: Event;
  /** 瀑布流更新图片大小及坐标 */
  "update-waterfall": any;
  /** 查看图片 */
  "img-view": ImageViewParams;
  /** 鼠标悬浮提示 */
  "mouse-tip": MouseTip;
  /** 元素聚焦 */
  focus: HTMLElement | undefined;
};

type MittEventMap = {
  [key in keyof EventData]: EventData[key];
};

const $bus = mitt<MittEventMap>();

export { $bus };
