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
    sort_type: 0, // 当前价格排序类型
    gender_type: 0, // 当前性别排序类型
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
      if (this.profession === profession) return;
      this.profession = profession;
      this.sortAll();
    },

    /** @description: 价格排序 */
    sortPrice(type: number) {
      if (this.sort_type === type) return;
      this.sort_type = type;
      this.sortAll();
    },

    /** @description: 性别排序 */
    sortGender(type: number) {
      if (this.gender_type === type) return;
      this.gender_type = type;
      this.sortAll();
    },

    /** @description: 一键排序 */
    sortAll() {
      // 职业排序
      if (this.profession === "全部") {
        this.filter_list = this.skin_list;
      } else {
        this.filter_list = this.skin_list.filter((item: Hero.Skin) => {
          return item.profession.includes(this.profession);
        });
      }

      // 性别排序
      const boy: Hero.Skin[] = [];
      const girl: Hero.Skin[] = [];
      this.filter_list.forEach((item) => {
        if (item.gender === "男") {
          boy.push(item);
        } else {
          girl.push(item);
        }
      });

      if (this.gender_type === 1) {
        this.filter_list = boy;
      } else if (this.gender_type === 2) {
        this.filter_list = girl;
      }

      // 价格排序
      if (this.sort_type === 1) {
        const isNum: Hero.Skin[] = [];
        const noNum: Hero.Skin[] = [];
        this.filter_list.forEach((item) => {
          if (!isNaN(Number(item.price))) {
            isNum.push(item);
          } else {
            noNum.push(item);
          }
        });
        isNum.sort((a, b) => {
          return Number(a.price) - Number(b.price);
        });
        this.filter_list = [...isNum, ...noNum];
      } else if (this.sort_type === 2) {
        const isNum: Hero.Skin[] = [];
        const strange: Hero.Skin[] = [];
        const noNum: Hero.Skin[] = [];
        this.filter_list.forEach((item) => {
          if (!isNaN(Number(item.price))) {
            isNum.push(item);
          } else {
            if (item.type.toString().indexOf("26.png") !== -1) {
              strange.push(item);
            } else {
              noNum.push(item);
            }
          }
        });
        isNum.sort((a, b) => {
          return Number(b.price) - Number(a.price);
        });
        this.filter_list = [...strange, ...isNum, ...noNum];
      }
    },
  },
});
