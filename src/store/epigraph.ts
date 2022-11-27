import { defineStore } from "pinia";
import { getEpigraph } from "@/api/main/games/epigraph";
import { EpigraphStore } from "./interface";

export default defineStore("epigraph", {
  state: (): EpigraphStore.State => ({
    type: "全部",
    epigraph_list: [], //铭文列表
    filter_list: [], //筛选后的列表
  }),
  actions: {
    /** @description: 获取铭文列表 */
    getEpigraph() {
      return getEpigraph().then((res) => {
        this.setEpigraphList(res);
      });
    },

    /** @description: 设置铭文列表 */
    setEpigraphList(data: Epigraph.Data[]) {
      this.epigraph_list = data;
      this.setFilter("全部");
    },

    /** @description: 筛选显示 */
    setFilter(type: string) {
      this.type = type;
      if (type === "全部") {
        this.filter_list = this.epigraph_list;
      } else {
        this.filter_list = this.epigraph_list.filter((item) => {
          return item.type === type;
        });
      }
    },
  },
});
