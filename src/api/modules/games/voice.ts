import { KVP_HERO, KVP_VOICE } from "@/api";

/** @description 获取指定皮肤语音 */
export const getSkinVoice = (hero_id: number, skin_name: string): Remote.Voice.Data => {
  const skin_voices = KVP_VOICE.getSkinVoiceListKvp();
  const hero_name = KVP_HERO.getHeroNameKvp();

  if (!["梦奇", "盾山"].includes(hero_name[hero_id])) {
    const voice_data = skin_voices[hero_id].find((item) => item.name === skin_name);

    //如果没有获取到对应皮肤的语音，则使用原皮肤语音
    if (voice_data) return voice_data;
    return skin_voices[hero_id].find((item) => item.name === "原皮")!;
  } else {
    return [] as unknown as Remote.Voice.Data;
  }
};
