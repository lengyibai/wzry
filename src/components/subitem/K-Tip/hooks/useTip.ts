import { ref } from "vue";

import { SettingStore, AudioStore } from "@/store";
import { CONFIG } from "@/config";

export default () => {
  const $settingStore = SettingStore();
  const $audioStore = AudioStore();

  /** 显示小贴士 */
  const show_tip = ref(false);
  /** 显示内容 */
  const content = ref("");
  /** 弹窗位置 */
  const align = ref<TipType>("right-bottom");
  /** 不再提示的标识符 */
  const noTipName = ref<TipKeys | string>();
  /** 是否需要按钮 */
  const btn = ref(false);
  /** 点击按钮需要触发的函数 */
  const btnFn = ref(() => {});

  const tip = (config: Control.Tip) => {
    const { text, align: p = "right-bottom", btnFn: fn1 = () => {}, createFn = () => {} } = config;

    //如果开启了tip
    if ($settingStore.config.tip) {
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

      //如果已经设置了不再提示
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
  };
};
