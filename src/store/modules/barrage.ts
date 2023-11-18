import { defineStore } from "pinia";
import { ref } from "vue";

import { API_HERO, API_VOICE } from "@/api";
import { $tool } from "@/utils";

/** @description 语音弹幕 */
const BarrageStore = defineStore("barrage", () => {
  /** 启用弹幕 */
  const status = ref(true);
  /** 弹幕组 */
  const barrages = ref<Barrage[]>([]);

  /** @description: 关闭音效功能 */
  const setBarrage = (v: boolean) => {
    status.value = v;
  };

  /** @description 获取/刷新弹幕 */
  const getBarrages = () => {
    API_HERO.getHeroData().then(async (hero) => {
      const data: Barrage[] = [];

      for (let i = 0; i < hero.length; i++) {
        if (["梦奇", "盾山"].includes(hero[i].name)) continue;
        const hero_voices = await API_VOICE.getVoice(hero[i].name);

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
  };

  return {
    /** 启用弹幕 */
    status,
    /** 弹幕组 */
    barrages,
    setBarrage,
    getBarrages,
  };
});

export { BarrageStore };
