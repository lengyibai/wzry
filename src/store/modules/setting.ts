import { defineStore } from "pinia";
import { ref } from "vue";

import { CssVarStore } from "./cssVar";

import { AudioStore, BarrageStore, MusicStore } from "@/store";
import { configDefault } from "@/default";
import { setLanguage } from "@/language";
import { CONFIG } from "@/config";

/** @description 设置相关 */
const SettingStore = defineStore("setting", () => {
  const $audioStore = AudioStore();
  const $musicStore = MusicStore();
  const $cssVarStore = CssVarStore();
  const $barrageStore = BarrageStore();

  const config = ref<SettingConfig>({ ...configDefault() });

  /* 从本地获取配置进行合并 */
  const data = localStorage.getItem(CONFIG.LOCAL_KEY.CONFIG);
  if (data) config.value = { ...config.value, ...JSON.parse(data) };
  localStorage.setItem(CONFIG.LOCAL_KEY.CONFIG, JSON.stringify(config.value));

  /** @description 部分配置需手动生效 */
  const takeEffect = () => {
    setLanguage(config.value.language);
    $audioStore.setAudio(config.value.audio);
    $barrageStore.setBarrage(config.value.barrage);
    $audioStore.setVolume(config.value.audioVolume);
    $musicStore.setVolume(config.value.musicVolume);
    $cssVarStore.setBorder(config.value.border);
    $cssVarStore.setShadow(config.value.shadow);
    $cssVarStore.setShine(config.value.shine);
  };

  /** @description 保存配置到本地 */
  const saveLocal = () => {
    localStorage.setItem(CONFIG.LOCAL_KEY.CONFIG, JSON.stringify(config.value));
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

  return {
    config,
    saveConfig,
    setNoTip,
    restoreTip,
    takeEffect,
  };
});

export { SettingStore };
