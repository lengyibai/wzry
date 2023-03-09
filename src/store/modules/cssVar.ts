import { defineStore } from "pinia";

/** @description 控制CSS变量相关(动画速率、线条、阴影、柔光) */
const cssVariableStore = defineStore("cssVariable", () => {
  const html = document.documentElement.classList;

  /** @description 设置动画速率 */
  const setSpeed = (v: 0 | 1 | 2) => {
    resetSpeed();
    if (v === 0) {
      html.add("animate-time-xx");
    } else if (v === 2) {
      html.add("animate-time-yy");
    }
  };

  /** @description 重置动画速率 */
  const resetSpeed = () => {
    html.remove("animate-time-xx");
    html.remove("animate-time-yy");
  };

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
    setSpeed,
    resetSpeed,
    setBorder,
    resetBorder,
    setShine,
    setShadow,
    resetShine,
    resetShadow,
  };
});

export default cssVariableStore;
export type CssVariableStore = ReturnType<typeof cssVariableStore>;
