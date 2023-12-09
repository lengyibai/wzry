import { ref } from "vue";

/** @description 获取屏幕帧率 */
const useGetFps = () => {
  let start = 0;
  let count = 0;

  const ExposeData = {
    /** 帧率 */
    fps: ref(0),
  };
  const { fps } = ExposeData;

  /* 获取FPS */
  (function getFPS() {
    count++;
    const current = performance.now();
    if (start === undefined) start = current;
    if (current - start >= 500) {
      fps.value = count;
      start = current;
      count = 0;
    }

    window.requestAnimationFrame(getFPS);
  })();

  return ExposeData;
};

export { useGetFps };
