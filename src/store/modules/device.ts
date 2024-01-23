import { defineStore } from "pinia";
import { ref } from "vue";

import { $tool } from "@/utils";

/** @description 设备信息 */
const DeviceStore = defineStore("device", () => {
  const ExposeData = {
    /** 浏览器名称 */
    browser_name: $tool.browserV.browser,
    /** 浏览器版本 */
    browser_version: $tool.browserV.version,
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

  ExposeData.browser_status = ["chrome", "firefox"].includes(browser_name)
    ? browser_version >= 90
    : browser_version >= 15;

  /* 判断手机是否竖屏 */
  const tip = () => {
    vertical.value = window.innerWidth < window.innerHeight;
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };
  tip();

  window.addEventListener("resize", tip);

  return ExposeData;
});

export { DeviceStore };
