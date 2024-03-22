import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { AuthStore } from "./auth";

import { DEFAULT, MARKER_CONFIG } from "@/config";

/** @description 埋点 */
const MarkerStore = defineStore("marker", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 埋点字段 */
    behaviorMarker: ref<Global.UserData["behaviorMarker"]>(
      DEFAULT.userDefaultInfo().behaviorMarker,
    ),
  };
  const { behaviorMarker } = ExposeData;

  const ExposeComputed = {
    /** 用于展示的埋点信息 */
    marker_num_list: computed(() => {
      const data = [];

      for (const [k, v] of Object.entries(behaviorMarker.value)) {
        data.push({
          label: MARKER_CONFIG.MARKER_LABEL[k as keyof Global.UserData["behaviorMarker"]],
          value: v,
          key: k,
        });
      }

      return data;
    }),
  };

  const ExposeMethods = {
    /** @description 使用用户配置 */
    useUserMarker(v: Global.UserData["behaviorMarker"]) {
      behaviorMarker.value = v;
    },

    /** @description 增加数量 */
    addMarkerNum(key: keyof Global.UserData["behaviorMarker"], num = 1) {
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
