import { defineStore } from "pinia";

const shineStore = defineStore("shine", () => {
  const html = document.documentElement.classList;

  /** @description: 设置柔光 */
  const setShine = (v: boolean) => {
    resetShine();
    if (v) {
      html.add("soft-light");
    } else {
      resetShine();
    }
  };

  /** @description: 重置柔光 */
  const resetShine = () => {
    html.remove("soft-light");
  };

  /** @description: 设置阴影 */
  const setShadow = (v: boolean) => {
    resetShadow();
    if (v) {
      html.add("tbd-shadow");
    } else {
      resetShadow();
    }
  };

  /** @description: 重置阴影 */
  const resetShadow = () => {
    html.remove("tbd-shadow");
  };

  return { setShine, setShadow, resetShine, resetShadow };
});

export default shineStore;
export type ShineStore = ReturnType<typeof shineStore>;
