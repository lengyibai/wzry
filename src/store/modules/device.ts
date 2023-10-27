import { defineStore } from "pinia";
import { ref } from "vue";
import { onScopeDispose } from "vue";

import { $bus, $tool } from "@/utils";

/** @description 设备信息 */
const DeviceStore = defineStore("device", () => {
  /** 浏览器名称 */
  const browser_name = $tool.browserV.browser;
  /** 浏览器版本 */
  const browser_version = $tool.browserV.version;
  /** 满足浏览器访问条件 */
  const browser_status = ["chrome", "firefox"].includes(browser_name) ? browser_version >= 90 : browser_version >= 15;

  /** 是否为竖屏 */
  const vertical = ref(false);
  /** 设备宽度 */
  const width = ref(0);
  /** 设备高度 */
  const height = ref(0);

  /* 判断手机是否竖屏 */
  const tip = () => {
    vertical.value = window.innerWidth < window.innerHeight;
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };
  tip();

  $bus.on("resize", () => {
    tip();
  });

  onScopeDispose(() => {
    $bus.off("resize");
  });

  return {
    /** 是否为移动端 */
    vertical,
    /** 设备宽度 */
    width,
    /** 设备高度 */
    height,
    /** 浏览器名称 */
    browser_name,
    /** 浏览器版本 */
    browser_version,
    /** 满足浏览器访问条件 */
    browser_status,
  };
});

export { DeviceStore };
