import type { ImageViewParams } from "../interface";

import { $bus } from "./eventBus";

import type { InputConfig } from "@/components/business/Global/Control/components/K-InputDialog/interface";
import type { ConfirmTip } from "@/components/business/Global/Control/components/K-Confirm/interface";
import type { MouseTip } from "@/components/business/Global/Control/components/K-MouseTip/interface";
import { useTip } from "@/components/business/Global/Control/components/K-Tip/hooks/useTip";

/** @description 查看图片 */
export const $imageView = (v: ImageViewParams) => $bus.emit("img-view", v);

/** @description 小贴士 */
export const $tip = (data: Global.Tip.Prompt) => useTip().tip(data);

/** @description 确认提示 */
export const $confirm = (data: ConfirmTip) => $bus.emit("confirm", data);

/** @description 弹窗提供输入 */
export const $input = (data: InputConfig) => $bus.emit("input", data);

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
