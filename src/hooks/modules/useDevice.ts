import { ref } from "vue";

import { _browserV, _debounce } from "@/utils/tool";

const ExposeData = {
  /** 浏览器名称 */
  browser_name: _browserV.browser,
  /** 浏览器版本 */
  browser_version: _browserV.version,
  /** 满足浏览器访问条件 */
  browser_status: false,

  /** 是否为竖屏 */
  vertical: ref(false),
  /** 设备宽度 */
  width: ref(0),
  /** 设备高度 */
  height: ref(0),
};
const { vertical, width, height, browser_name, browser_version } = ExposeData;

//判断浏览器是否满足条件
ExposeData.browser_status = ["chrome", "firefox"].includes(browser_name)
  ? browser_version >= 90
  : browser_version >= 15;

/** @description 判断手机是否竖屏 */
const debounceTip = _debounce(() => {
  vertical.value = window.innerWidth < window.innerHeight;
  width.value = window.innerWidth;
  height.value = window.innerHeight;
}, 250);
debounceTip();

window.addEventListener("resize", debounceTip);

/** @description 浏览器信息 */
const useDevice = () => {
  return {
    ...ExposeData,
  };
};

export { useDevice };
