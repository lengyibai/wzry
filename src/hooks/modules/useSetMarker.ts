import { MARKER_PROP_KEY_SUB, MARKER_STATUS_KEY } from "@/config/modules/marker-config";
import { MarkerStore } from "@/store/modules/marker";
import type { MarkerStatusKey } from "@/config/interface";

/** @description 设置埋点Key数量 */
export const useSetMarker = () => {
  const $markerStore = MarkerStore();

  const ExposeMethods = {
    /** @description 通过道具key设置消耗相关的埋点
     * @param key 道具Key
     * @param num 消耗数量
     */
    addPropMarkerNum(key: Game.PropKey, num = 1) {
      const marker_key = MARKER_PROP_KEY_SUB[key];
      marker_key && $markerStore.addMarkerNum(marker_key, num);
    },

    /** @description 通过状态key设置相关的埋点
     * @param key 状态Key
     * @param num 数量
     */
    addStatusMarkerNum(key: MarkerStatusKey, num = 1) {
      const marker_key = MARKER_STATUS_KEY[key];
      marker_key && $markerStore.addMarkerNum(marker_key, num);
    },
  };

  return {
    ...ExposeMethods,
  };
};
