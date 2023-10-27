import { ref } from "vue";

/** @description 获取屏幕帧率 */
const useGetFps = () => {
  let start = 0;
  let count = 0;

  const fps = ref(0);

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

  return {
    fps,
  };
};

export { useGetFps };
