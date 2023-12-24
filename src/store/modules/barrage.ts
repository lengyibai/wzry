import { defineStore } from "pinia";
import { ref } from "vue";

import { $tool } from "@/utils";
import { KVP_HERO, KVP_VOICE, LOCAL_HERO } from "@/api";

/** @description 语音弹幕 */
const BarrageStore = defineStore("barrage", () => {
  const ExposeData = {
    /** 启用弹幕 */
    status: ref(true),
    /** 弹幕组 */
    barrages: ref<Barrage[]>([]),
  };
  const { status, barrages } = ExposeData;

  const ExposeMethods = {
    /** @description: 设置是否启用弹z幕 */
    setBarrage(v: boolean) {
      status.value = v;
    },

    /** @description 获取/刷新弹幕 */
    getBarrages() {
      const hero_names = LOCAL_HERO.getHeroNameList();
      const hero_gender = KVP_HERO.getHeroGenderKvp();
      const hero_voices = KVP_VOICE.getSkinVoiceKvp();
      const data: Barrage[] = [];

      hero_names.forEach((heroName, index) => {
        if (!["梦奇", "盾山"].includes(heroName.value)) {
          hero_voices[heroName.id].forEach((skins) => {
            //获取随机位置的语音
            const voice_index = $tool.random(0, skins.voice.length - 1);
            data.push({
              id: Number(`${hero_voices[heroName.id]}${index}`),
              heroId: heroName.id,
              skinName: skins.name,
              text: skins.voice[voice_index].text,
              link: skins.voice[voice_index].link,
              gender: hero_gender[heroName.id],
            });
          });
        }
      });
      barrages.value = data;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { BarrageStore };
