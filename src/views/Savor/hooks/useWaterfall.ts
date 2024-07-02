import { ref, type Ref } from "vue";

interface Params {
  /** 列数 */
  count: Ref<number>;
  /** 间距 */
  gap: number;
  /** 元素数量 */
  num: Ref<number>;
}

/** @description 瀑布流 */
const useWaterfall = (obj: Params) => {
  const { count, gap, num } = obj;

  const ExposeData = {
    /** 每个元素的 top 和 left */
    children_position: ref<{ left: number; top: number }[]>([]),
  };
  const { children_position } = ExposeData;

  const ExposeMethods = {
    updatePosition: async () => {
      if (num.value === 0) return;

      /** 记录每列高度信息 */
      const height_List: number[] = [];
      //记录最小高度列的索引及高度，决定下一个元素的填充位置
      const min_column: Record<string, number> = {
        minHeight: 0,
        minIndex: 0,
      };

      for (let i = 0; i < num.value; i++) {
        const { offsetWidth: el_width, offsetHeight: el_height } = document.querySelector(
          `#item-${i}`,
        ) as HTMLElement;
        children_position.value[i] ??= {
          left: 0,
          top: 0,
        };

        if (count.value > i) {
          //设置第一行的元素信息
          children_position.value[i].left = (el_width + gap) * i;
          children_position.value[i].top = 0;
          //更新当前列的高度信息，用于下一行计算
          height_List.push(children_position.value[i].top + el_height);
        } else {
          /** 最小高度列的高度 */
          min_column.minHeight = Math.min(...height_List);
          /** 最小高度列的索引 */
          min_column.minIndex = height_List.indexOf(min_column.minHeight);

          //通过计算出来的最小高度，将元素填充到对应列数位置
          children_position.value[i].top = min_column.minHeight + gap;
          children_position.value[i].left = (el_width + gap) * min_column.minIndex;
          height_List[min_column.minIndex] = children_position.value[i].top + el_height;
        }
      }
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useWaterfall };
