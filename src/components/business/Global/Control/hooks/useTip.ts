import { ref } from "vue";

import i18n from "@/language";
import { SettingStore, AudioStore } from "@/store";
import { CONFIG } from "@/config";

export default () => {
  const $settingStore = SettingStore();
  const $audioStore = AudioStore();

  /** 显示小贴士 */
  const show_tip = ref(false);
  /** 左上角标题 */
  const title = ref("");
  /** 显示内容 */
  const content = ref("");
  /** 弹窗位置 */
  const align = ref<TipType>();
  /** 不再提示的标识符 */
  const noTipName = ref<TipKeys | string>();
  /** 是否需要按钮 */
  const btn = ref(false);
  /** 按钮文字 */
  const btn_text = ref<string>();
  /** 点击按钮需要触发的函数 */
  const btnFn = ref(() => {});

  const tip = (config: Control.Tip) => {
    const {
      title: biaoti,
      text,
      align: p = "right-bottom",
      btnText,
      btnFn: fn1 = () => {},
      createFn = () => {},
    } = config;

    //如果开启了tip
    if ($settingStore.config.tip) {
      //如果字符数超过4，则表示自定义tip
      if (text.length !== 4) {
        show_tip.value = !show_tip.value;
        $audioStore.play("rt25");
        title.value = biaoti || "";
        content.value = text;
        align.value = p;
        btn_text.value = btnText;
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
        title.value = biaoti || "";
        btn_text.value = btnText;
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
    /** 左上角标题 */
    title,
    /** 是否需要按钮 */
    btn,
    /** 按钮文字 */
    btn_text,
    /** 点击按钮需要触发的函数 */
    btnFn,
    tip,
  };
};
