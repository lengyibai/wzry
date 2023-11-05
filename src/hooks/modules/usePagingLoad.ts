import { ref } from "vue";

/** @description 分页加载 */
const usePagingLoad = <T>() => {
  /** 当前页数 */
  let page = 0;
  /** 总页数 */
  let page_total = 0;
  /** 一页个数 */
  const page_count = 25;

  /** 滚动坐标 */
  const scroll = ref(0);
  /** 完整数据列表 */
  const all_data = ref<T[]>([]);
  /** 筛选后的数据列表 */
  const filter_list = ref<T[]>([]);
  /** 展示的数据列表 */
  const show_list = ref<T[]>([]);

  /**
   * @description: 设置滚动坐标
   * @param v y轴坐标
   */
  const setScroll = (v: number) => {
    scroll.value = v;
  };

  /** @description 重新计算分页 */
  const resetPage = () => {
    page = 0;
    show_list.value = [];
    show_list.value = filter_list.value.slice(page * page_count, (page + 1) * page_count);
    page_total = Math.round(filter_list.value.length / page_count);
  };

  /** @description 加载更多 */
  const loadMore = () => {
    if (page_total > page) {
      page += 1;
      show_list.value.push(...filter_list.value.slice(page * page_count, (page + 1) * page_count));
    }
  };

  return {
    /** 滚动坐标 */
    scroll,
    /** 完整数据列表 */
    all_data,
    /** 筛选后的数据列表 */
    filter_list,
    /** 展示的数据列表 */
    show_list,
    resetPage,
    loadMore,
    setScroll,
  };
};

export { usePagingLoad };
