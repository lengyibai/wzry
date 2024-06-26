import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { MarkerStoreType } from "../interface";

import { AuthStore } from "./auth";

import { DEFAULT, MARKER_CONFIG } from "@/config";

/** @description 埋点 */
const MarkerStore = defineStore("marker", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 埋点字段 */
    behaviorMarker: ref<User.Data["behaviorMarker"]>(DEFAULT.userInfoDefault().behaviorMarker),
  };
  const { behaviorMarker } = ExposeData;

  const ExposeComputed = {
    /** 用于展示的埋点信息 */
    marker_num_list: computed(() => {
      const data: Partial<Record<MarkerStoreType.MarkerKey, { label: string; value: number }>> = {};

      for (const [k, v] of Object.entries(behaviorMarker.value)) {
        data[k as MarkerStoreType.MarkerKey] = {
          label: MARKER_CONFIG.MARKER_LABEL[k as MarkerStoreType.MarkerKey],
          value: v,
        };
      }

      return data;
    }),
  };

  const ExposeMethods = {
    /** @description 使用用户配置
     * @param v 用户埋点配置
     */
    useUserMarker(v: User.Data["behaviorMarker"]) {
      behaviorMarker.value = v;
    },

    /** @description 增加数量
     * @param key 埋点字段
     * @param num 增加数量
     */
    addMarkerNum(key: keyof User.Data["behaviorMarker"], num = 1) {
      behaviorMarker.value[key] += num;
      $authStore.updateUserData({
        behaviorMarker: behaviorMarker.value,
      });
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { MarkerStore };
