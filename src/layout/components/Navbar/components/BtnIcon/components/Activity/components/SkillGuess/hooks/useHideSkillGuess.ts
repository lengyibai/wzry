/** @description 隐藏侧边栏及顶部栏底部栏等，只留视频背景 */

import { ref } from "vue";

const ExposeData = {
  /** 隐藏技能竞猜部件 */
  hide_skill_guess_part: ref(false),
};
const { hide_skill_guess_part } = ExposeData;

/** @description 隐藏活动竞猜部件 */
const useHideSkillGuess = () => {
  const ExposeMethods = {
    /** @description 设置隐藏技能竞猜内容
     * @param v true: 隐藏活动部件，false: 显示活动部件
     */
    setHideSkillGuessPart(v: boolean) {
      if (v) {
        hide_skill_guess_part.value = v;
      } else {
        setTimeout(() => {
          hide_skill_guess_part.value = v;
        }, 500);
      }
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useHideSkillGuess };
