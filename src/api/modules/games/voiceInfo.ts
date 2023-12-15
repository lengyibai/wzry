import { API_HERO_INFO } from "@/api";
import { get } from "@/api/helper/transfer";

/** @description 获取指定英雄语音列表 */
export const getVoice = async (hero_id: number) => {
  const pinyin = await API_HERO_INFO.getHeroPinyin(hero_id);
  const voices = get<{ name: string; voice: { text: string; link: string }[] }[]>({
    name: "voice_" + pinyin,
  });
  return Promise.resolve(voices);
};

/** @description 获取指定皮肤语音 */
export const getSkinVoice = async (hero_id: number, skin_name: string) => {
  const hero_pinyin = await API_HERO_INFO.getHeroPinyin(hero_id);
  const hero_name = await API_HERO_INFO.getHeroName(hero_id);

  if (!["梦奇", "盾山"].includes(hero_name)) {
    let voices = get<Hero.Voices>({
      name: "voice_" + hero_pinyin,
      key: "name",
      value: skin_name,
    });

    //如果没有获取到对应皮肤的语音，则使用原皮肤语音
    if (!voices) {
      voices = get<Hero.Voices>({
        name: "voice_" + hero_pinyin,
        key: "name",
        value: "原皮",
      });
    }

    return Promise.resolve(voices.voice);
  } else {
    return Promise.resolve([]);
  }
};
