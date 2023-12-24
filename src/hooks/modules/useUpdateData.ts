import { LOCAL_HERO, LOCAL_VOICE } from "@/api";
import { REQUEST } from "@/config";

/** @description 同步更新远程数据 */
const useUpdateData = () => {
  /** 需要更新的语音 */
  const need_update_data: Record<string, unknown[]> = {
    names: [],
    keys: [],
    data: [],
  };
  /** 需要更新的数据 */
  const need_update_voice: Record<string, unknown[]> = {
    names: [],
    keys: [],
    data: [],
  };

  /* 获取本地数据 */
  const getLocalData = (name: string, prefix = "") => {
    return JSON.parse(localStorage.getItem(prefix + name) as string);
  };

  /* 加载数据 */
  const load = async () => {
    //获取英雄基础列表
    const hero_list = LOCAL_HERO.getHeroNameList().map((hero) => ({
      id: hero.id,
      name: hero.value,
    }));

    //获取远程数据并比对
    const data_requests = REQUEST.map(async ([key, request]) => {
      const v = (await request()).data;
      const l = getLocalData(key);

      //如果数据不一样，则将该数据名、数据键名、数据值加入
      if (JSON.stringify(l) !== JSON.stringify(v)) {
        need_update_data.names.push(`《${name}》`);
        need_update_data.keys.push(key);
        need_update_data.data.push(v);
      }
    });
    await Promise.all(data_requests);

    //获取远程语音并比对
    hero_list.forEach((hero) => {
      if (!["梦奇", "盾山"].includes(hero.name)) {
        const pinyin = LOCAL_HERO.getHeroPinyinList()[hero.id].value;
        const v = LOCAL_VOICE.getVoiceList(pinyin);
        const l = getLocalData(pinyin, "voice_");

        //如果数据不一样，则将该数据名、数据键名、数据值加入
        if (JSON.stringify(l) !== JSON.stringify(v)) {
          need_update_voice.names.push(`《${hero.name}》`);
          need_update_voice.keys.push(pinyin);
          need_update_voice.data.push(v);
        }
      }
    });

    //更新并覆盖本地存储数据
    for (let i = 0; i < need_update_data.keys.length; i++) {
      const key = need_update_data.keys[i];
      localStorage.setItem(key as string, JSON.stringify(need_update_data.data[i]));
    }
    for (let i = 0; i < need_update_voice.keys.length; i++) {
      const key = need_update_voice.keys[i];
      localStorage.setItem("voice_" + key, JSON.stringify(need_update_voice.data[i]));
    }

    //返回需要更新的中文字段用于显示更新了哪些数据
    return Promise.resolve({
      data: need_update_data.names.join("、"),
      voice: need_update_voice.names.join("、"),
    });
  };

  return load();
};

export { useUpdateData };
