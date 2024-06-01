import { nextTick, ref } from "vue";

/** @description 分页加载 */
const usePagingLoad = <T>() => {
  /** 当前页数 */
  let page = 1;
  /** 总页数 */
  let page_total = 0;

  const ExposeData = {
    /** 一页个数 */
    page_count: 25,

    /** 滚动坐标 */
    scroll: ref(0),
    /** 是否处于加载中 */
    loading: ref(false),
    /** 暂无更多 */
    finish: ref(false),
    /** 完整数据列表 */
    all_data: ref<T[]>([]),
    /** 筛选后的数据列表 */
    filter_list: ref<T[]>([]),
    /** 展示的数据列表 */
    show_list: ref<T[]>([]),
  };
  const { all_data, scroll, loading, finish, filter_list, show_list, page_count } = ExposeData;

  const ExposeMethods = {
    /** @description 设置滚动坐标
     * @param v 滚动坐标
     */
    setScroll(v: number) {
      scroll.value = v;
    },

    /** @description 设置全部数据
     * @param v 全部数据
     */
    pushAllData(v: T[]) {
      (all_data.value as T[]) = v;
    },

    /** @description 设置筛选后的数据
     * @param v 筛选后的数据
     */
    setFilterData(v: T[]) {
      (filter_list.value as T[]) = v;
    },

    /** @description 将筛选后的列表反向排序 */
    reverseFilterData() {
      filter_list.value.reverse();
    },

    /** @description 重新计算分页 */
    resetPage() {
      page = 1;
      finish.value = false;
      show_list.value = [];
      nextTick(() => {
        show_list.value = filter_list.value.slice(0, page * page_count);
        page_total = Math.ceil(filter_list.value.length / page_count);
      });
    },

    /** @description 加载更多 */
    loadMore() {
      return new Promise<void>((resolve, reject) => {
        //处于加载中或列表加载完毕时禁止触发加载更多，避免消耗
        if (loading.value || finish.value) {
          reject();
          return;
        }

        loading.value = true;

        setTimeout(() => {
          if (page_total > page) {
            const getCurrentPageData = filter_list.value.slice(
              page * page_count,
              (page + 1) * page_count,
            );
            show_list.value.push(...getCurrentPageData);
            page += 1;
          } else if (filter_list.value.length === show_list.value.length) {
            finish.value = true;
          }
          loading.value = false;
          resolve();
        }, 250);
      });
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { usePagingLoad };
