import { $confirmText, ROUTE_PATH } from "@/config";
import { KnapsackStore } from "@/store/modules/knapsack";
import { router } from "@/router";
import { $confirm, $heroDetail } from "@/utils/busTransfer";

/** @description 判断是否存在该英雄或皮肤
 * @param id 英雄或皮肤ID
 * @param type 类型
 */
const useHaveHeroSkin = (id: number, type: "HERO" | "SKIN" = "HERO") => {
  const $knapsackStore = KnapsackStore();

  //如果类型是英雄，且背包里没有该英雄
  if (type === "HERO" && !$knapsackStore.hero_list[id]) {
    $confirm({
      text: $confirmText("eb14", { v: "英雄" }),
      confirm: () => {
        router.push(ROUTE_PATH.HERO_DEBRIS);

        //可能是在英雄详情页触发的，所以需要调用关闭英雄详情页
        $heroDetail();
      },
    });
    return false;
  }

  //如果类型是皮肤，且背包里没有该皮肤
  if (type === "SKIN" && !$knapsackStore.skin_list.includes(id)) {
    $confirm({
      text: $confirmText("eb14", { v: "皮肤" }),
      confirm: () => {
        router.push(ROUTE_PATH.SKIN_DEBRIS);

        //可能是在英雄详情页触发的，所以需要调用关闭英雄详情页
        $heroDetail();
      },
    });
    return false;
  }
  return true;
};

export { useHaveHeroSkin };
