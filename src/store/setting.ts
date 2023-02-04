import { defineStore } from "pinia";
import { ref } from "vue";

import { $isPhone } from "@/utils";
import { configDefault } from "@/default";
import clickAudio from "@/store/audio";
import musicStore from "@/store/music";
import cssVarStore from "@/store/cssVar";

/** @description 设置相关 */
const settingStore = defineStore("setting", () => {
  const config = ref<SettingConfig>({ ...configDefault });

  /* 从本地获取配置进行合并 */
  const data = localStorage.getItem("config");
  if (data) config.value = { ...config.value, ...JSON.parse(data) };
  localStorage.setItem("config", JSON.stringify(config.value));

  //如果为移动端，则隐藏视频背景
  config.value.videoBg = !$isPhone;

  /** @description 部分配置需手动生效 */
  const takeEffect = () => {
    const $clickAudio = clickAudio();
    const $musicStore = musicStore();
    const $cssVarStore = cssVarStore();
    $clickAudio.setAudio(config.value.audio);
    $clickAudio.setVolume(config.value.audioVolume);
    $musicStore.setVolume(config.value.musicVolume);
    $cssVarStore.setSpeed(config.value.speed);
    $cssVarStore.setBorder(config.value.border);
    $cssVarStore.setShadow(config.value.shadow);
    $cssVarStore.setShine(config.value.shine);
  };

  /** @description 保存配置到本地 */
  const saveLocal = () => {
    localStorage.setItem("config", JSON.stringify(config.value));
  };

  /**
   * @description: 保存合并配置
   * @param v 保存的配置项
   */
  const saveConfig = (v: Partial<SettingConfig>) => {
    config.value = { ...config.value, ...v };
    saveLocal();
  };

  /**
   * @description: 设置指定tip禁止再次提示
   * @param name tip唯一属性标识符
   */
  const setNoTip = (name: TipKeys) => {
    config.value.noTips[name] = true;
    saveLocal();
  };

  /** @description 恢复所有不再提示 */
  const restoreTip = () => {
    for (const key in config.value.noTips) {
      config.value.noTips[key as TipKeys] = false;
    }
    saveLocal();
  };

  return { config, saveConfig, setNoTip, restoreTip, takeEffect };
});

export default settingStore;
export type SettingStore = ReturnType<typeof settingStore>;
