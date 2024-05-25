import { $confirmText, ROUTE_PATH } from "@/config";
import { KnapsackStore } from "@/store";
import { $confirm } from "@/utils/busTransfer";
import { router } from "@/router";

/** @description 关闭活动页并前往道具商店
 * @param closeAll 关闭活动页面
 * @param closeGame 关闭游戏
 */
const useCloseToStore = (closeActivity: () => void, closeGame?: () => Promise<void>) => {
  const $router = router;

  const $knapsackStore = KnapsackStore();

  if ($knapsackStore.articles.GUESS_CARD === 0) {
    $confirm({
      text: $confirmText("p89n", { prop: "竞猜券" }),
      async confirm() {
        //如果传递了关闭游戏，则需要先关闭游戏再关闭活动
        if (closeGame) {
          await closeGame();
        }

        closeActivity();
        setTimeout(() => {
          $router.push(ROUTE_PATH.PROP_SHOP);
        }, 1000);
      },
      cancel: closeGame,
    });
    return true;
  }
  return false;
};

export { useCloseToStore };
