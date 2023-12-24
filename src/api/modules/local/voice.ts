import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取指定英雄语音列表 */
export const getVoiceList = (pinyin: string) => {
  return get<Remote.Voice.Data[]>({ name: `${LOCAL_KEY.VOICE}${pinyin}` });
};
