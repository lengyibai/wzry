import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";

import type { EpigraphCollocationStoreType } from "../interface";

import { AuthStore } from "./auth";

import { _cloneDeep, _typeSort, dayjs } from "@/utils/tool";

/** @description 铭文搭配 */
const EpigraphCollocationStore = defineStore("epigraphCollocation", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 侧边栏状态 */
    sidebar_status: ref<EpigraphCollocationStoreType.SidebarStatus>("INVENTORY"),
    /** 当前展示的铭文方案 */
    current_suit: ref<Game.Epigraph.Suit>(),
    /** 正在填充的铭文颜色 */
    fill_color: ref<Remote.Epigraph.Color["value"]>(),
    /** 正在填充槽位的索引号 */
    fill_index: ref(-1),
    /** 当前在三色铭文列表中选中的铭文id */
    color_id_selected: ref(0),
    /** 搭配套装列表 */
    suit_list: ref<Game.Epigraph.Suit[]>([]),
    /** 当前三色铭文列表 */
    epigraph_colors: ref<Game.Epigraph.Colors>({
      BLUE: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      GREEN: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      RED: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
    }),
    /** 剩余可填充库存 */
    epigraph_inventory: ref<Game.Epigraph.Inventory>({
      BLUE: [],
      GREEN: [],
      RED: [],
    }),
  };
  const {
    epigraph_colors,
    epigraph_inventory,
    fill_color,
    fill_index,
    color_id_selected,
    suit_list,
    sidebar_status,
    current_suit,
  } = ExposeData;

  const ExposeComputed = {
    /** 当前显示的可选择的库存 */
    current_inventory: computed(() => {
      if (!fill_color.value) return [];
      return epigraph_inventory.value[fill_color.value];
    }),

    /** 铭文属性效果列表 */
    epigraph_attr: computed(() => {
      const epigraphs = Object.values(epigraph_colors.value)
        .flat(Infinity)
        .filter((item) => item) as Game.Epigraph.Data[];

      const data: Game.Epigraph.Data["effect"][0][] = [];
      epigraphs.forEach((item) => {
        item.effect.forEach((item) => {
          data.push(item);
        });
      });

      const v = calcAttrValue(data);
      return _typeSort<(typeof v)[0]>(v, "label");
    }),

    /** 所有插槽处于空状态 */
    is_all_empty: computed(() => {
      const colors: Game.Epigraph.Data["color"][] = ["BLUE", "GREEN", "RED"];
      return !colors.some((color) => epigraph_colors.value[color].some((item) => item));
    }),

    /** 铭文方案铭文数量统计 */
    epigraph_info: computed(() => {
      const epigraph_colors_flat = Object.values(epigraph_colors.value).flat(1);

      const epigraph_info: EpigraphCollocationStoreType.Info = {};
      epigraph_colors_flat.forEach((item) => {
        if (item) {
          if (epigraph_info[item.id]) {
            epigraph_info[item.id].count += 1;
          } else {
            epigraph_info[item.id] = {
              epigraph: item,
              count: 1,
            };
          }
        }
      });

      return Object.values(epigraph_info);
    }),
  };

  /** @description 保存方案至本地 */
  const saveSuit = () => {
    $authStore.updateUserData({
      epigraphSuit: suit_list.value,
    });
  };

  /** @description 将某个槽位置空，并恢复库存
   * @param index 槽位索引
   * @param clear 是否清空
   */
  const emptySlot = (index: number, clear = false) => {
    const epigraph = epigraph_colors.value[fill_color.value!][index];
    if (!epigraph) return;

    epigraph_colors.value[fill_color.value!][index] = undefined;
    epigraph_inventory.value[fill_color.value!].forEach((item) => {
      if (epigraph.id === item.epigraph.id) {
        item.count++;
      }
    });

    //如果是清空时调用，则不同步
    if (clear) return;
    syncSuit();
  };

  /** @description 将铭文效果的属性值进行计算
   * @param data 铭文效果列表
   */
  const calcAttrValue = (data: Game.Epigraph.Data["effect"][0][]) => {
    const result: Record<string, string> = {};

    data.forEach((item) => {
      result[item.type] ??= "0";
      const num = parseFloat(item.num) * 100;
      const value = parseFloat(result[item.type]) * 100;
      if (item.num.includes("%")) {
        result[item.type] = `${(num + value) / 100}%`;
      } else {
        result[item.type] = `${(num + value) / 100}`;
      }
    });

    const arr = Object.entries(result).map(([key, value]) => {
      if (value.includes("%")) {
        return {
          label: key,
          value: parseFloat(value).toFixed(1) + "%",
        };
      } else {
        return {
          label: key,
          value: Number(value).toFixed(1),
        };
      }
    });

    return arr;
  };

  /** @description 同步方案 */
  const syncSuit = () => {
    if (!current_suit.value) return;

    current_suit.value = {
      ...current_suit.value,
      colors: _cloneDeep(epigraph_colors.value),
      inventory: _cloneDeep(epigraph_inventory.value),
    };

    //如果方案列表中没有该方案，则自动添加
    const index = suit_list.value.findIndex((item) => item.id === current_suit.value!.id);
    suit_list.value[index === -1 ? 0 : index] = _cloneDeep(current_suit.value!);

    saveSuit();
  };

  const ExposeMethods = {
    /** @description 使用用户铭文套装
     * @param data 用户方案列表
     */
    useUserEpigraphSuit(data: Game.Epigraph.Suit[]) {
      const v = _cloneDeep(data);
      suit_list.value = _cloneDeep(data);

      if (data.length > 0) {
        const last_index = v.length - 1;
        epigraph_colors.value = v[last_index].colors;
        epigraph_inventory.value = v[last_index].inventory;
        current_suit.value = v[last_index];
      } else {
        this.unlockSuit();
      }
    },

    /** @description 解锁方案 */
    unlockSuit() {
      this.clearColors(true);

      current_suit.value = {
        label: "铭文方案",
        colors: _cloneDeep(epigraph_colors.value),
        inventory: _cloneDeep(epigraph_inventory.value),
        id: dayjs().unix().toString(),
      };

      suit_list.value.push(_cloneDeep(current_suit.value));
    },

    /** @description 使用方案
     * @param id 方案id
     */
    useSuit(id: string) {
      const index = suit_list.value.findIndex((item) => item.id === id);
      current_suit.value = _cloneDeep(suit_list.value[index]);
      epigraph_colors.value = _cloneDeep(current_suit.value.colors);
      epigraph_inventory.value = _cloneDeep(current_suit.value.inventory);
    },

    /** @description 修改铭文方案名称
     * @param id 方案id
     * @param v 新名称
     */
    renameSuit(id: string, v: string) {
      if (id === current_suit.value?.id) {
        current_suit.value!.label = v;
      }

      const index = suit_list.value.findIndex((item) => item.id === id);
      suit_list.value[index].label = v;

      saveSuit();
    },

    /** @description 删除方案
     * @param id 方案id
     */
    deleteSuit(id: string) {
      const index = suit_list.value.findIndex((item) => item.id === id);
      suit_list.value.splice(index, 1);

      //如果删除的方案是仅有的一个方案，则自动解锁新的方案
      if (suit_list.value.length === 0) {
        this.unlockSuit();
        return;
      }

      //如果删除的方案是正在编辑的方案，则自动切换到第一个方案
      if (current_suit.value?.id === id) {
        current_suit.value = _cloneDeep(suit_list.value[0]);
        this.useSuit(current_suit.value.id);
      }

      saveSuit();
    },

    /** @description 更新列表
     * @param data 新方案列表
     */
    updateSuitList(data: Game.Epigraph.Suit[]) {
      suit_list.value = data;
      saveSuit();
    },

    /** @description 设置侧边栏显示状态
     * @param status 侧边栏显示状态
     */
    setSidebarStatus(status: EpigraphCollocationStoreType.SidebarStatus) {
      sidebar_status.value = status;
    },

    /** @description 设置库存
     * @param epigraph_list 铭文库存列表
     */
    setEpigraphListInventory(epigraph_list: Game.Epigraph.Data[]) {
      if (epigraph_inventory.value.BLUE.length) return;
      epigraph_list.forEach((item) => {
        epigraph_inventory.value[item.color].push({
          epigraph: item,
          count: 10,
        });
      });
    },

    /** @description 点击槽位
     * @param data 点击的槽位信息
     * @param color 槽位颜色
     * @param index 槽位索引
     */
    setFillEpigraph(
      data: Game.Epigraph.Data | undefined,
      color: Remote.Epigraph.Color["value"],
      index: number,
    ) {
      if (data) {
        color_id_selected.value = data.id;
      } else {
        color_id_selected.value = 0;
      }

      //如果重复点击一个槽位
      if (fill_index.value === index && fill_color.value === color) {
        //如果有数据，则置空槽位
        if (data) {
          emptySlot(index);
          color_id_selected.value = 0;
          return;
        }
      }
      fill_index.value = index;
      fill_color.value = color;
    },

    /** @description 点击铭文库存列表填充槽位
     * @param data 点击的铭文信息
     */
    fillSlot(data: Game.Epigraph.Data) {
      /** 更新槽位和库存 */
      const updateSlotAndInventory = (data: Game.Epigraph.Data) => {
        /** 当前颜色的库存 */
        const inventory = epigraph_inventory.value[data.color];
        /** 从库存中找到同类铭文 */
        const epigraph = inventory.find((item) => item.epigraph.id === data.id);

        //如果有库存
        if (epigraph && epigraph.count > 0) {
          //填充槽位
          epigraph_colors.value[data.color][fill_index.value] = data;
          //库存数量-1
          epigraph.count--;

          //如果槽位有铭文，则将槽位里的铭文恢复库存
          if (color_id_selected.value !== 0) {
            const selectedEpigraph = inventory.find((item) => {
              return item.epigraph.id === color_id_selected.value;
            });
            selectedEpigraph && selectedEpigraph.count++;
          }

          color_id_selected.value = 0;
        }

        syncSuit();
      };

      /** 查找其他颜色的可用槽位 */
      const findNextAvailableSlot = () => {
        //从当前颜色的槽位列表开始
        const _colors: Game.Epigraph.Data["color"][] = ["BLUE", "GREEN", "RED"];
        _colors.unshift(data.color);
        const colors = [...new Set(_colors)];

        return colors.some((color) => {
          const status = epigraph_colors.value[color].some((item) => !item);

          if (status) {
            fill_color.value = color;
            fill_index.value = epigraph_colors.value[color].findIndex((item) => !item);
            return true;
          }
          return false;
        });
      };

      updateSlotAndInventory(data);
      const have_free = findNextAvailableSlot();

      //如果已经没有槽位，则重置状态
      if (have_free) return;
      fill_color.value = undefined;
      fill_index.value = -1;
    },

    /** @description 关闭库存，显示属性 */
    closeInventory() {
      sidebar_status.value = "EFFECT";
      fill_color.value = undefined;
      fill_index.value = -1;
    },

    /** @description 清空所有槽位并恢复库存
     * @param del 是否删除
     */
    clearColors(del = false) {
      const colors: Game.Epigraph.Data["color"][] = ["BLUE", "GREEN", "RED"];
      colors.forEach((color) => {
        fill_color.value = color;
        for (let index = 0; index < epigraph_colors.value[color].length; index++) {
          emptySlot(index, true);
          epigraph_colors.value[color][index] = undefined;
        }
      });
      fill_index.value = 0;
      color_id_selected.value = 0;
      fill_color.value = "BLUE";
      sidebar_status.value = "INVENTORY";

      //如果是删除铭文套装时调用的，则不同步
      if (del) return;
      syncSuit();
    },
  };

  watchEffect(() => {
    if (fill_color.value !== undefined && fill_index.value !== -1) {
      sidebar_status.value = "INVENTORY";
    } else {
      sidebar_status.value = "EFFECT";
    }
  });

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { EpigraphCollocationStore };
