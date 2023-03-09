import { defineStore } from "pinia";
import { ref } from "vue";

/** @description 移动端调试工具 */
const vConsoleStore = defineStore("vConsole", () => {
  const vconsole = document.querySelector("#__vconsole") as HTMLElement;

  const status = ref(true); //显示

  /** @description 控制显示或隐藏 */
  const setStatus = () => {
    status.value = !status.value;
    vconsole.style.display = status.value ? "block" : "none";
  };
  setStatus();

  return { setStatus };
});

export default vConsoleStore;
export type VConsoleStore = ReturnType<typeof vConsoleStore>;
