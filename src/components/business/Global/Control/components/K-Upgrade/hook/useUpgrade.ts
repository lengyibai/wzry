import { ref } from "vue";

const ExposeData = {
  /** 是否显示弹窗 */
  show: ref(false),
  /** 单个经验包经验值 */
  prop_type: ref<"HERO_EXP_ONE" | "HERO_EXP_TWO">("HERO_EXP_ONE"),
};
const { show, prop_type } = ExposeData;

/** @description 英雄升级 */
const useUpgrade = () => {
  const ExposeMethods = {
    /** @description 显示弹窗 */
    openUpgrade(v: "HERO_EXP_ONE" | "HERO_EXP_TWO") {
      show.value = true;
      prop_type.value = v;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useUpgrade };
