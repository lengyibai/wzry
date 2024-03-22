import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { AuthStore } from "./auth";
import { HeroDebrisStore } from "./heroDebris";
import { SkinDebrisStore } from "./skinDebris";
import { KingCrystalStore } from "./kingCrystal";

import { DEFAULT } from "@/config";
import { useSetMarker } from "@/hooks";
import { $heroDetail, $imageView } from "@/utils/busTransfer";

/** @description 背包 */
const KnapsackStore = defineStore("knapsack", () => {
  const $authStore = AuthStore();
  const $heroDebrisStore = HeroDebrisStore();
  const $skinDebrisStore = SkinDebrisStore();
  const $kingCrystalStore = KingCrystalStore();

  const $useSetMarker = useSetMarker();

  const ExposeData = {
    /** 道具 */
    articles: ref<Record<Game.PropKey, number>>(DEFAULT.userDefaultInfo().knapsack.articles),
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

  /* 保存背包数据 */
  const saveKnapsackData = () => {
    $authStore.updateUserData({
      knapsack: {
        articles: articles.value,
        hero_list: hero_list.value,
        skin_list: skin_list.value,
      },
    });
  };

  const ExposeMethods = {
    /** @description 使用用户道具列表 */
    useUserKnapsack(v: Global.UserData["knapsack"]) {
      articles.value = v.articles;
      hero_list.value = v.hero_list;
      skin_list.value = v.skin_list;
    },

    /** @description 增减道具数量 */
    setGamePropNum(key: Game.PropKey, num: number, type: "ADD" | "SUB") {
      return new Promise<void>((resolve, reject) => {
        if (type === "ADD") {
          articles.value[key]! += num;
          $useSetMarker.add(key, num);
        } /* 如果金币不足，则抛出错误 */ else if (articles.value[key] < num) {
          reject();
          return;
        } else {
          articles.value[key]! -= num;
          $useSetMarker.sub(key, num);
        }

        resolve();
        saveKnapsackData();
      });
    },

    /** @description 添加英雄 */
    addHero(id: number) {
      hero_list.value[id] = {
        exp: 0,
      };
      saveKnapsackData();
      $heroDetail(id);

      //延迟更新列表
      setTimeout(() => {
        $heroDebrisStore.getHeroList();
      }, 1000);
    },

    /** @description 添加皮肤 */
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

    /** @description 升级英雄 */
    upgradeHero(id: number, exp: number) {
      hero_list.value[id]!.exp += exp;
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
