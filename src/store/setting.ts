import { defineStore } from "pinia";
import { ref } from "vue";

import { $isPhone } from "@/utils";
import { configDefault } from "@/default";
import clickAudio from "@/store/audio";
import musicStore from "@/store/music";
import cssVarStore from "@/store/cssVar";

const settingStore = defineStore("setting", () => {
  const config = ref<SettingConfig>({ ...configDefault });

  const data = localStorage.getItem("config");
  if (data) config.value = { ...config.value, ...JSON.parse(data) };
  localStorage.setItem("config", JSON.stringify(config.value));

  //如果为移动端，则隐藏视频背景
  if ($isPhone) {
    config.value.videoBg = false;
  }

  /** @description: 部分配置需手动生效 */
  const takeEffect = () => {
    const $clickAudio = clickAudio();
    const $musicStore = musicStore();
    const $cssVarStore = cssVarStore();
    $clickAudio.setAudio(config.value.audio); //音效
    $clickAudio.setVolume(config.value.audioVolume); //音效音量
    $musicStore.setVolume(config.value.musicVolume); //音乐音量
    $cssVarStore.setSpeed(config.value.speed); //动画速度
    $cssVarStore.setBorder(config.value.border); //线条
    $cssVarStore.setShadow(config.value.shadow); //阴影
    $cssVarStore.setShine(config.value.shine); //柔光
  };

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

  return { config, saveConfig, setNoTip, restoreTip, takeEffect };
});

export default settingStore;
export type SettingStore = ReturnType<typeof settingStore>;
