import { defineStore } from "pinia";
import { ref } from "vue";

import { getEpigraphList } from "@/api/modules/games/epigraph";

/** @description 铭文相关 */
const epigraphStore = defineStore("epigraph", () => {
  const epigraph_list = ref<Epigraph.Data[]>([]); //铭文列表
  const filter_list = ref<Epigraph.Data[]>([]); //筛选后的列表

  /** @description 获取铭文列表 */
  const getEpigraph = async () => {
    const res = await getEpigraphList();
    setEpigraphList(res);
  };
  getEpigraph();

  /** @description 设置铭文列表 */
  const setEpigraphList = (data: Epigraph.Data[]) => {
    epigraph_list.value = data;
    setFilter("全部");
  };

  /** @description 筛选显示 */
  const setFilter = (type: Epigraph.Category) => {
    if (type === "全部") {
      filter_list.value = epigraph_list.value;
    } else {
      filter_list.value = epigraph_list.value.filter((item) => item.type.includes(type));
    }
  };

  return {
    /** 铭文列表 */
    epigraph_list,
    /** 筛选后的列表 */
    filter_list,
    getEpigraph,
    setEpigraphList,
    setFilter,
  };
});

export default epigraphStore;
export type EpigraphStore = ReturnType<typeof epigraphStore>;
