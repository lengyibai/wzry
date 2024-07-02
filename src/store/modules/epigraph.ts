import { defineStore } from "pinia";
import { ref } from "vue";

import { EpigraphCollocationStore } from "./epigraphCollocation";

import { GAME_EPIGRAPH } from "@/api";
import { _cloneDeep, _search } from "@/utils/tool";

/** @description 铭文相关 */
const EpigraphStore = defineStore("epigraph", () => {
  const $epigraphCollocationStore = EpigraphCollocationStore();

  const ExposeData = {
    /** 当前显示的是铭文列表还是铭文搭配 */
    status: ref<"LIST" | "COLLOCATION">("LIST"),
    /** 当前铭文类型 */
    type: ref<Game.Epigraph.Category>("全部"),
    /** 当前铭文颜色 */
    color: ref<Game.Epigraph.Data["color"]>(),
    /** 铭文列表 */
    epigraph_list: ref<Game.Epigraph.Data[]>([]),
    /** 筛选后的列表 */
    filter_list: ref<Game.Epigraph.Data[]>([]),
  };
  const { epigraph_list, filter_list, type, color, status } = ExposeData;

  /**
   * @description 设置铭文列表
   * @param data 铭文列表
   */
  const setEpigraphList = (data: Game.Epigraph.Data[]) => {
    epigraph_list.value = data;
    ExposeMethods.setFilter("全部");
  };

  /** @description 一键排序 */
  const sortAll = () => {
    /** 类型筛选 */
    const filterType = () => {
      if (type.value === "全部") {
        filter_list.value = epigraph_list.value;
      } else {
        filter_list.value = epigraph_list.value.filter((item) => item.type.includes(type.value));
      }
    };

    /** 颜色筛选 */
    const filterColor = () => {
      if (!color.value) return;

      const colors: Record<Game.Epigraph.Data["color"], Game.Epigraph.Data[]> = {
        BLUE: [],
        GREEN: [],
        RED: [],
      };

      filter_list.value.forEach((item) => {
        colors[item.color].push(item);
      });

      filter_list.value = colors[color.value];
    };

    filterType();
    filterColor();
  };

  const ExposeMethods = {
    /** @description 设置显示铭文列表还是铭文搭配
     * @param v 设置铭文页显示组件类型
     */
    setStatus(v: "LIST" | "COLLOCATION") {
      status.value = v;
    },
    /** @description 获取铭文列表 */
    async getEpigraph() {
      const res = await GAME_EPIGRAPH.getEpigraph();
      setEpigraphList(res);
      $epigraphCollocationStore.setEpigraphListInventory(res);
    },

    /** @description 筛选显示
     * @param v 铭文类型
     */
    setFilter(v: Game.Epigraph.Category) {
      type.value = v;
      sortAll();
    },

    /** @description 筛选颜色
     * @param v 铭文颜色
     */
    filterColor(v?: Game.Epigraph.Data["color"]) {
      color.value = v;
      sortAll();
    },

    /** @description 搜索铭文
     * @param v 铭文名称
     */
    searchEpigraph(v: string) {
      /* 搜索铭文时重置下拉菜单 */
      type.value = "全部";
      color.value = undefined;
      filter_list.value = _search<Game.Epigraph.Data>(_cloneDeep(epigraph_list.value), v, ["name"]);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { EpigraphStore };
