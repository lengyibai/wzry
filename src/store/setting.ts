import { defineStore } from "pinia";
import { ref } from "vue";
import { $isPhone } from "@/utils";

const settingStore = defineStore("setting", () => {
  const config = ref<SettingConfig>({
    tip: true,
    videoBg: true,
    audio: true,
    audioVolume: 50,
    music: true,
    musicVolume: 50,
    theme: 0,
    speed: 1,
    loginSound: true,
  });

  const data = localStorage.getItem("config");
  if (data) config.value = { ...config.value, ...JSON.parse(data) };

  if ($isPhone) {
    config.value.videoBg = false;
  }

  /** @description: 保存设置 */
  const saveConfig = (v: SettingConfig) => {
    config.value = { ...config.value, ...v };
    localStorage.setItem("config", JSON.stringify(config.value));
  };

  return { config, saveConfig };
});

export default settingStore;
export type SettingStore = ReturnType<typeof settingStore>;
