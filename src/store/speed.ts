import { defineStore } from "pinia";

const speedStore = defineStore("speed", () => {
  const html = document.documentElement.classList;

  /** @description: 设置动画速率 */
  const setSpeed = (v: 0 | 1 | 2) => {
    resetSpeed();
    if (v === 0) {
      html.add("animate-time-xx");
    } else if (v === 2) {
      html.add("animate-time-yy");
    }
  };

  /** @description: 重置动画速率 */
  const resetSpeed = () => {
    html.remove("animate-time-xx");
    html.remove("animate-time-yy");
  };

  return { setSpeed, resetSpeed };
});

export default speedStore;
export type SpeedStore = ReturnType<typeof speedStore>;
