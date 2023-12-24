import { LOCAL_HERO, LOCAL_VOICE } from "@/api";

/** @description 获取皮肤语音列表键值表 */
export const getSkinVoiceKvp = () => {
  const hero_ids = LOCAL_HERO.getHeroPinyinList();
  const kvp: Record<number, Remote.Voice.Data[]> = {};
  hero_ids.forEach((item) => {
    kvp[item.id] = LOCAL_VOICE.getVoiceList(item.value);
  });
  return kvp;
};
