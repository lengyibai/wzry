import {
  MARKER_PROP_KEY_CHEST_ADD,
  MARKER_PROP_KEY_LOTTERY_ADD,
  MARKER_PROP_KEY_NORMAL_ADD,
  MARKER_PROP_KEY_SHOP_ADD,
  MARKER_PROP_KEY_SUB,
  MARKER_PROP_KEY_UPGRADE_ADD,
} from "@/config/modules/marker-config";
import { MarkerStore } from "@/store/modules/marker";

/** @description 设置埋点Key数量 */
export const useSetMarker = () => {
  const $markerStore = MarkerStore();

  /** 埋点类型 */
  const marker_type = {
    NORMAL: MARKER_PROP_KEY_NORMAL_ADD,
    SHOP: MARKER_PROP_KEY_SHOP_ADD,
    LOTTERY: MARKER_PROP_KEY_LOTTERY_ADD,
    CHEST: MARKER_PROP_KEY_CHEST_ADD,
    UPGRADE: MARKER_PROP_KEY_UPGRADE_ADD,
  };

  const ExposeMethods = {
    /** @description 设置增加相关埋点 */
    add(
      key: Game.PropKey,
      num: number,
      type: "NORMAL" | "SHOP" | "LOTTERY" | "CHEST" | "UPGRADE" = "NORMAL",
    ) {
      const marker_key = marker_type[type][key];
      if (marker_key) {
        $markerStore.addMarkerNum(marker_key, num);
      }
    },

    /** @description 设置消耗相关的埋点 */
    sub(key: Game.PropKey, num = 1) {
      const marker_key = MARKER_PROP_KEY_SUB[key];
      if (marker_key) {
        $markerStore.addMarkerNum(marker_key, num);
      }
    },
  };

  return {
    ...ExposeMethods,
  };
};
