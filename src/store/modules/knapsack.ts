import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { AuthStore } from "./auth";
import { HeroDebrisStore } from "./heroDebris";
import { SkinDebrisStore } from "./skinDebris";
import { KingCrystalStore } from "./kingCrystal";
import { TaskStore } from "./task";
import { HeroStore } from "./hero";

import { DEFAULT } from "@/config";
import { useSetMarker } from "@/hooks";
import { $heroDetail, $imageView } from "@/utils/busTransfer";

/** @description 背包 */
const KnapsackStore = defineStore("knapsack", () => {
  const $authStore = AuthStore();
  const $heroStore = HeroStore();
  const $heroDebrisStore = HeroDebrisStore();
  const $skinDebrisStore = SkinDebrisStore();
  const $kingCrystalStore = KingCrystalStore();
  const $taskStore = TaskStore();

  const { addPropMarkerNum } = useSetMarker();

  const ExposeData = {
    /** 道具 */
    articles: ref<Record<Game.PropKey, number>>(DEFAULT.userInfoDefault().knapsack.articles),
    /** 拥有的英雄 */
    hero_list: ref<Record<number, { exp: number }>>({}),
    /** 拥有的皮肤 */
    skin_list: ref([1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099]),
  };
  const { articles, hero_list, skin_list } = ExposeData;

  const ExposeComputed = {
    /** 背包显示的物品 */
    knapsack: computed(() => {
      const data: [Game.PropKey, number][] = [];

      for (const key in articles.value) {
        //排除掉金币和钻石
        if (articles.value[key as Game.PropKey] > 0 && !["GOLD", "DIAMOND"].includes(key)) {
          data.push([key as Game.PropKey, articles.value[key as Game.PropKey]]);
        }
      }

      return data;
    }),
  };

  /** @description 保存背包数据 */
  const saveKnapsackData = () => {
    $authStore.updateUserData({
      knapsack: {
        articles: articles.value,
        heroList: hero_list.value,
        skinList: skin_list.value,
      },
    });
  };

  const ExposeMethods = {
    /** @description 使用用户道具列表 */
    useUserKnapsack(v: User.Data["knapsack"]) {
      articles.value = v.articles;
      hero_list.value = v.heroList;
      skin_list.value = v.skinList;
    },

    /** @description 增减道具数量
     * @param key 道具key
     * @param num 增减数量
     * @param type 增减类型
     */
    setGamePropNum(key: Game.PropKey, num: number, type: "ADD" | "SUB") {
      return new Promise<void>((resolve, reject) => {
        if (type === "ADD") {
          articles.value[key]! += num;
        } /* 如果金币不足，则抛出错误 */ else if (articles.value[key] < num) {
          reject();
          return;
        } else {
          articles.value[key]! -= num;
          addPropMarkerNum(key, num);

          //每日任务状态记录
          const daily_task_status: Partial<Record<Game.PropKey, keyof Game.Task>> = {
            GOLD: "today_gold_consume",
            DIAMOND: "today_diamond_consume",
            DOUBLE_GOLD: "today_double_gold_card",
            DOUBLE_EXP: "today_double_exp_card",
            HERO_LOTTERY_COIN: "today_hero_coin",
            HERO_LOTTERY_STONE: "today_hero_stone",
            SKIN_LOTTERY_COIN: "today_skin_coin",
            SKIN_LOTTERY_STONE: "today_skin_stone",
          };
          if (Object.keys(daily_task_status).includes(key)) {
            $taskStore.setTaskStatus(daily_task_status[key]!, num);
          }

          //每日任务状态记录
          const weekly_task_status: Partial<Record<Game.PropKey, keyof Game.Task>> = {
            HERO_LOTTERY_WEEK: "week_hero_stone_card",
            SKIN_LOTTERY_WEEK: "week_skin_stone_card",
            HERO_LOTTERY_COIN: "week_hero_coin",
            SKIN_LOTTERY_COIN: "week_skin_coin",
          };
          if (Object.keys(weekly_task_status).includes(key)) {
            $taskStore.setTaskStatus(weekly_task_status[key]!, num);
          }
        }

        resolve();
        saveKnapsackData();
      });
    },

    /** @description 添加英雄
     * @param id 英雄id
     */
    addHero(id: number) {
      hero_list.value[id] = {
        exp: 0,
      };
      saveKnapsackData();
      $heroDetail(id);

      //延迟更新列表
      setTimeout(() => {
        $heroDebrisStore.getHeroList();
        $heroStore.sortAll();
      }, 1000);
    },

    /** @description 添加皮肤
     * @param skinId 皮肤id
     * @param e 事件对象
     */
    addSkin(skinId: number, e?: Event) {
      skin_list.value.push(skinId);
      saveKnapsackData();

      if (e) {
        $imageView({
          id: skinId,
          parent: e.target as HTMLElement,
          type: "SKIN",
        });
      }

      $kingCrystalStore.getSkin();
      $skinDebrisStore.getSkin();
    },

    /** @description 升级英雄
     * @param id 英雄id
     * @param exp 升级经验
     */
    upgradeHero(id: number, exp: number) {
      hero_list.value[id]!.exp += exp;
      saveKnapsackData();
    },

    /** @description 第二天清空夺宝币 */
    clearCoin() {
      articles.value.HERO_LOTTERY_COIN = 0;
      articles.value.SKIN_LOTTERY_COIN = 0;
      saveKnapsackData();
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { KnapsackStore };
