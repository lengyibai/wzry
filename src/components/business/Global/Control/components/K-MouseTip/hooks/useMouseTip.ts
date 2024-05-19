import _debounce from "lodash/debounce";
import { ref } from "vue";

import { MouseTip } from "../interface";

let timer: NodeJS.Timeout;

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
  type: ref<"NORMAL" | "INPUT">("NORMAL"),
};
const { show, tip, type, downing, show_tip, disabled, is_click } = ExposeData;

/** @description 鼠标悬浮提示 */
const useMouseTip = () => {
  const ExposeMethods = {
    /** @description 鼠标悬浮提示 */
    openMouseTip: _debounce((v: MouseTip) => {
      if (downing.value) return;
      //解决某些元素销毁时会直接隐藏掉正常显示的Tip
      show.value = false;
      show_tip.value = false;
      is_click.value = false;

      clearTimeout(timer);
      timer = setTimeout(() => {
        show.value = true;
        show_tip.value = v.show;
        tip.value = v.text || "";
        type.value = v.type || "NORMAL";
        disabled.value = !!v.disabled;
      }, 100);
    }, 100),
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useMouseTip };
