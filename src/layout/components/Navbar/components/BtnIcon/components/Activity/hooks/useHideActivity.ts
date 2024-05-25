import { ref } from "vue";

const ExposeData = {
  /** 用于隐藏活动部件 */
  hide_activity_part: ref(false),
};
const { hide_activity_part } = ExposeData;

/** @description 当进入游戏时需要做的操作 */
const useIntoGame = () => {
  const ExposeMethods = {
    /** @description 设置隐藏活动页面部件
     * @param v true: 隐藏活动部件，false: 显示活动部件
     */
    setHideActivityPart(v: boolean) {
      if (v) {
        hide_activity_part.value = v;
      } else {
        hide_activity_part.value = v;
      }
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useIntoGame };
