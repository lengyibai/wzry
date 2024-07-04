import { nextTick, ref, watch, type Ref } from "vue";
import _debounce from "lodash/debounce";

const useNewWaterfall = <T>(
  data: Ref<T[]>,
  columnRefs: Ref<HTMLElement[] | undefined>,
  column_count: Ref<number>,
) => {
  /** 每列数据 */
  const column_data = ref<Record<number, T[]>>({});

  Array(column_count.value)
    .fill(null)
    .forEach((_, index) => {
      column_data.value[index + 1] = [];
    });

  /** @获取最小列数 **/
  const getMinHeightColumnNum = () => {
    return new Promise<number>((resolve) => {
      let min_index = 0;
      let min_height = Infinity;
      columnRefs.value!.forEach((item, index) => {
        if (item.offsetHeight < min_height) {
          min_height = item.offsetHeight;
          min_index = index + 1;
        }
      });
      resolve(min_index);
    });
  };

  /** @重新计算分配每列元素数量 **/
  const debounceUpdate = _debounce(async () => {
    // 清空现有的列数据
    Array(column_count.value)
      .fill(null)
      .forEach((_, index) => {
        column_data.value[index + 1] = [];
      });

    // 重新分配每列的元素数量
    for (let i = 0; i < data.value.length; i++) {
      const min_index = await getMinHeightColumnNum();
      column_data.value[min_index].push(data.value[i]);
    }
  }, 500);

  const recalculateColumnData = () => {
    debounceUpdate();
  };

  /** @图片加载成功 **/
  const onLoadImage = async () => {
    // 图片加载完成后重新计算分配每列元素数量
    await nextTick();
    const min_index = await getMinHeightColumnNum();
    loadNextItem(min_index);
  };

  /** @加载下一个元素 **/
  const loadNextItem = (index: number) => {
    const totalLength = Object.values(column_data.value).flat().length;
    if (totalLength === data.value.length) return;
    column_data.value[index].push(data.value[totalLength]);
  };

  // 监听 data.value 的变化
  watch(data, () => {
    recalculateColumnData();
  });

  return {
    column_data,
    recalculateColumnData,
    onLoadImage,
  };
};

export { useNewWaterfall };
