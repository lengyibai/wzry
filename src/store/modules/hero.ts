import { defineStore } from "pinia";
import { ref } from "vue";

import { API_HERO, API_RELATIONSHIP, API_SKILL, API_SKIN } from "@/api";
import { Util } from "@/utils";

/** @description 英雄列表页 */
const heroStore = defineStore("hero", () => {
  const profession = ref<Hero.Profession>(); //职业类型
  const camp_type = ref("全部阵营"); //阵营排序类型
  const attr_type = ref("全部属性"); //属性排序类型
  const misc_type = ref("全部筛选"); //杂项筛选类型
  const misc_sort = ref("全部排序"); //杂项排序类型
  const sort_type = ref("正序"); //当前排序类型
  const gender_type = ref<Gender>(0); //当前性别排序类型
  const hero_list = ref<Hero.Data[]>([]); //英雄完整列表
  const filter_list = ref<Hero.Data[]>([]); //筛选后的列表

  const scroll = ref(0); //滚动坐标
  const page = ref(1); //当前页数
  const page_total = ref(0); //总页数
  const page_count = ref(30); //一页显示的个数
  const show_list = ref<Hero.Data[]>([]); //展示的列表

  /**
   * @description: 设置滚动坐标
   * @param v y轴坐标
   */
  const setScroll = (v: number) => {
    scroll.value = v;
  };

  /** @description 重新计算分页 */
  const filterListChange = () => {
    page.value = 0;
    show_list.value = [];
    show_list.value = filter_list.value.slice(page.value * page_count.value, (page.value + 1) * page_count.value);
    page_total.value = Math.round(filter_list.value.length / page_count.value);
  };

  /** @description 加载更多 */
  const loadMore = () => {
    if (page_total.value > page.value) {
      page.value += 1;

      show_list.value.push(
        ...filter_list.value.slice(page.value * page_count.value, (page.value + 1) * page_count.value)
      );
    }
  };

  /** @description 获取英雄列表 */
  const getHeroList = async () => {
    hero_list.value = await API_HERO.getHeroData();
    for (let i = 0; i < hero_list.value.length; i++) {
      hero_list.value[i].skills = await API_SKILL.getHeroSkill(hero_list.value[i].id);
      hero_list.value[i].skins = await API_SKIN.getHeroSkin(hero_list.value[i].id);
      hero_list.value[i].relationships = await API_RELATIONSHIP.getHeroRelationship(hero_list.value[i].id);
    }
    setProfessional("全部");
  };

  /** @description 设置职业 */
  const setProfessional = (p: Hero.Profession) => {
    if (profession.value === p) return;
    profession.value = p;
    sortAll();
  };

  /**
   * @description: 阵营筛选
   * @param type 阵营名称
   */
  const filterCamp = (type: string) => {
    if (camp_type.value === type) return;
    camp_type.value = type;
    sortAll();
  };

  /**
   * @description: 属性筛选
   * @param type 属性名称
   */
  const filterAttr = (type: string) => {
    if (attr_type.value === type) return;
    attr_type.value = type;
    sortAll();
  };

  /**
   * @description: 杂项筛选
   * @param type 杂项名称
   */
  const filterMisc = (type: string) => {
    if (misc_type.value === type) return;
    misc_type.value = type;
    sortAll();
  };

  /**
   * @description: 杂项排序
   * @param type 杂项名称
   */
  const sortMisc = (type: string) => {
    if (misc_sort.value === type) return;
    misc_sort.value = type;
    sortAll();
  };

  /**
   * @description: 正序|倒序
   * @param type 排序名称
   */
  const sortType = (type: string) => {
    if (sort_type.value === type) return;
    sort_type.value = type;
    sortAll();
  };

  /**
   * @description: 性别筛选
   * @param type 性别标识符
   */
  const filterGender = (type: Gender) => {
    if (gender_type.value === type) return;
    gender_type.value = type;
    sortAll();
  };

  /** @description 一键排序 */
  const sortAll = () => {
    scroll.value = 0;

    //职业筛选
    if (profession.value === "全部") {
      filter_list.value = [...hero_list.value]; //为了解决排序拷贝问题
    } else {
      filter_list.value = hero_list.value.filter((item: Hero.Data) => {
        return item.profession.includes(profession.value!);
      });
    }

    //性别筛选
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

    //阵营筛选
    if (camp_type.value && camp_type.value !== "全部阵营") {
      filter_list.value = filter_list.value.filter((item) => {
        return item.camp === camp_type.value;
      });
    }

    //属性筛选
    const a = attr_type.value;
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

    if (a && a !== "全部属性") {
      multiple.forEach((effect) => {
        if (a === effect.label) {
          filter_list.value = filter_list.value.filter((item) => {
            return item.skills!.some((item) => {
              return item.some((item) => {
                return item.type.some((item) => {
                  return effect.value.includes(item);
                });
              });
            });
          });
        }
      });

      if (a === "无位移") {
        filter_list.value = filter_list.value.filter((item) => {
          return item.skills!.every((item) => {
            return item.every((item) => {
              return !item.type.includes("位移");
            });
          });
        });
      } else if (a === "位移") {
        filter_list.value = filter_list.value.filter((item) => {
          return item.skills!.some((item) => {
            return item.some((item) => {
              return item.type.includes("位移");
            });
          });
        });
      }

      if (a === "无控制") {
        filter_list.value = filter_list.value.filter((item) => {
          return !item.skills!.some((item) => {
            return item.some((item) => {
              return item.type.some((item) => {
                return ["控制", "束缚", "压制", "牵引", "限制"].includes(item);
              });
            });
          });
        });
      }
    }

    //杂项筛选
    if (misc_type.value && misc_type.value !== "全部筛选") {
      const a = misc_type.value;

      if (a === "爆发") {
        filter_list.value = filter_list.value.filter((item) => {
          return item.specialty.includes("爆发");
        });
      } else if (a === "团控") {
        filter_list.value = filter_list.value.filter((item) => {
          return item.specialty.includes("团控");
        });
      } else if (a === "无蓝条") {
        filter_list.value = filter_list.value.filter((item) => {
          return item.skillUnit !== "法力";
        });
      } else if (a === "非人类") {
        filter_list.value = filter_list.value.filter((item) => {
          return item.race !== "人类";
        });
      } else if (a === "多套技能") {
        filter_list.value = filter_list.value.filter((item) => {
          return item.skills!.length > 1;
        });
      }
    }

    //杂项排序
    if (misc_sort.value && misc_sort.value !== "全部排序") {
      const a = misc_sort.value;

      if (a === "身高") {
        filter_list.value.sort((a, b) => {
          return a.height - b.height;
        });
      } else if (a === "上手难度") {
        filter_list.value.sort((a, b) => {
          return a.difficulty - b.difficulty;
        });
      } else if (a === "皮肤数量") {
        filter_list.value.sort((a, b) => {
          return b.skins!.length - a.skins!.length;
        });
      } else if (a === "关系数量") {
        filter_list.value.sort((a, b) => {
          return b.relationships!.length - a.relationships!.length;
        });
      }
    }

    //正序/倒序
    if (sort_type.value === "倒序") {
      filter_list.value.reverse();
    }

    filterListChange();
  };

  /** @description 搜索英雄 */
  const searchHero = (name: string) => {
    Util.TOOL.debounce(() => {
      if (name) {
        filter_list.value = Util.TOOL.search<Hero.Data>(hero_list.value, name, "name", true);
      } else {
        sortAll();
      }

      filterListChange();
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
    hero_list,
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

export default heroStore;
export type HeroStore = ReturnType<typeof heroStore>;
