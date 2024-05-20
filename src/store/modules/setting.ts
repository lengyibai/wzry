import { defineStore } from "pinia";
import { ref } from "vue";

import { AuthStore, MusicStore } from "@/store";
import { setLanguage } from "@/language";
import { DEFAULT } from "@/config";
import { useBarrages } from "@/layout/components/BarrageMain/hooks/useBarrages";
import { useCssClassToggle, usePlayAudio } from "@/hooks";

/** @description 设置相关 */
const SettingStore = defineStore("setting", () => {
  const $authStore = AuthStore();

  const $musicStore = MusicStore();

  const { setShine } = useCssClassToggle();
  const { setBarrage } = useBarrages();
  const { setAudioVolume, setAudioSwitch } = usePlayAudio();

  const ExposeData = {
    config: ref<Global.SettingConfig>(DEFAULT.configDefault()),
  };
  const { config } = ExposeData;

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
      this.takeEffect();
    },

    /** @description 部分配置需手动生效 */
    takeEffect() {
      setLanguage(config.value.language);
      setAudioSwitch(config.value.audio);
      setAudioVolume(config.value.audioVolume);
      $musicStore.setVolume(config.value.musicVolume);
      setShine(config.value.shine);
      setBarrage(config.value.barrage);
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
        ...DEFAULT.configDefault(),
        noTips: config.value.noTips,
      };
      this.takeEffect();
      setTimeout(() => {
        $musicStore.play(false);
      }, 1000);
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
