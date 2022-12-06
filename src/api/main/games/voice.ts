import { get } from "@/api/helper/transfer";

/** @description: 获取语音列表 */
export const getVoice = (hero_name: string) => {
  return Promise.resolve(get<Hero.General[]>({ name: "voice_" + hero_name }));
};

/** @description: 获取指定皮肤语音 */
export const getSkinVoice = (hero_name: string, skin_name: string) => {
  if (!["梦奇", "盾山"].includes(hero_name)) {
    const voices = get<Hero.Voices>({ name: "voice_" + hero_name, key: "name", value: skin_name });
    return Promise.resolve(voices.voice);
  } else {
    return Promise.resolve([]);
  }
};
