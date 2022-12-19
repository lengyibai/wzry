import { defineStore } from "pinia";
import { getHeroData } from "@/api/main/games/hero";
import { HeroStore } from "./interface";

export default defineStore("hero", {
  state: (): HeroStore.State => ({
    profession: "", //职业类型
    hero_list: [], //英雄列表
    filter_list: [], //筛选后的列表
  }),
  actions: {
    /** @description: 获取英雄列表 */
    getHeroList(profession?: string) {
      getHeroData().then((res) => {
        this.setHeroList(res, profession);
      });
    },

    /** @description: 设置英雄列表 */
    setHeroList(data: Hero.Data[], profession = "全部") {
      this.hero_list = data;
      this.setProfessional(profession);
    },

    /** @description: 设置职业 */
    setProfessional(profession: string) {
      if (this.profession === profession) return; //避免重复触发
      this.profession = profession;
      if (profession === "全部") {
        this.filter_list = this.hero_list;
      } else {
        this.filter_list = this.hero_list.filter((item: Hero.Data) => {
          return item.profession.includes(profession);
        });
      }
    },
  },
});
