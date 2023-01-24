import { defineStore } from "pinia";
import { ref } from "vue";

import { $isPhone } from "@/utils";
import { configDefault } from "@/defaultValue";

const settingStore = defineStore("setting", () => {
  const config = ref<SettingConfig>({ ...configDefault });

  const data = localStorage.getItem("config");
  if (data) config.value = JSON.parse(data);

  if ($isPhone) {
    config.value.videoBg = false;
  }

  /** @description: 保存到本地 */
  const saveLocal = () => {
    localStorage.setItem("config", JSON.stringify(config.value));
  };

  /** @description: 保存设置 */
  const saveConfig = (v: Partial<SettingConfig>) => {
    config.value = { ...config.value, ...v };
    saveLocal();
  };

  /** @description: 设置指定tip禁止再次提示 */
  const setNoTip = (name: TipKeys) => {
    config.value.noTips[name] = true;
    saveLocal();
  };

  /** @description: 恢复所有不再提示 */
  const restoreTip = () => {
    for (const key in config.value.noTips) {
      config.value.noTips[key as TipKeys] = false;
    }
    saveLocal();
  };

  return { config, saveConfig, setNoTip, restoreTip };
});

export default settingStore;
export type SettingStore = ReturnType<typeof settingStore>;
