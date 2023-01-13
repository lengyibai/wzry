import { defineStore } from "pinia";
import { ref } from "vue";

const switchStore = defineStore("setting", () => {
  const config = ref({
    tip: true,
    videoBg: false,
    audio: true,
    audioVolume: 50,
    music: true,
    musicVolume: 50,
    lazy: true,
    theme: 0,
    speed: 1,
  });

  const data = localStorage.getItem("config");
  if (data) config.value = { ...config.value, ...JSON.parse(data) };

  /** @description: 保存设置 */
  const saveConfig = (v: any) => {
    config.value = v;
    localStorage.setItem("config", JSON.stringify(v));
  };
  return { config, saveConfig };
});

export default switchStore;
