import { defineStore } from "pinia";
import { ref } from "vue";

import { KnapsackStore } from "./knapsack";

import { usePagingLoad } from "@/hooks";
import { GAME_HERO } from "@/api";
import { _cloneDeep, _search } from "@/utils/tool";

/** @description 英雄商碎片城 */
const HeroDebrisStore = defineStore("heroDebris", () => {
  const $knapsackStore = KnapsackStore();

  const $usePagingLoad = usePagingLoad<Game.Hero.Data>();

  const ExposeData = {
    /** 暂无更多 */
    finish: $usePagingLoad.finish,
    /** 是否处于加载中 */
    loading: $usePagingLoad.loading,
    /** 滚动坐标 */
    scroll: $usePagingLoad.scroll,
    /** 英雄列表 */
    all_data: $usePagingLoad.all_data,
    /** 展示的英雄列表 */
    show_list: $usePagingLoad.show_list,

    /** 职业类型（直接进入详情页再返回需要判断为空则加载英雄列表） */
    profession: ref<Game.Hero.Profession>("全部"),
    /** 价格排序类型 */
    price_type: ref("全部价格"),
    /** 当前性别排序类型 */
    gender_type: ref<Game.GenderId>(0),
  };
  const { all_data, profession, price_type, gender_type } = ExposeData;

  /** @description 一键排序 */
  const sortAll = () => {
    $usePagingLoad.setScroll(0);

    /** 职业筛选 */
    const filterProfession = () => {
      if (profession.value === "全部") {
        //为了解决排序拷贝问题
        $usePagingLoad.setFilterData([...all_data.value]);
      } else {
        const data = all_data.value.filter((item: Game.Hero.Data) => {
          return item.profession.includes(profession.value!);
        });

        $usePagingLoad.setFilterData(data);
      }
    };

    /** 性别筛选 */
    const filterGender = () => {
      const boy: Game.Hero.Data[] = [];
      const girl: Game.Hero.Data[] = [];
      $usePagingLoad.filter_list.value.forEach((item) => {
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

    /** 价格排序 */
    const sortPrice = () => {
      if (price_type.value === "全部价格") return;

      const sort_strategy: Record<string, (list: Game.Hero.Data[]) => Game.Hero.Data[]> = {
        由低到高: (list) => {
          return list.sort((a, b) => Number(a.price) - Number(b.price));
        },
        由高到低: (list) => {
          return list.sort((a, b) => Number(b.price) - Number(a.price));
        },
      };

      $usePagingLoad.setFilterData(
        sort_strategy[price_type.value]($usePagingLoad.filter_list.value),
      );
    };

    filterProfession();
    filterGender();
    $usePagingLoad.reverseFilterData();
    sortPrice();
    $usePagingLoad.resetPage();
  };

  const ExposeMethods = {
    /** @description 设置滚动坐标 */
    setScroll: $usePagingLoad.setScroll,
    /** @description 加载更多 */
    loadMore: $usePagingLoad.loadMore,

    /** @description 初次获取英雄列表并设置相关信息 */
    async getHeroList() {
      const data = await GAME_HERO.getHeroDataList();
      const all_data = data.filter((item) => item.price && !$knapsackStore.hero_list[item.id]);

      $usePagingLoad.pushAllData(all_data);
      sortAll();
    },

    /**
     * @description: 职业筛选
     * @param name 职业名称
     */
    setProfessional(name: Game.Hero.Profession) {
      if (profession.value === name) return;
      profession.value = name;
      sortAll();
    },

    /**
     * @description: 性别筛选
     * @param name 性别标识符
     */
    filterGender(name: Game.GenderId) {
      if (gender_type.value === name) return;
      gender_type.value = name;
      sortAll();
    },

    /**
     * @description: 价格排序
     * @param type 价格排序方式
     */
    sortPrice(type: string) {
      if (price_type.value === type) return;
      price_type.value = type;
      sortAll();
    },

    /** @description 搜索英雄
     * @param name 英雄名称
     */
    searchHero(name: string) {
      //搜索英雄时重置下拉菜单
      profession.value = "全部";
      gender_type.value = 0;

      if (name) {
        const data = _search<Game.Hero.Data>(_cloneDeep(all_data.value), name, "name", true);
        $usePagingLoad.setFilterData(data);
      } else {
        sortAll();
      }

      $usePagingLoad.resetPage();
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { HeroDebrisStore };
export type HeroDebrisStore = ReturnType<typeof HeroDebrisStore>;
