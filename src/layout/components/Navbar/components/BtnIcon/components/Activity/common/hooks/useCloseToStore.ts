import { $confirmText, ROUTE_PATH } from "@/config";
import { KnapsackStore } from "@/store";
import { $confirm } from "@/utils/busTransfer";
import { router } from "@/router";

/** @description 关闭活动页并前往道具商店 */
const useCloseToStore = (closeAll: () => void) => {
  const $router = router;

  const $knapsackStore = KnapsackStore();

  if ($knapsackStore.articles.GUESS_CARD === 0) {
    $confirm({
      text: $confirmText("p89n", { prop: "竞猜券" }),
      confirm() {
        closeAll();
        setTimeout(() => {
          $router.push(ROUTE_PATH.PROP_SHOP);
        }, 1000);
      },
    });
    return true;
  }
  return false;
};

export { useCloseToStore };
