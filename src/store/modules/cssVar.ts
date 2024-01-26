import { defineStore } from "pinia";

/** @description 控制CSS变量相关(线条、阴影、柔光) */
const CssVarStore = defineStore("cssVariable", () => {
  const html = document.documentElement.classList;

  const ExposeMethods = {
    /** @description 设置阴影 */
    setShadow(v: boolean) {
      this.resetShadow();

      if (v) {
        html.add("tbd-shadow");
      } else {
        this.resetShadow();
      }
    },

    /** @description 重置阴影 */
    resetShadow() {
      html.remove("tbd-shadow");
    },

    /** @description 设置柔光 */
    setShine(v: boolean) {
      this.resetShine();
      if (v) {
        html.add("soft-light");
      } else {
        this.resetShine();
      }
    },

    /** @description 重置柔光 */
    resetShine() {
      html.remove("soft-light");
    },
  };

  return ExposeMethods;
});

export { CssVarStore };
