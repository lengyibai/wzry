import { defineStore } from "pinia";
import { getHeroData } from "@/api/main/games/hero";
import { ref } from "vue";

export default defineStore("hero", () => {
  const profession = ref(""); //职业类型
  const hero_list = ref<Hero.Data[]>([]); //英雄列表
  const filter_list = ref<Hero.Data[]>([]); //筛选后的列表

  /** @description: 获取英雄列表 */
  const getHeroList = (profession?: string) => {
    getHeroData().then((res) => {
      setHeroList(res, profession);
    });
  };

  /** @description: 设置英雄列表 */
  const setHeroList = (data: Hero.Data[], profession = "全部") => {
    hero_list.value = data;
    setProfessional(profession);
  };

  /** @description: 设置职业 */
  const setProfessional = (p: string) => {
    if (profession.value === p) return; //避免重复触发
    profession.value = p;
    if (p === "全部") {
      filter_list.value = hero_list.value;
    } else {
      filter_list.value = hero_list.value.filter((item: Hero.Data) => {
        return item.profession.includes(p);
      });
    }
  };

  return {
    profession,
    hero_list,
    filter_list,
    getHeroList,
    setHeroList,
    setProfessional,
  };
});
