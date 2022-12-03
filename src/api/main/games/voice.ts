import { get } from "@/api/helper/transfer";

/** @description: 获取语音列表 */
export const getVoice = (hero_name: string) => {
  return Promise.resolve(get<Hero.General[]>({ name: "voice_" + hero_name }));
};

/** @description: 获取指定皮肤语音 */
export const getHeroSkin = (hero_name: string, skin_name: string) => {
  const skins = get<Hero.Skin>({ name: "voice_" + hero_name, key: "name", value: skin_name }, false);
  return Promise.resolve(skins);
};
