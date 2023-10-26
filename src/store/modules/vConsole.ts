import { defineStore } from "pinia";
import { ref } from "vue";

/** @description 移动端调试工具 */
const VConsoleStore = defineStore("vConsole", () => {
  const vconsole = document.querySelector("#__vconsole") as HTMLElement;

  /** 显示 */
  let status = true;

  /** @description 控制显示或隐藏 */
  const setStatus = () => {
    status = !status;
    vconsole.style.display = status ? "block" : "none";
  };
  setStatus();

  return { setStatus };
});

export { VConsoleStore };
