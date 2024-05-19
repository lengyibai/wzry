import { defineStore } from "pinia";
import { ref } from "vue";

import { AuthStore } from "./auth";
import { TaskStore } from "./task";

import { useSetMarker } from "@/hooks";

/** @description 夺宝 */
const LotteryStore = defineStore("lottery", () => {
  const $authStore = AuthStore();
  const $taskStore = TaskStore();

  const { addStatusMarkerNum } = useSetMarker();

  const ExposeData = {
    /** 当前英雄夺宝幸运值 */
    hero_lucky: ref(0),
    /** 当前皮肤夺宝幸运值 */
    skin_lucky: ref(0),
  };
  const { hero_lucky, skin_lucky } = ExposeData;

  const ExposeMethods = {
    /** @description 使用用户夺宝数据
     * @param v 用户夺宝数据
     */
    useUserLottery(v: User.Data["lottery"]) {
      hero_lucky.value = v.heroLucky;
      skin_lucky.value = v.skinLucky;
    },

    /** @description 设置夺宝幸运值
     * @param type 夺宝类型
     * @param value 夺宝幸运值
     */
    setLuckValue(type: "HERO" | "SKIN") {
      if (type === "HERO") {
        hero_lucky.value += 1;
        addStatusMarkerNum("HERO_LOTTERY_COUNT");
        $taskStore.setTaskStatus("today_hero_lottery", 1);
      }

      if (type === "SKIN") {
        skin_lucky.value += 1;
        addStatusMarkerNum("SKIN_LOTTERY_COUNT");
        $taskStore.setTaskStatus("today_skin_lottery", 1);
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
          heroLucky: hero_lucky.value,
          skinLucky: skin_lucky.value,
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
