import { defineStore } from "pinia";
import { getHeroData } from "@/api/main/games/hero";
import { ref } from "vue";

export default defineStore("hero", () => {
  const profession = ref(""); //职业类型
  const camp_type = ref(""); // 当前阵营排序类型
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
  const setHeroList = (data: Hero.Data[], profession = "全部") => {
    hero_list.value = data;
    setProfessional(profession);
  };

  /** @description: 设置职业 */
  const setProfessional = (p: string) => {
    if (profession.value === p) return;
    profession.value = p;
    sortAll();
  };

  /** @description: 阵营排序 */
  const sortCamp = (type: string) => {
    if (camp_type.value === type) return;
    camp_type.value = type;
    sortAll();
  };

  /** @description: 性别排序 */
  const sortGender = (type: number) => {
    if (gender_type.value === type) return;
    gender_type.value = type;
    sortAll();
  };

  /** @description: 一键排序 */
  const sortAll = () => {
    // 职业排序
    if (profession.value === "全部") {
      filter_list.value = hero_list.value;
    } else {
      filter_list.value = hero_list.value.filter((item: Hero.Data) => {
        return item.profession.includes(profession.value);
      });
    }

    // 性别排序
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

    // 阵营排序
    if (camp_type.value && camp_type.value !== "全部阵营") {
      filter_list.value = filter_list.value.filter((item) => {
        return item.camp === camp_type.value;
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
    sortCamp,
    sortGender,
  };
});
