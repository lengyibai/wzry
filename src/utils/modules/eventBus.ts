import mitt from "mitt";

import { ImageViewParams } from "./imageView";

import { ConfirmTip } from "@/components/business/Global/Control/components/K-Confirm/types";

type EventData = {
  loading: { text?: string; show: boolean };
  msg: { text: string; type: Global.Message.Status };
  confirm: ConfirmTip;
  tip: Global.Tip.Prompt;
  /** 全局手指抬起事件 */
  resize: Event;
  mousemove: Event;
  mouseup: Event;
  /** 瀑布流监听图片加载 */
  "watch-waterfall": any;
  /** 瀑布流更新图片大小及坐标 */
  "update-waterfall": any;
  /** 查看图片 */
  "img-view": ImageViewParams;
};

type MittEventMap = {
  [key in keyof EventData]: EventData[key];
};

const $bus = mitt<MittEventMap>();

export { $bus };
