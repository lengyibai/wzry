import { defineStore } from "pinia";
import { ref } from "vue";
import _cloneDeep from "lodash/cloneDeep";

import { $tool } from "@/utils";
import { usePagingLoad } from "@/hooks";
import { GAME_HERO } from "@/api";

/** @description 英雄列表页 */
const HeroStore = defineStore("hero", () => {
  const $usePagingLoad = usePagingLoad<Game.Hero.Data>();

  const ExposeData = {
    /** 暂无更多 */
    finish: $usePagingLoad.finish,
    /** 是否处于加载中 */
    loading: $usePagingLoad.loading,
    /** 滚动坐标 */
    scroll: $usePagingLoad.scroll,
    /** 筛选后的列表 */
    filter_list: $usePagingLoad.filter_list,
    /** 英雄列表 */
    all_data: $usePagingLoad.all_data,
    /** 展示的英雄列表 */
    show_list: $usePagingLoad.show_list,

    /** 职业类型（直接进入详情页再返回需要判断为空则加载英雄列表） */
    profession: ref<Game.Hero.Profession>(),
    /** 当前属性排序类型 */
    attr_type: ref("全部属性"),
    /** 阵营排序类型 */
    camp_type: ref("全部阵营"),
    /** 杂项排序类型 */
    misc_sort: ref("全部排序"),
    /** 杂项排序类型 */
    misc_type: ref("全部筛选"),
    /** 当前排序类型：正序|倒序 */
    sort_type: ref("倒序"),
    /** 当前性别排序类型 */
    gender_type: ref<Game.GenderId>(0),
  };
  const {
    filter_list,
    all_data,

    profession,
    attr_type,
    camp_type,
    gender_type,
    misc_sort,
    misc_type,
    sort_type,
  } = ExposeData;

  /* 一键排序 */
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

    /** 阵营筛选 */
    const filterCamp = () => {
      if (camp_type.value && camp_type.value !== "全部阵营") {
        const data = filter_list.value.filter((item) => {
          return item.camp === camp_type.value;
        });

        $usePagingLoad.setFilterData(data);
      }
    };

    /** 属性筛选 */
    const filterAttr = () => {
      const multiple = [
        {
          label: "免控",
          value: ["霸体", "净化", "解控"],
        },
        {
          label: "回血",
          value: ["回复", "治疗"],
        },
        {
          label: "真伤",
          value: ["真伤"],
        },
      ];

      if (attr_type.value && attr_type.value !== "全部属性") {
        multiple.forEach((effect) => {
          if (attr_type.value === effect.label) {
            const data = filter_list.value.filter((item) => {
              return item.skills.some((item) => {
                return item.some((item) => {
                  return item.type.some((item) => {
                    return effect.value.includes(item);
                  });
                });
              });
            });

            $usePagingLoad.setFilterData(data);
          }
        });

        if (attr_type.value === "非硬控") {
          const data = filter_list.value.filter((item) => {
            return !item.skills.some((item) => {
              return item.some((item) => {
                return item.type.some((item) => {
                  return ["控制", "束缚", "压制", "牵引", "限制"].includes(item);
                });
              });
            });
          });

          $usePagingLoad.setFilterData(data);
        }
      }
    };

    /** 杂项筛选 */
    const filterMisc = () => {
      const filter_misc: Record<string, (v: Game.Hero.Data) => boolean> = {
        团控: (item) => item.specialty.includes("团控"),
        无蓝条: (item) => item.skillUnit !== "法力",
        非人类: (item) => item.race !== "人类",
        多套技能: (item) => item.skills.length > 1,
      };
      if (misc_type.value && misc_type.value !== "全部筛选") {
        const data = filter_list.value.filter(filter_misc[misc_type.value]);
        $usePagingLoad.setFilterData(data);
      }
    };

    /** 杂项排序 */
    const sortMisc = () => {
      const sortingFunctions: Record<string, (a: Game.Hero.Data, b: Game.Hero.Data) => number> = {
        身高: (a, b) => a.height - b.height,
        上手难度: (a, b) => a.difficulty - b.difficulty,
        皮肤数量: (a, b) => b.skinCount - a.skinCount,
        关系数量: (a, b) => b.relationCount - a.relationCount,
      };
      if (misc_sort.value && misc_sort.value !== "全部排序") {
        filter_list.value.sort(sortingFunctions[misc_sort.value]);
      }
    };

    /** 正/倒排序 */
    const sortType = () => {
      if (sort_type.value === "倒序") {
        filter_list.value.reverse();
      }
    };

    filterProfession();
    filterGender();
    filterCamp();
    filterAttr();
    filterMisc();
    sortMisc();
    sortType();
    ExposeMethods.resetPage();
  };

  const ExposeMethods = {
    /** @description 设置滚动坐标 */
    setScroll: $usePagingLoad.setScroll,
    /** @description 加载更多 */
    loadMore: $usePagingLoad.loadMore,
    /** @description 重新计算分页 */
    resetPage: $usePagingLoad.resetPage,

    /** @description 初次获取英雄列表并设置相关信息 */
    getHeroList() {
      all_data.value = GAME_HERO.getHeroData();
      this.setProfessional("全部");
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
     * @description: 属性筛选
     * @param name 属性名称
     */
    filterAttr(name: string) {
      if (attr_type.value === name) return;
      attr_type.value = name;
      sortAll();
    },

    /**
     * @description: 阵营筛选
     * @param name 阵营名称
     */
    filterCamp(name: string) {
      if (camp_type.value === name) return;
      camp_type.value = name;
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
     * @description: 杂项筛选
     * @param name 杂项名称
     */
    filterMisc(name: string) {
      if (misc_type.value === name) return;
      misc_type.value = name;
      sortAll();
    },

    /**
     * @description: 杂项排序
     * @param type 杂项名称
     */
    sortMisc(name: string) {
      if (misc_sort.value === name) return;
      misc_sort.value = name;
      sortAll();
    },

    /**
     * @description: 正序|倒序
     * @param type 排序名称
     */
    sortType(name: string) {
      if (sort_type.value === name) return;
      sort_type.value = name;
      sortAll();
    },

    /** @description 搜索英雄 */
    searchHero(name: string) {
      /* 搜索英雄时重置下拉菜单 */
      profession.value = "全部";
      attr_type.value = "全部属性";
      camp_type.value = "全部阵营";
      misc_sort.value = "全部排序";
      misc_type.value = "全部筛选";
      sort_type.value = "倒序";
      gender_type.value = 0;

      if (name) {
        const data = $tool.search<Game.Hero.Data>(_cloneDeep(all_data.value), name, "name", true);
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

export { HeroStore };
export type HeroStore = ReturnType<typeof HeroStore>;
