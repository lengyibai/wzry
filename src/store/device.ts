import { defineStore } from "pinia";
import { ref } from "vue";

import { $browserV } from "@/utils";

/** @description 设备信息 */
const deviceStore = defineStore("phone", () => {
  const browser_name = $browserV.browser; //浏览器名称
  const browser_version = $browserV.version; //浏览器版本
  const browser_status = ["chrome", "firefox"].includes(browser_name) ? browser_version >= 90 : browser_version >= 15; //满足浏览器访问条件

  const vertical = ref(false); //是否为竖屏
  const width = ref(0); //设备宽度
  const height = ref(0); //设备高度
  const fps = ref(0); //帧率

  /* 获取设备帧率 */
  let start = 0;
  let count = 0;
  const getFPS = () => {
    count++;
    const current = performance.now();
    if (start === undefined) start = current;
    if (current - start >= 500) {
      fps.value = count;
      start = current;
      count = 0;
    }
    window.requestAnimationFrame(getFPS);
  };
  getFPS();

  /* 判断手机是否竖屏 */
  const tip = () => {
    vertical.value = window.innerWidth < window.innerHeight;
    width.value = ~~(window.innerWidth * 0.6);
    height.value = ~~(window.innerHeight * 0.6);
  };
  tip();
  window.addEventListener("resize", () => {
    tip();
  });

  return {
    /** 是否为移动端 */
    vertical,
    /** 设备宽度 */
    width,
    /** 设备高度 */
    height,
    /** 帧率 */
    fps,
    /** 浏览器名称 */
    browser_name,
    /** 浏览器版本 */
    browser_version,
    /** 满足浏览器访问条件 */
    browser_status,
  };
});

export default deviceStore;
export type deviceStore = ReturnType<typeof deviceStore>;
