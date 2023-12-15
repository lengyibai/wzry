import { defineStore } from "pinia";
import { ref } from "vue";

import { API_HERO, API_VOICE_INFO } from "@/api";
import { $tool } from "@/utils";

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
    /** @description: 设置是否启用弹幕 */
    setBarrage(v: boolean) {
      status.value = v;
    },

    /** @description 获取/刷新弹幕 */
    getBarrages() {
      API_HERO.getHeroData().then(async (hero) => {
        const data: Barrage[] = [];

        for (let i = 0; i < hero.length; i++) {
          if (["梦奇", "盾山"].includes(hero[i].name)) continue;
          const hero_voices = await API_VOICE_INFO.getVoice(hero[i].id);

          const hero_firet_voice = hero_voices.map(async (item, index): Promise<Barrage> => {
            //获取随机位置的语音
            const voice_index = $tool.random(0, item.voice.length - 1);
            return {
              id: Number(`${hero[i].id}${index}`),
              heroId: hero[i].id,
              skinName: item.name,
              text: item.voice[voice_index].text,
              link: item.voice[voice_index].link,
              gender: hero[i].gender,
            };
          });
          Promise.all(hero_firet_voice).then((res) => {
            data.push(...res);
          });
        }
        barrages.value = data;
      });
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { BarrageStore };
