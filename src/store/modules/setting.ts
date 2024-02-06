import { defineStore } from "pinia";
import { ref } from "vue";

import { CssVarStore } from "./cssVar";

import { AudioStore, AuthStore, BarrageStore, MusicStore } from "@/store";
import { configDefault } from "@/default";
import { setLanguage } from "@/language";

/** @description 设置相关 */
const SettingStore = defineStore("setting", () => {
  const $authStore = AuthStore();
  const $audioStore = AudioStore();
  const $musicStore = MusicStore();
  const $cssVarStore = CssVarStore();
  const $barrageStore = BarrageStore();

  const ExposeData = {
    config: ref<Global.SettingConfig>(configDefault()),
  };
  const { config } = ExposeData;

  /** @description 部分配置需手动生效 */
  const takeEffect = () => {
    setLanguage(config.value.language);
    $audioStore.setAudio(config.value.audio);
    $barrageStore.setBarrage(config.value.barrage);
    $audioStore.setVolume(config.value.audioVolume);
    $musicStore.setVolume(config.value.musicVolume);
    $cssVarStore.setShine(config.value.shine);
  };

  /** @description 保存配置到本地 */
  const saveLocal = () => {
    $authStore.updateUserData({
      settingConfig: config.value,
    });
  };

  const ExposeMethods = {
    /** @description 使用用户配置 */
    useUserSetting(v: Global.SettingConfig) {
      config.value = v;
      takeEffect();
    },

    /**
     * @description: 设置指定tip禁止再次提示
     * @param name tip唯一属性标识符
     */
    setNoTip(name: keyof Global.Tip.Key) {
      config.value.noTips[name] = true;
      saveLocal();
    },

    /** @description 恢复所有不再提示 */
    restoreTip() {
      for (const key in config.value.noTips) {
        config.value.noTips[key as keyof Global.Tip.Key] = false;
      }
      saveLocal();
    },

    /** @description 重置配置 */
    resetConfig() {
      config.value = {
        ...configDefault(),
        noTips: config.value.noTips,
      };
      takeEffect();
    },

    /**
     * @description: 保存合并配置
     * @param v 保存的配置项
     */
    saveConfig(v: Partial<Global.SettingConfig>) {
      config.value = { ...config.value, ...v };
      saveLocal();
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { SettingStore };
