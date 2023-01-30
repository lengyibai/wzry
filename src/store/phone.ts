import { defineStore } from "pinia";
import { ref } from "vue";

const phoneStore = defineStore("phone", () => {
  const vertical = ref(false); //是否为移动端
  const width = ref(0); // 宽度
  const height = ref(0); // 宽度
  const fps = ref(0);

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
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  tip();
  window.addEventListener("resize", () => {
    tip();
  });

  return { vertical, width, height, fps };
});

export default phoneStore;
export type PhoneStore = ReturnType<typeof phoneStore>;
