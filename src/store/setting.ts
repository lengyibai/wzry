import { defineStore } from "pinia";
import { ref } from "vue";

import { $isPhone } from "@/utils";
import { configDefault } from "@/defaultValue";

const settingStore = defineStore("setting", () => {
  const config = ref<SettingConfig>({ ...configDefault });
  const takeEffect = ref<() => void>(() => {}); //本地配置立即生效函数

  const data = localStorage.getItem("config");
  if (data) config.value = JSON.parse(data);

  if ($isPhone) {
    config.value.videoBg = false;
  }

  /** @description: 保存设置 */
  const saveConfig = (v: Partial<SettingConfig>) => {
    config.value = { ...config.value, ...v };
    localStorage.setItem("config", JSON.stringify(config.value));
  };

  /** @description: 设置本地配置立即生效函数 */
  const setTakeEffectFn = (fn: () => void) => {
    takeEffect.value = fn;
  };

  return { config, saveConfig, takeEffect, setTakeEffectFn };
});

export default settingStore;
export type SettingStore = ReturnType<typeof settingStore>;
