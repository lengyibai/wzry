import { defineStore } from "pinia";
import { getSkin } from "@/api/main/games/skin";
import { getSkinType } from "@/api/main/games/skinType";
import { SkinStore } from "./interface";

export default defineStore("skin", {
  state: (): SkinStore.State => ({
    profession: "", //职业类型
    skin_list: [], //皮肤列表
    filter_list: [], //筛选后的列表
    type_logo: [], //类型logo列表
  }),
  actions: {
    /** @description: 获取皮肤列表 */
    getSkin(profession?: string) {
      getSkin().then((skinList) => {
        this.setSkinList(skinList, profession);
        getSkinType().then((skinType) => {
          skinType.forEach((type) => {
            skinList.forEach((skin) => {
              if (type.id === skin.type) {
                skin.type = type.link;
              }
            });
          });
        });
      });
    },

    /** @description: 设置皮肤列表 */
    setSkinList(data: Hero.Skin[], profession = "全部") {
      this.skin_list = data;
      this.setProfessional(profession);
    },

    /** @description: 设置职业 */
    setProfessional(profession: string) {
      if (this.profession === profession) return; //避免重复触发
      this.profession = profession;
      if (profession === "全部") {
        this.filter_list = this.skin_list;
      } else {
        this.filter_list = this.skin_list.filter((item: Hero.Skin) => {
          return item.profession.includes(profession);
        });
      }
    },
  },
});
