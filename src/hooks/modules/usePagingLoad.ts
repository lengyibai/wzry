import { nextTick, ref } from "vue";

/** @description 分页加载 */
const usePagingLoad = <T>() => {
  /** 当前页数 */
  let page = 1;
  /** 总页数 */
  let page_total = 0;
  /** 一页个数 */
  const page_count = 25;

  /** 滚动坐标 */
  const scroll = ref(0);
  /** 暂无更多 */
  const finish = ref(false);
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
    page = 1;
    show_list.value = [];
    nextTick(() => {
      show_list.value = filter_list.value.slice(0, page * page_count);
      page_total = Math.ceil(filter_list.value.length / page_count);
    });
  };

  /** @description 加载更多 */
  const loadMore = () => {
    setTimeout(() => {
      if (page_total > page) {
        show_list.value.push(
          ...filter_list.value.slice(page * page_count, (page + 1) * page_count),
        );
        page += 1;
      } else {
        finish.value = true;
      }
    }, 250);
  };

  return {
    /** 滚动坐标 */
    scroll,
    /** 暂无更多 */
    finish,
    /** 完整数据列表 */
    all_data,
    /** 筛选后的数据列表 */
    filter_list,
    /** 展示的数据列表 */
    show_list,
    /** 一页个数 */
    page_count,
    resetPage,
    loadMore,
    setScroll,
  };
};

export { usePagingLoad };
