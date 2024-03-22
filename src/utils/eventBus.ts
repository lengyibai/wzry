import mitt from "mitt";

import type { ImageViewParams } from "./interface";

import type { MouseTip } from "@/components/business/Global/Control/components/K-MouseTip/interface";
import type { ConfirmTip } from "@/components/business/Global/Control/components/K-Confirm/interface";
import type { InputConfig } from "@/components/business/Global/Control/components/K-InputDialog/interface";
import { ObtainInfo } from "@/components/business/Global/Control/components/K-Obtain/interface";
import { BuyProp } from "@/components/business/Global/Control/components/K-BuyProp/interface";
import { GamePropValue } from "@/config/interface";
import { HelpParams } from "@/components/business/Global/Control/components/K-Help/interface";
import { OptionalMode } from "@/components/business/Global/Control/components/K-Optional/interface";

type EventData = {
  loading: { text?: string; show: boolean };
  msg: { text: string; type: Global.Message.Status };
  confirm: ConfirmTip;
  tip: Global.Tip.Prompt;
  /** 全局手指抬起事件 */
  mouseup: Event;
  /** 瀑布流监听图片加载 */
  "watch-waterfall": any;
  /** 瀑布流更新图片大小及坐标 */
  "update-waterfall": any;
  /** 查看图片 */
  "img-view": ImageViewParams;
  /** 鼠标悬浮提示 */
  "mouse-tip": MouseTip;
  /** 弹窗输入 */
  input: InputConfig;
  /** 帮助弹窗 */
  help: HelpParams;
  /** 元素聚焦 */
  focus: HTMLElement | undefined;
  /** 获得弹窗 */
  obtain: ObtainInfo | ObtainInfo[];
  /** 购买道具弹窗 */
  "buy-prop": BuyProp;
  /** 批量使用道具弹窗 */
  "batch-prop": GamePropValue;
  /** 英雄升级 */
  upgrade: "HERO_EXP_ONE" | "HERO_EXP_TWO";
  /** 自选英雄 */
  optional: OptionalMode;
  /** 查看英雄详情 */
  "hero-detail": number | undefined;
};

type MittEventMap = {
  [key in keyof EventData]: EventData[key];
};

const $bus = mitt<MittEventMap>();

export { $bus };
