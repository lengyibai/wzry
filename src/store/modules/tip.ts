import { defineStore } from "pinia";
import { ref } from "vue";

import { SettingStore } from "./setting";
import { AudioStore } from "./audio";

import { CONFIG } from "@/config";

/** @description 小贴士 */
const TipStore = defineStore("tip", () => {
  const $settingStore = SettingStore();
  const $audioStore = AudioStore();

  /** 显示小贴士 */
  const show_tip = ref(false);
  /** 显示内容 */
  const content = ref("");
  /** 弹窗位置 */
  const align = ref<TipType>("right-bottom");
  /** 不再提示的标识符 */
  const noTipName = ref<Control.Tip["text"]>();
  /** 是否需要按钮 */
  const btn = ref(false);
  /** 点击按钮需要触发的函数 */
  const btnFn = ref(() => {});
  /** 提示队列 */
  const tip_list = ref<Control.Tip[]>([]);

  /** @description 设置是否显示tip */
  const setShowTip = (v: boolean) => {
    show_tip.value = v;
  };

  /** @description 推送tip */
  const tip = (config: Control.Tip) => {
    if ($settingStore.config.tip) {
      tip_list.value.push(config);

      if (show_tip.value) return;
      toTip();
    }
  };

  /** @description 输出队列中的tip */
  const toTip = () => {
    const config = tip_list.value.shift();

    if (!config) return;
    const { text, align: p = "right-bottom", btnFn: fn1 = () => {}, createFn = () => {} } = config;

    //如果字符数超过4，则表示自定义tip
    if (text.length !== 4) {
      show_tip.value = !show_tip.value;
      $audioStore.play("rt25");
      content.value = text;
      align.value = p;
      btnFn.value = fn1;
      setTimeout(() => {
        show_tip.value = true;
        createFn();
      });

      return;
    }

    //判断是否设置了不再提示
    if (!$settingStore.config.noTips[text as TipKeys]) {
      show_tip.value = !show_tip.value;
      $audioStore.play("rt25");
      noTipName.value = text === "2rb7" ? undefined : text;
      content.value = CONFIG.TIP_TEXT[text as TipKeys];
      align.value = p;
      btnFn.value = fn1;
      setTimeout(() => {
        show_tip.value = true;
        createFn();
      });
    }
  };

  return {
    /** 显示小贴士 */
    show_tip,
    /** 显示内容 */
    content,
    /** 弹窗位置 */
    align,
    /** 不再提示的标识符 */
    noTipName,
    /** 是否需要按钮 */
    btn,
    /** 点击按钮需要触发的函数 */
    btnFn,
    tip,
    toTip,
    setShowTip,
  };
});

export { TipStore };
