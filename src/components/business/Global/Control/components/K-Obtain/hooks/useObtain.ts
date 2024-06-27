import { ref } from "vue";

import type { ObtainInfo } from "../interface";

import { KnapsackStore } from "@/store/modules/knapsack";
import { _isArray } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";

/** 关闭弹窗函数 */
let onClose: (() => void) | undefined;

const ExposeData = {
  /** 是否显示 */
  show: ref(false),
  /** 显示背景 */
  show_bg: ref(false),
  /** 物品信息 */
  prop_list: ref<ObtainInfo[]>(),
};
const { show, show_bg, prop_list } = ExposeData;

/** @description 获得物品弹窗 */
const useObtain = () => {
  const $knapsackStore = KnapsackStore();

  const { playAudio } = usePlayAudio();

  const ExposeMethods = {
    /** @description 显示弹窗
     * @param article 物品信息
     * @param closeFn 弹窗点击关闭时立即调用
     */
    openObtain(article: ObtainInfo | ObtainInfo[], closeFn?: () => void) {
      onClose = closeFn;
      playAudio("jo36");
      show.value = true;

      if (!_isArray(article)) {
        prop_list.value = [article as ObtainInfo];
      } else {
        prop_list.value = article as ObtainInfo[];
      }

      prop_list.value.forEach((item) => {
        //有可能获得的是英雄及皮肤，所以可能没有key
        if (item.key) {
          $knapsackStore.setGamePropNum(item.key, item.num || 1, "ADD");
        }
      });

      setTimeout(() => {
        show_bg.value = true;
      }, 100);
    },

    /** @description 关闭弹窗 */
    closeObtain() {
      show.value = false;
      show_bg.value = false;
      prop_list.value = undefined;
      playAudio("pj83");
      onClose?.();
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useObtain };
