import { defineStore } from "pinia";
import { ref } from "vue";

import { API_HERO, API_RELATIONSHIP, API_SKILL, API_SKIN } from "@/api";
import { $tool } from "@/utils";
import { usePagingLoad } from "@/hooks";

/** @description 英雄列表页 */
const HeroStore = defineStore("hero", () => {
  const {
    all_data,
    resetPage,
    loadMore,
    setScroll,
    scroll,
    filter_list,
    show_list,
  } = usePagingLoad<Hero.Data>();

  /** 职业类型 */
  const profession = ref<Hero.Profession>("全部");
  /** 阵营排序类型 */
  const camp_type = ref("全部阵营");
  /** 属性排序类型 */
  const attr_type = ref("全部属性");
  /** 杂项筛选类型 */
  const misc_type = ref("全部筛选");
  /** 杂项排序类型 */
  const misc_sort = ref("全部排序");
  /** 当前排序类型 */
  const sort_type = ref("倒序");
  /** 当前性别排序类型 */
  const gender_type = ref<Gender>(0);

  /** @description 初次获取英雄列表并设置相关信息 */
  const getHeroList = async () => {
    all_data.value = await API_HERO.getHeroData();
    for (let i = 0; i < all_data.value.length; i++) {
      all_data.value[i].skills = await API_SKILL.getHeroSkill(
        all_data.value[i].id,
      );
      all_data.value[i].skins = await API_SKIN.getHeroSkin(
        all_data.value[i].id,
      );
      all_data.value[i].relationships =
        await API_RELATIONSHIP.getHeroRelationship(all_data.value[i].id);
    }

    sortAll();
  };

  /**
   * @description: 职业筛选
   * @param name 职业名称
   */
  const setProfessional = (name: Hero.Profession) => {
    if (profession.value === name) return;
    profession.value = name;
    sortAll();
  };

  /**
   * @description: 性别筛选
   * @param name 性别标识符
   */
  const filterGender = (name: Gender) => {
    if (gender_type.value === name) return;
    gender_type.value = name;
    sortAll();
  };

  /**
   * @description: 阵营筛选
   * @param name 阵营名称
   */
  const filterCamp = (name: string) => {
    if (camp_type.value === name) return;
    camp_type.value = name;
    sortAll();
  };

  /**
   * @description: 属性筛选
   * @param name 属性名称
   */
  const filterAttr = (name: string) => {
    if (attr_type.value === name) return;
    attr_type.value = name;
    sortAll();
  };

  /**
   * @description: 杂项筛选
   * @param name 杂项名称
   */
  const filterMisc = (name: string) => {
    if (misc_type.value === name) return;
    misc_type.value = name;
    sortAll();
  };

  /**
   * @description: 杂项排序
   * @param type 杂项名称
   */
  const sortMisc = (name: string) => {
    if (misc_sort.value === name) return;
    misc_sort.value = name;
    sortAll();
  };

  /**
   * @description: 正序|倒序
   * @param type 排序名称
   */
  const sortType = (name: string) => {
    if (sort_type.value === name) return;
    sort_type.value = name;
    sortAll();
  };

  /** @description 一键排序 */
  const sortAll = () => {
    scroll.value = 0;

    /** 职业筛选 */
    const filterProfession = () => {
      if (profession.value === "全部") {
        //为了解决排序拷贝问题
        filter_list.value = [...all_data.value];
      } else {
        filter_list.value = all_data.value.filter((item: Hero.Data) => {
          return item.profession.includes(profession.value!);
        });
      }
    };

    /** 性别筛选 */
    const filterGender = () => {
      const boy: Hero.Data[] = [];
      const girl: Hero.Data[] = [];
      filter_list.value.forEach((item) => {
        if (item.gender === "男") {
          boy.push(item);
        } else {
          girl.push(item);
        }
      });

      if (gender_type.value === 1) {
        filter_list.value = boy;
      } else if (gender_type.value === 2) {
        filter_list.value = girl;
      }
    };

    /** 阵营筛选 */
    const filterCamp = () => {
      if (camp_type.value && camp_type.value !== "全部阵营") {
        filter_list.value = filter_list.value.filter((item) => {
          return item.camp === camp_type.value;
        });
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
            filter_list.value = filter_list.value.filter((item) => {
              return item.skills.some((item) => {
                return item.some((item) => {
                  return item.type.some((item) => {
                    return effect.value.includes(item);
                  });
                });
              });
            });
          }
        });

        if (attr_type.value === "无控制") {
          filter_list.value = filter_list.value.filter((item) => {
            return !item.skills.some((item) => {
              return item.some((item) => {
                return item.type.some((item) => {
                  return ["控制", "束缚", "压制", "牵引", "限制"].includes(
                    item,
                  );
                });
              });
            });
          });
        }
      }
    };

    /** 杂项筛选 */
    const filterMisc = () => {
      const filter_msic: Record<string, (v: Hero.Data) => boolean> = {
        团控: (item) => item.specialty.includes("团控"),
        无蓝条: (item) => item.skillUnit !== "法力",
        非人类: (item) => item.race !== "人类",
        多套技能: (item) => item.skills.length > 1,
      };
      if (misc_type.value && misc_type.value !== "全部筛选") {
        filter_list.value = filter_list.value.filter(
          filter_msic[misc_type.value],
        );
      }
    };

    /** 杂项排序 */
    const sortMisc = () => {
      const sortingFunctions: Record<
        string,
        (a: Hero.Data, b: Hero.Data) => number
      > = {
        身高: (a, b) => a.height - b.height,
        上手难度: (a, b) => a.difficulty - b.difficulty,
        皮肤数量: (a, b) => b.skins.length - a.skins.length,
        关系数量: (a, b) => b.relationships.length - a.relationships.length,
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
    resetPage();
  };

  /** @description 搜索英雄 */
  const searchHero = (name: string) => {
    $tool.debounce(() => {
      if (name) {
        filter_list.value = $tool.search<Hero.Data>(
          all_data.value,
          name,
          "name",
          true,
        );
      } else {
        sortAll();
      }

      resetPage();
    }, 500);
  };

  return {
    /** 职业类型 */
    profession,
    /** 当前属性排序类型 */
    attr_type,
    /** 阵营排序类型 */
    camp_type,
    /** 筛选后的列表 */
    filter_list,
    /** 当前性别排序类型 */
    gender_type,
    /** 英雄列表 */
    all_data,
    /** 杂项排序类型 */
    misc_sort,
    /** 杂项排序类型 */
    misc_type,
    /** 滚动坐标 */
    scroll,
    /** 展示的英雄列表 */
    show_list,
    /** 当前排序类型：正序|倒序 */
    sort_type,
    filterAttr,
    filterCamp,
    filterGender,
    filterMisc,
    getHeroList,
    searchHero,
    setProfessional,
    setScroll,
    sortMisc,
    sortType,
    loadMore,
  };
});

export { HeroStore };
export type HeroStore = ReturnType<typeof HeroStore>;
