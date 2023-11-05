import { defineStore } from "pinia";

/** @description 控制CSS变量相关(线条、阴影、柔光) */
const CssVarStore = defineStore("cssVariable", () => {
  const html = document.documentElement.classList;

  /** @description 设置线条 */
  const setBorder = (v: boolean) => {
    resetBorder();

    if (v) {
      html.add("border-line");
    } else {
      resetBorder();
    }
  };

  /** @description 重置线条 */
  const resetBorder = () => {
    html.remove("border-line");
  };

  /** @description 设置阴影 */
  const setShadow = (v: boolean) => {
    resetShadow();

    if (v) {
      html.add("tbd-shadow");
    } else {
      resetShadow();
    }
  };

  /** @description 重置阴影 */
  const resetShadow = () => {
    html.remove("tbd-shadow");
  };

  /** @description 设置柔光 */
  const setShine = (v: boolean) => {
    resetShine();
    if (v) {
      html.add("soft-light");
    } else {
      resetShine();
    }
  };

  /** @description 重置柔光 */
  const resetShine = () => {
    html.remove("soft-light");
  };

  return {
    setBorder,
    resetBorder,
    setShine,
    setShadow,
    resetShine,
    resetShadow,
  };
});

export { CssVarStore };
