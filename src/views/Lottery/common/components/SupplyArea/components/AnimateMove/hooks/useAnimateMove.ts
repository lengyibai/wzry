import { ref, Ref, computed } from "vue";

import { GAME_PROP } from "@/config";
import { _getImgLink } from "@/utils/concise";

/** @description loading动画 */
const useAnimateMove = (el: Ref<HTMLElement | undefined>) => {
  /** 道具图片 */
  const imgs = [
    GAME_PROP.DIAMOND,
    GAME_PROP.HONOR_CRYSTAL,
    GAME_PROP.SKIN_BRAVE_TREASURE,
    GAME_PROP.SKIN_CARD_INITIAL,
    GAME_PROP.SKIN_DEBRIS,
    GAME_PROP.SKIN_EPIC_TREASURE,
    GAME_PROP.SKIN_LEGEND_TREASURE,
    GAME_PROP.SKIN_LIMIT_TREASURE,
    GAME_PROP.SKIN_LOTTERY_STONE,
  ].map((item) => _getImgLink(item.iconName));
  /** 图片展示索引 */
  const index = ref(0);
  /** 动画定时器 */
  const timer: Record<"left" | "top", (NodeJS.Timeout | number)[]> = {
    left: [0, 0],
    top: [0, 0],
  };

  const img = computed(() => imgs[index.value]);

  /** 设置随机索引 */
  const setRandom = () => {
    index.value++;
    if (index.value >= imgs.length) {
      index.value = 0;
    }
  };

  /** 元素移动动画 */
  const moveElement = (type: "left" | "top", duration: number) => {
    if (!el.value) return;
    setRandom();

    el.value.style[type] = `calc(100% - ${el.value.offsetWidth / 16}rem)`;
    timer[type][0] = setTimeout(() => {
      if (!el.value) return;
      setRandom();
      el.value.style[type] = "0%";
      timer[type][1] = setTimeout(() => {
        moveElement(type, duration);
      }, duration);
    }, duration);
  };
  const xMove = () => moveElement("left", 7200);
  const yMove = () => moveElement("top", 4600);

  /** @description 开始动画 */
  const startAnimate = () => {
    el.value!.style.left = "0%";
    el.value!.style.top = "0%";
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
    startAnimate,
    clearAnimate,
  };
};

export { useAnimateMove };
