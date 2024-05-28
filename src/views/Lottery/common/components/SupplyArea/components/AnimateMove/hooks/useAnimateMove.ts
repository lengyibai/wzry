import { ref, computed } from "vue";

import { GAME_PROP } from "@/config";
import { _getPropLink } from "@/utils/concise";

/** @description loading动画 */
const useAnimateMove = () => {
  /** 道具图片 */
  const imgs: string[] = [];
  /** 动画定时器 */
  const timer: Record<"left" | "top", (NodeJS.Timeout | number)[]> = {
    left: [0, 0],
    top: [0, 0],
  };

  const circularRef = ref<HTMLElement>();

  /** 图片展示索引 */
  const index = ref(0);

  /** 移动的道具图片 */
  const img = computed(() => imgs[index.value]);

  for (const k in GAME_PROP.ICON) {
    imgs.push(_getPropLink(GAME_PROP.ICON[k as Game.PropKey]));
  }

  /** @description 设置随机索引 */
  const setRandom = () => {
    index.value++;
    if (index.value >= imgs.length) {
      index.value = 0;
    }
  };

  /** @description 元素移动动画
   * @param type 移动方向
   * @param duration 持续时间
   */
  const moveElement = (type: "left" | "top", duration: number) => {
    if (!circularRef.value) return;
    setRandom();

    circularRef.value.style[type] = `calc(100% - ${circularRef.value.offsetWidth / 16}rem)`;
    timer[type][0] = setTimeout(() => {
      if (!circularRef.value) return;
      setRandom();
      circularRef.value.style[type] = "0%";
      timer[type][1] = setTimeout(() => {
        moveElement(type, duration);
      }, duration);
    }, duration);
  };
  const xMove = () => moveElement("left", 7200);
  const yMove = () => moveElement("top", 4600);

  /** @description 开始动画 */
  const startAnimate = () => {
    circularRef.value!.style.left = "0%";
    circularRef.value!.style.top = "0%";
    setTimeout(() => {
      xMove();
      yMove();
    }, 10);
  };

  /** @description 清除动画 */
  const clearAnimate = () => {
    [...timer.left, ...timer.top].forEach((item) => {
      clearTimeout(item);
    });
  };

  return {
    img,
    circularRef,
    startAnimate,
    clearAnimate,
  };
};

export { useAnimateMove };
