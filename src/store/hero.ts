/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineStore } from "pinia";
import { ref } from "vue";

import { getHeroData } from "@/api/main/games/hero";
import { getHeroSkill } from "@/api/main/games/skill";
import { getHeroSkin } from "@/api/main/games/skin";
import { $debounce, $search } from "@/utils";

const heroStore = defineStore("hero", () => {
  const profession = ref(""); //职业类型
  const camp_type = ref("全部阵营"); // 当前阵营排序类型
  const attr_type = ref("全部属性"); // 当前属性排序类型
  const misc_type = ref("全部筛选"); // 当前杂项筛选类型
  const misc_sort = ref("全部排序"); // 当前杂项排序类型
  const gender_type = ref(0); // 当前性别排序类型
  const hero_list = ref<Hero.Data[]>([]); //英雄列表
  const filter_list = ref<Hero.Data[]>([]); //筛选后的列表

  /** @description: 获取英雄列表 */
  const getHeroList = (profession?: string) => {
    getHeroData().then((res) => {
      setHeroList(res, profession);
    });
  };

  /** @description: 设置英雄列表 */
  const setHeroList = async (data: Hero.Data[], profession = "全部") => {
    hero_list.value = data;
    for (let i = 0; i < hero_list.value.length; i++) {
      hero_list.value[i].skills = await getHeroSkill(hero_list.value[i].id);
      hero_list.value[i].skins = await getHeroSkin(hero_list.value[i].id);
    }

    setProfessional(profession);
  };

  /** @description: 设置职业 */
  const setProfessional = (p: string) => {
    if (profession.value === p) return;
    profession.value = p;
    sortAll();
  };

  /** @description: 阵营筛选 */
  const filterCamp = (type: string) => {
    if (camp_type.value === type) return;
    camp_type.value = type;
    sortAll();
  };

  /** @description: 属性筛选 */
  const filterAttr = (type: string) => {
    if (attr_type.value === type) return;
    attr_type.value = type;
    sortAll();
  };

  /** @description: 杂项筛选 */
  const filterMisc = (type: string) => {
    if (misc_type.value === type) return;
    misc_type.value = type;
    sortAll();
  };

  /** @description: 杂项排序 */
  const sortMisc = (type: string) => {
    if (misc_sort.value === type) return;
    misc_sort.value = type;
    sortAll();
  };

  /** @description: 性别筛选 */
  const filterGender = (type: number) => {
    if (gender_type.value === type) return;
    gender_type.value = type;
    sortAll();
  };

  /** @description: 一键排序 */
  const sortAll = () => {
    // 职业筛选
    if (profession.value === "全部") {
      filter_list.value = [...hero_list.value]; //为了解决排序拷贝问题
    } else {
      filter_list.value = hero_list.value.filter((item: Hero.Data) => {
        return item.profession.includes(profession.value);
      });
    }

    // 性别筛选
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

    // 阵营筛选
    if (camp_type.value && camp_type.value !== "全部阵营") {
      filter_list.value = filter_list.value.filter((item) => {
        return item.camp === camp_type.value;
      });
    }

    // 属性筛选
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
      }
    }
  };

  /** @description: 搜索英雄 */
  const searchHero = (name: string) => {
    $debounce(() => {
      if (name) {
        filter_list.value = $search(hero_list.value, name, "name");
      } else {
        sortAll();
      }
    }, 500);
  };

  return {
    profession,
    hero_list,
    filter_list,
    gender_type,
    misc_sort,
    getHeroList,
    setHeroList,
    setProfessional,
    filterCamp,
    filterAttr,
    filterMisc,
    sortMisc,
    filterGender,
    searchHero,
  };
});

export default heroStore;
export type HeroStore = ReturnType<typeof heroStore>;
