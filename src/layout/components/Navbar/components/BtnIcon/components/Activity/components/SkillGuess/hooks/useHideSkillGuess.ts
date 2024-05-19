/** @description 隐藏侧边栏及顶部栏底部栏等，只留视频背景 */

import { ref } from "vue";

const hide_all = ref(false);

const useHideSkillGuess = () => {
  const ExposeData = {
    /** 是否隐藏全部 */
    hide_all,
  };

  const ExposeMethods = {
    /** @description 设置隐藏技能竞猜内容 */
    setHideStatus(v: boolean) {
      if (v) {
        hide_all.value = v;
      } else {
        setTimeout(() => {
          hide_all.value = v;
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
