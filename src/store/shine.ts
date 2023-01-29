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

  /** @description: 重置动画速率 */
  const resetShine = () => {
    html.remove("soft-light");
  };

  return { setShine, resetShine };
});

export default shineStore;
export type ShineStore = ReturnType<typeof shineStore>;
