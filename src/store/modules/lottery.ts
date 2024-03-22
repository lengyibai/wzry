import { defineStore } from "pinia";
import { ref } from "vue";

import { AuthStore } from "./auth";

/** @description 夺宝 */
const LotteryStore = defineStore("lottery", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 当前英雄夺宝幸运值 */
    hero_lucky: ref(0),
    /** 当前皮肤夺宝幸运值 */
    skin_lucky: ref(0),
  };
  const { hero_lucky, skin_lucky } = ExposeData;

  const ExposeMethods = {
    /** @description 使用用户夺宝数据 */
    useUserLottery(v: Global.UserData["lottery"]) {
      hero_lucky.value = v.hero_lucky;
      skin_lucky.value = v.skin_lucky;
    },

    /** @description 设置夺宝幸运值 */
    setLuckValue(type: "HERO" | "SKIN", value: number = 1) {
      if (type === "HERO") {
        hero_lucky.value += value;
      }

      if (type === "SKIN") {
        skin_lucky.value += value;
      }
    },

    /** @description 重置英雄幸运值 */
    resetHeroLuck() {
      hero_lucky.value = 0;
    },

    /** @description 重置皮肤夺宝幸运值 */
    resetSkinLuck() {
      skin_lucky.value = 0;
    },

    /** @description 保存游戏数据 */
    saveGameData() {
      $authStore.updateUserData({
        lottery: {
          hero_lucky: hero_lucky.value,
          skin_lucky: skin_lucky.value,
        },
      });
    },

    /** @description 重置状态 */
    resetStatus() {
      hero_lucky.value = 0;
      skin_lucky.value = 0;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { LotteryStore };
