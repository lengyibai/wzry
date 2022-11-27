import { defineStore } from "pinia";
import { getSkinType } from "@/api/main/games/skin";
import { HeroAttrStore } from "./interface";

export default defineStore("heroAttr", {
  state: (): HeroAttrStore.State => ({
    skinType: [], //皮肤类型列表
  }),

  actions: {
    /** @description: 获取皮肤类型 */
    getSkinType() {
      getSkinType().then((res) => {
        this.setSkinType(res);
      });
    },

    /** @description: 设置皮肤类型 */
    setSkinType(data: Hero.SkinType[]) {
      this.skinType = data;
    },

    /** @description: 获取指定皮肤类型数据 */
    getAssignType(id: string) {
      const data = this.skinType.find((item) => {
        return item.id === id;
      });
      return data as Hero.SkinType;
    },
  },
});
