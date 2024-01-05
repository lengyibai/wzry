import { ref } from "vue";

import { SCENE_TIP } from "@/config/modules/scene-tip";
import { SettingStore } from "@/store/modules/setting";
import { AudioStore } from "@/store/modules/audio";

/** 用于触发下一个tip */
let next: any;
/** 不再提示的标识符 */
let noTipName: Global.Tip.Prompt["text"];
/** 点击按钮需要触发的函数 */
let btnFn: () => void;
/** 有时候可能不会在同一个页面使用两个tip，就无法使用then，此时需要加入执行队列，点击确定后执行下一个 */
const list: Global.Tip.Prompt[] = [];

const is_once = ref(true);
const content = ref("");
const disabled = ref(true);
const show_tip = ref(false);
const show_mask = ref(false);
const align = ref<Global.Tip.Position>("right-bottom");

/** @description 小贴士 */
const useTip = () => {
  const $settingStore = SettingStore();
  const $audioStore = AudioStore();

  const ExposeData = {
    /** 是否为只会提醒一次的 */
    is_once,
    /** 是否锁定按钮 */
    disabled,
    /** 显示小贴士 */
    show_tip,
    /** 显示蒙版 */
    show_mask,
    /** 显示内容 */
    content,
    /** 弹窗位置 */
    align,
  };

  /** @description 设置是否显示tip */
  const setShowTip = (v: boolean) => {
    //处理显示和隐藏蒙版和tip的入场顺序
    if (v) {
      show_mask.value = v;
      setTimeout(() => {
        show_tip.value = v;
      });
    } else {
      show_tip.value = v;
      setTimeout(() => {
        show_mask.value = false;
      }, 500);
    }
  };
  const ExposeMethods = {
    /** @description 推送tip */
    tip(config: Global.Tip.Prompt): Promise<void> {
      if (!$settingStore.config.tip) return Promise.resolve();
      if (show_tip.value) {
        list.push(config);
        return new Promise((resove) => {
          next = resove;
        });
      }
      const { text, createFn, align: _align = "right-bottom", btnFn: _btnFn = () => {} } = config;
      const tip_key = Object.entries(SCENE_TIP).find((item) => item[1] === text)?.[0];

      const fn = () => {
        btnFn = _btnFn;
        align.value = _align;
        content.value = text;
        setShowTip(true);
        $audioStore.play("rt25");
        setTimeout(() => {
          createFn && createFn();
        });
      };

      is_once.value = !!tip_key;

      //如果tip_key有值，表示是系统Tip，并判断是否设置了不再提示
      if (tip_key && !$settingStore.config.noTips[tip_key as keyof Global.Tip.Key]) {
        //如果是点击tip开关触发的则为空
        noTipName = tip_key === "f1y0" ? "" : tip_key;
        fn();
      } else if (!tip_key) {
        fn();
      }

      return new Promise((resove) => {
        next = resove;
      });
    },

    /** @description 设置允许点击按钮 */
    handleSetAllowClick() {
      disabled.value = false;
    },

    /** @description 点击确定后触发 */
    handleConfirm() {
      if (disabled.value) return;
      setShowTip(false);
      $audioStore.play("ba09");
      noTipName && $settingStore.setNoTip(noTipName as keyof Global.Tip.Key);

      setTimeout(() => {
        disabled.value = true;
        next && next();
        btnFn && btnFn();
        const config = list.shift();

        config && ExposeMethods.tip(config);
      }, 500);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useTip };
