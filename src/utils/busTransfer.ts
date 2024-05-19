import type { ImageViewParams } from "./interface";
import { $bus } from "./eventBus";

import type { InputConfig } from "@/components/business/Global/Control/components/K-InputDialog/interface";
import type { ConfirmTip } from "@/components/business/Global/Control/components/K-Confirm/interface";
import type { MouseTip } from "@/components/business/Global/Control/components/K-MouseTip/interface";
import { useTip } from "@/components/business/Global/Control/components/K-Tip/hooks/useTip";
import { BuyProp } from "@/components/business/Global/Control/components/K-BuyProp/interface";
import { HelpParams } from "@/components/business/Global/Control/components/K-Help/interface";
import { OptionalMode } from "@/components/business/Global/Control/components/K-Optional/interface";
import { useBuyProp } from "@/components/business/Global/Control/components/K-BuyProp/hooks/useBuyProp";
import { useOptional } from "@/components/business/Global/Control/components/K-Optional/hooks/useOptional";
import { useBatchProp } from "@/components/business/Global/Control/components/K-BatchProp/hooks/useBatchProp";
import { useHeroDetail } from "@/components/business/Global/Control/components/K-HeroDetail/hooks/useHeroDetail";
import { useInput } from "@/components/business/Global/Control/components/K-InputDialog/hooks/useInput";
import { useHelp } from "@/components/business/Global/Control/components/K-Help/hooks/useHelp";
import { useUpgrade } from "@/components/business/Global/Control/components/K-Upgrade/hook/useUpgrade";
import { ObtainInfo } from "@/components/business/Global/Control/components/K-Obtain/interface";
import { useObtain } from "@/components/business/Global/Control/components/K-Obtain/hooks/useObtain";
import { useConfirm } from "@/components/business/Global/Control/components/K-Confirm/hooks/useConfirm";
import { useMessage } from "@/components/business/Global/Control/components/K-Message/hooks/useMessage";
import { useMouseTip } from "@/components/business/Global/Control/components/K-MouseTip/hooks/useMouseTip";
import { useSelectAvatar } from "@/components/business/Global/Control/components/K-SelectAvatar/hooks/useSelectAvatar";

/** @description 元素聚焦 */
export const $focus = {
  show(el: HTMLElement) {
    $bus.emit("focus", el);
  },
  close() {
    $bus.emit("focus");
  },
};

/** @description 查看图片 */
export const $imageView = (v: ImageViewParams) => $bus.emit("img-view", v);

/** @description 小贴士 */
export const $tip = (data: Global.Tip.Prompt) => useTip().openTip(data);

/** @description 确认提示 */
export const $confirm = (data: ConfirmTip) => useConfirm().openConfirm(data);

/** @description 获得物品弹窗 */
export const $obtain = (data: ObtainInfo | ObtainInfo[], onClose?: () => void) =>
  useObtain().openObtain(data, onClose);

/** @description 购买道具弹窗 */
export const $buyProp = (data: BuyProp) => useBuyProp().openBuyProp(data);

/** @description 自选英雄弹窗 */
export const $optional = (mode: OptionalMode) => useOptional().openOptional(mode);

/** @description 批量使用道具弹窗 */
export const $batchProp = (key: Game.PropKey) => useBatchProp().openBatchProp(key);

/** @description 英雄详情页 */
export const $heroDetail = (id?: number) => useHeroDetail().openHeroDetail(id);

/** @description 弹窗提供输入 */
export const $input = (data: InputConfig) => useInput().openInput(data);

/** @description 帮助弹窗 */
export const $help = (params: HelpParams) => useHelp().openHelp(params);

/** @description 选择头像 */
export const $selectAvatar = (confirm: (base64: string) => void) =>
  useSelectAvatar().openSelectAvatar(confirm);

/** @description 升级英雄弹窗 */
export const $upgrade = (type: "HERO_EXP_ONE" | "HERO_EXP_TWO") => useUpgrade().openUpgrade(type);

/** @description 消息提醒 */
export const $message = (text: string, type?: Global.Message.Status) =>
  useMessage().openMsg(text, type);

/** @description 鼠标悬浮提示 */
export const $mouseTip = {
  show(data: Omit<MouseTip, "show">) {
    useMouseTip().openMouseTip({
      ...data,
      show: true,
    });
  },
  close() {
    useMouseTip().openMouseTip({
      show: false,
    });
  },
};
