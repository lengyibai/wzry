import type { ImageViewParams } from "./interface";
import { $bus } from "./eventBus";

import type { InputConfig } from "@/components/business/Global/Control/components/K-InputDialog/interface";
import type { ConfirmTip } from "@/components/business/Global/Control/components/K-Confirm/interface";
import type { MouseTip } from "@/components/business/Global/Control/components/K-MouseTip/interface";
import { useTip } from "@/components/business/Global/Control/components/K-Tip/hooks/useTip";
import { ObtainInfo } from "@/components/business/Global/Control/components/K-Obtain/interface";
import { BuyProp } from "@/components/business/Global/Control/components/K-BuyProp/interface";
import { GamePropValue } from "@/config/interface";
import { HelpParams } from "@/components/business/Global/Control/components/K-Help/interface";
import { OptionalMode } from "@/components/business/Global/Control/components/K-Optional/interface";

/** @description 查看图片 */
export const $imageView = (v: ImageViewParams) => $bus.emit("img-view", v);

/** @description 小贴士 */
export const $tip = (data: Global.Tip.Prompt) => useTip().tip(data);

/** @description 确认提示 */
export const $confirm = (data: ConfirmTip) => $bus.emit("confirm", data);

/** @description 获得物品弹窗 */
export const $obtain = (data: ObtainInfo | ObtainInfo[]) => $bus.emit("obtain", data);

/** @description 购买道具弹窗 */
export const $buyProp = (data: BuyProp) => $bus.emit("buy-prop", data);

/** @description 自选英雄弹窗 */
export const $optional = (mode: OptionalMode) => $bus.emit("optional", mode);

/** @description 批量使用道具弹窗 */
export const $batchProp = (data: GamePropValue) => $bus.emit("batch-prop", data);

/** @description 英雄详情页 */
export const $heroDetail = (id?: number) => $bus.emit("hero-detail", id);

/** @description 弹窗提供输入 */
export const $input = (data: InputConfig) => $bus.emit("input", data);

/** @description 帮助弹窗 */
export const $help = (params: HelpParams) => $bus.emit("help", params);

/** @description 升级英雄弹窗 */
export const $upgrade = (prop_type: "HERO_EXP_ONE" | "HERO_EXP_TWO") =>
  $bus.emit("upgrade", prop_type);

/** @description 消息提醒 */
export const $message = (text: string, type: Global.Message.Status = "info") => {
  $bus.emit("msg", {
    text,
    type,
  });
};

/** @description 元素聚焦 */
export const $focus = {
  show(el: HTMLElement) {
    $bus.emit("focus", el);
  },
  close() {
    $bus.emit("focus");
  },
};

/** @description 鼠标悬浮提示 */
export const $mouseTip = {
  show(data: Omit<MouseTip, "show">) {
    $bus.emit("mouse-tip", {
      ...data,
      show: true,
    });
  },
  close() {
    $bus.emit("mouse-tip", {
      show: false,
    });
  },
};
