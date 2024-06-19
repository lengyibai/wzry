import { ref } from "vue";
import { defineStore } from "pinia";

import { KnapsackStore } from "./knapsack";

import { usePagingLoad } from "@/hooks";
import { GAME_HERO } from "@/api";
import { _cloneDeep, _search, _typeSort } from "@/utils/tool";

/** @description 王者水晶商城 */
const KingCrystalStore = defineStore("kingCrystal", () => {
  const $knapsackStore = KnapsackStore();

  const $usePagingLoad = usePagingLoad<Game.Hero.Skin>();

  const ExposeData = {
    /** 是否处于加载中 */
    loading: $usePagingLoad.loading,
    /** 滚动坐标 */
    scroll: $usePagingLoad.scroll,
    /** 暂无更多 */
    finish: $usePagingLoad.finish,
    /** 皮肤列表 */
    all_data: $usePagingLoad.all_data,
    /** 筛选后的数据列表 */
    filter_list: $usePagingLoad.filter_list,
    /** 展示的数据列表 */
    show_list: $usePagingLoad.show_list,

    /** 职业类型 */
    profession: ref<Game.Hero.Profession>("全部"),
    /** 皮肤筛选类型 */
    skin_type: ref("全部类型"),
    /** 性别筛选类型 */
    gender_type: ref<Game.GenderId>(0),
    /** 统计皮肤类型列表 */
    skin_type_list: ref<string[]>([]),
  };
  const { all_data, filter_list, gender_type, profession, skin_type, skin_type_list } = ExposeData;

  /**
   * @description 统计皮肤类型列表
   * @param skin_list 皮肤列表
   */
  const getSkinType = (skin_list: Game.Hero.Skin[]) => {
    skin_type_list.value = [...new Set(skin_list.map((item) => item.alias))];
    _typeSort(skin_type_list.value, "label");
    skin_type_list.value.unshift("全部类型");
  };

  /** @description 一键排序 */
  const sortAll = () => {
    $usePagingLoad.setScroll(0);

    /** 职业筛选 */
    const filterProfession = () => {
      if (profession.value === "全部") {
        //为了解决排序拷贝问题
        $usePagingLoad.setFilterData([...all_data.value]);
      } else {
        const data = all_data.value.filter((item: Game.Hero.Skin) => {
          return item.profession.includes(profession.value);
        });
        $usePagingLoad.setFilterData([...data]);
      }
    };

    /** 性别筛选 */
    const filterGender = () => {
      const boy: Game.Hero.Skin[] = [];
      const girl: Game.Hero.Skin[] = [];
      filter_list.value.forEach((item) => {
        if (item.gender === "男") {
          boy.push(item);
        } else {
          girl.push(item);
        }
      });

      if (gender_type.value === 1) {
        $usePagingLoad.setFilterData(boy);
      } else if (gender_type.value === 2) {
        $usePagingLoad.setFilterData(girl);
      }
    };

    /** 皮肤类型筛选 */
    const filterSkinType = () => {
      if (skin_type.value === "全部类型") return;
      const data = filter_list.value.filter((item) => item.alias === skin_type.value);
      $usePagingLoad.setFilterData(data);
    };

    filterProfession();
    filterGender();
    filterSkinType();
    $usePagingLoad.reverseFilterData();
    ExposeMethods.resetPage();
  };

  const ExposeMethods = {
    /** @description 设置滚动坐标 */
    setScroll: $usePagingLoad.setScroll,
    /** @description 重新计算分页 */
    resetPage: $usePagingLoad.resetPage,
    /** @description 加载更多 */
    loadMore: $usePagingLoad.loadMore,

    /** @description 获取皮肤列表并设置皮肤类型图片及类型命 */
    async getSkin() {
      //筛出指定类型皮肤
      const skin_list = (await GAME_HERO.getSkinList()).filter(
        (item) =>
          ([
            18, 23, 36, 53, 76, 89, 99, 119, 14, 39, 46, 48, 52, 54, 56, 57, 58, 59, 60, 61, 62, 63,
            66, 70, 73, 77, 79, 82, 84, 86, 90, 98, 104, 109, 114, 118, 124, 75, 91, 105, 125, 50,
            65, 100, 16, 106, 127,
          ].includes(item.type) ||
            (item.alias === "其他限定" && !item.debris)) &&
          !$knapsackStore.skin_list.includes(item.id),
      );

      $usePagingLoad.pushAllData(skin_list);

      sortAll();
      getSkinType(skin_list);
    },

    /**
     * @description: 设置职业
     * @param name 职业名称
     */
    setProfessional(name: Game.Hero.Profession) {
      if (profession.value === name) return;
      profession.value = name;
      sortAll();
    },

    /**
     * @description: 性别筛选
     * @param type 性别标识符
     */
    filterGender(type: Game.GenderId) {
      if (gender_type.value === type) return;
      gender_type.value = type;
      sortAll();
    },

    /**
     * @description: 皮肤类型筛选
     * @param type 皮肤类型名称
     */
    filterSkinType(type: string) {
      if (skin_type.value === type) return;
      skin_type.value = type;

      sortAll();
    },

    /** @description 搜索皮肤
     * @param name 皮肤名称
     */
    searchSkin(name: string) {
      //搜索英雄时重置下拉菜单
      profession.value = "全部";
      skin_type.value = "全部类型";
      gender_type.value = 0;

      if (name) {
        const data = _search(
          _cloneDeep(all_data.value),
          name,
          ["name", "heroName", "category"],
          true,
        );

        $usePagingLoad.setFilterData(data);
      } else {
        sortAll();
      }

      ExposeMethods.resetPage();
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { KingCrystalStore };
