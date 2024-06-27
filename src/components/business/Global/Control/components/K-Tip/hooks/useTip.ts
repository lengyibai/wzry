import { ref } from "vue";

import { SCENE_TIP } from "@/config/modules/scene-tip";
import { SettingStore } from "@/store/modules/setting";
import { usePlayAudio } from "@/hooks/modules/usePlayAudio";

/** 是否已开启队列状态 */
let queue = false;
/** 用于触发下一个tip */
let next: any;
/** 不再提示的标识符 */
let noTipName: Global.Tip.Prompt["text"];
/** 点击按钮需要触发的函数 */
let btnFn: () => void;
/** 打字结束调用 */
let done: () => void;

/** 有时候可能不会在同一个页面使用两个tip，就无法使用then，此时需要加入执行队列，点击确定后执行下一个 */
const list: Global.Tip.Prompt[] = [];

const ExposeData = {
  /** 是否为只会提醒一次的 */
  is_once: ref(false),
  /** 是否锁定按钮 */
  disabled: ref(true),
  /** 显示小贴士 */
  show_tip: ref(false),
  /** 显示蒙版 */
  show_mask: ref(false),
  /** 显示内容 */
  content: ref(""),
  /** 弹窗位置 */
  align: ref<Global.Tip.Position>("right-bottom"),
  /** 自定义按钮文字 */
  btn_text: ref(""),
  /** 蒙版是否需要颜色，在元素聚焦的时候蒙版为透明 */
  need_mask_color: ref(false),
};
const { is_once, btn_text, content, disabled, show_tip, show_mask, align, need_mask_color } =
  ExposeData;

/** @description 小贴士 */
const useTip = () => {
  const $settingStore = SettingStore();

  const { playAudio } = usePlayAudio();

  /** @description 设置是否显示tip */
  const setShowTip = async (v: boolean) => {
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
    async openTip(config: Global.Tip.Prompt): Promise<void> {
      if (!$settingStore.config.tip) return Promise.resolve();

      //如果是处于队列模式，则加入队列
      if (queue) {
        list.push(config);
        return;
      }
      queue = true;

      const {
        text,
        btnText = "确定",
        createFn,
        align: _align = "right-bottom",
        btnFn: _btnFn = () => {},
        done: _done = () => {},
        color = true,
      } = config;

      const tip_key = Object.entries(SCENE_TIP).find((item) => item[1] === text)?.[0];
      const is_no_tip = $settingStore.config.noTips[tip_key as keyof Global.Tip.Key];

      //如果是不再提示的Tip，则直接返回
      if (is_no_tip) {
        queue = false;
        return Promise.resolve();
      }

      need_mask_color.value = color;
      is_once.value = !!tip_key;

      //如果tip_key有值，表示是系统Tip，设置不再提示
      noTipName = tip_key || "";

      /* 推送Tip */
      btnFn = _btnFn;
      done = _done;
      align.value = _align;
      btn_text.value = btnText;
      content.value = text;
      setShowTip(true);
      playAudio("rt25");
      setTimeout(() => {
        createFn && createFn();
      });

      return new Promise((resolve) => {
        next = resolve;
      });
    },

    /** @description 设置允许点击按钮 */
    handleSetAllowClick() {
      disabled.value = false;
      done();
    },

    /** @description 点击确定后触发 */
    handleConfirm() {
      if (disabled.value) return;

      queue = false;
      setShowTip(false);
      playAudio("ba09");
      noTipName && $settingStore.setNoTip(noTipName as keyof Global.Tip.Key);

      setTimeout(() => {
        disabled.value = true;
        next && next();
        btnFn && btnFn();

        const config = list.shift();
        config && ExposeMethods.openTip(config);
      }, 500);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useTip };
