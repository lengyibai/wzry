import { defineStore } from "pinia";
import { ref } from "vue";

import { GAME_EPIGRAPH } from "@/api";

/** @description 铭文相关 */
const EpigraphStore = defineStore("epigraph", () => {
  const ExposeData = {
    /** 铭文列表 */
    epigraph_list: ref<Epigraph.Data[]>([]),
    /** 筛选后的列表 */
    filter_list: ref<Epigraph.Data[]>([]),
  };
  const { epigraph_list, filter_list } = ExposeData;

  /* 设置铭文列表 */
  const setEpigraphList = (data: Epigraph.Data[]) => {
    epigraph_list.value = data;
    ExposeMethods.setFilter("全部");
  };

  const ExposeMethods = {
    /** @description 获取铭文列表 */
    getEpigraph() {
      const res = GAME_EPIGRAPH.getEpigraph();
      setEpigraphList(res);
    },
    /** @description 筛选显示 */
    setFilter(type: Epigraph.Category) {
      if (type === "全部") {
        filter_list.value = epigraph_list.value;
      } else {
        filter_list.value = epigraph_list.value.filter((item) => item.type.includes(type));
      }
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { EpigraphStore };
