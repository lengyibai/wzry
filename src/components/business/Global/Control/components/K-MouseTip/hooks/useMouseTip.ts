import { ref } from "vue";

import { MouseTip } from "../interface";

const ExposeData = {
  /** 是否显示 */
  show: ref(true),
  /** 提示文字 */
  tip: ref(""),
  /** 是否处于按下状态 */
  downing: ref(false),
  /** 是否显示tip */
  show_tip: ref(false),
  /** 是否处于禁用状态 */
  disabled: ref(false),
  /** 是否已经点击过了 */
  is_click: ref(false),
  /** tip类型 */
  type: ref<MouseTip["type"]>("NORMAL"),
};
const { show, tip, type, downing, show_tip, disabled, is_click } = ExposeData;

/** @description 鼠标悬浮提示 */
const useMouseTip = () => {
  const ExposeMethods = {
    /** @description 鼠标悬浮提示 */
    openMouseTip: (v: MouseTip) => {
      if (downing.value) return;
      is_click.value = false;
      show.value = true;
      show_tip.value = v.show;
      tip.value = v.text || "";
      type.value = v.type || "NORMAL";
      disabled.value = !!v.disabled;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useMouseTip };
