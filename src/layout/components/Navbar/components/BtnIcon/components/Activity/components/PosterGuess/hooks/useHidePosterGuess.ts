/** @description 隐藏侧边栏及顶部栏底部栏等，只留视频背景 */

import { ref } from "vue";

const ExposeData = {
  /** 是否隐藏全部 */
  hide_poster_guess_part: ref(false),
};
const { hide_poster_guess_part } = ExposeData;

/** @description 隐藏海报竞猜部件 */
const useHidePosterGuess = () => {
  const ExposeMethods = {
    /** @description 设置隐藏海报竞猜内容
     * @param v true: 隐藏活动部件，false: 显示活动部件
     */
    setHidePosterGuessPart(v: boolean) {
      if (v) {
        hide_poster_guess_part.value = v;
      } else {
        setTimeout(() => {
          hide_poster_guess_part.value = v;
        }, 500);
      }
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useHidePosterGuess };
