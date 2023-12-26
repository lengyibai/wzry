import { defineStore } from "pinia";
import { ref } from "vue";

import { SettingStore } from "./setting";
import { AudioStore } from "./audio";

import { TIP_TEXT } from "@/config/modules/tips";

/** @description 小贴士 */
const TipStore = defineStore("tip", () => {
  const $settingStore = SettingStore();
  const $audioStore = AudioStore();

  /** 提示队列 */
  const tip_list: Global.Tip.Prompt[] = [];

  const ExposeData = {
    /** 显示小贴士 */
    show_tip: ref(false),
    /** 显示内容 */
    content: ref(""),
    /** 弹窗位置 */
    align: ref<Global.Tip.Position>("right-bottom"),
    /** 不再提示的标识符 */
    noTipName: ref<Global.Tip.Prompt["text"]>(),
    /** 是否需要按钮 */
    btn: ref(false),
    /** 点击按钮需要触发的函数 */
    btnFn: ref(() => {}),
  };
  const { show_tip, content, noTipName, align, btnFn } = ExposeData;

  const ExposeMethods = {
    /** @description 设置是否显示tip */
    setShowTip(v: boolean) {
      show_tip.value = v;
    },

    /** @description 推送tip */
    tip(config: Global.Tip.Prompt) {
      if ($settingStore.config.tip) {
        tip_list.push(config);

        if (show_tip.value) return;
        this.toTip();
      }
    },

    /** @description 输出队列中的tip */
    toTip() {
      const config = tip_list.shift();

      if (!config) return;
      const {
        text,
        align: p = "right-bottom",
        btnFn: fn1 = () => {},
        createFn = () => {},
      } = config;

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
      if (!$settingStore.config.noTips[text as keyof Global.Tip.Key<string>]) {
        show_tip.value = !show_tip.value;
        $audioStore.play("rt25");
        noTipName.value = text === "2rb7" ? undefined : text;
        content.value = TIP_TEXT[text as keyof Global.Tip.Key<string>];
        align.value = p;
        btnFn.value = fn1;
        setTimeout(() => {
          show_tip.value = true;
          createFn();
        });
      }
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { TipStore };
