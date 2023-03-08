import { getHeroPinyin } from "./hero";

import { get } from "@/api/helper/transfer";

/**
 * @description 获取语音列表
 * @param hero_name 英雄名
 */
export const getVoice = async (hero_name: string) => {
  const pinyin = await getHeroPinyin(hero_name);
  return Promise.resolve(get<General[]>({ name: "voice_" + pinyin }));
};

/**
 * @description 获取指定皮肤语音
 * @param hero_name 英雄名
 * @param skin_name 皮肤名
 */
export const getSkinVoice = async (hero_name: string, skin_name: string) => {
  const pinyin = await getHeroPinyin(hero_name);

  if (!["梦奇", "盾山"].includes(hero_name)) {
    let voices = get<Hero.Voices>({
      name: "voice_" + pinyin,
      key: "name",
      value: skin_name,
    });

    //如果没有获取到对应皮肤的语音，则使用原皮肤语音
    if (!voices) {
      voices = get<Hero.Voices>({
        name: "voice_" + pinyin,
        key: "name",
        value: "原皮",
      });
    }

    return Promise.resolve(voices.voice);
  } else {
    return Promise.resolve([]);
  }
};
