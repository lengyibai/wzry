import { API_DATA, API_HERO } from "@/api";
import { ResultData } from "@/api/interface";
import { CONFIG } from "@/config";

/* 同步更新远程数据 */
const useUpdateData = () => {
  const keywords: [string, string][] = [
    [CONFIG.LOCAL_KEY.HERO_BASIC, "英雄基础"],
    [CONFIG.LOCAL_KEY.HERO_IMG, "英雄图片"],
    [CONFIG.LOCAL_KEY.HERO_ATLAS, "英雄图集"],
    [CONFIG.LOCAL_KEY.HERO_DATA, "英雄信息"],
    [CONFIG.LOCAL_KEY.SKILL, "技能列表"],
    [CONFIG.LOCAL_KEY.SKILL_TYPE, "技能类型"],
    [CONFIG.LOCAL_KEY.SKILL_EFFECT, "技能效果"],
    [CONFIG.LOCAL_KEY.SKIN, "皮肤"],
    [CONFIG.LOCAL_KEY.SKIN_TYPE, "皮肤类型"],
    [CONFIG.LOCAL_KEY.RELATIONSHIP, "关系"],
    [CONFIG.LOCAL_KEY.EQUIP, "装备"],
    [CONFIG.LOCAL_KEY.EQUIP_SYNTHETIC, "装备合成"],
    [CONFIG.LOCAL_KEY.EQUIP_TYPE, "装备类型"],
    [CONFIG.LOCAL_KEY.EQUIP_EFFECT, "装备效果"],
    [CONFIG.LOCAL_KEY.EPIGRAPH, "铭文"],
    [CONFIG.LOCAL_KEY.EPIGRAPH_TYPE, "铭文类型"],
    [CONFIG.LOCAL_KEY.EPIGRAPH_EFFECT, "铭文效果"],
    [CONFIG.LOCAL_KEY.PROFESSION_TYPE, "职业"],
    [CONFIG.LOCAL_KEY.LOCATION_TYPE, "定位"],
    [CONFIG.LOCAL_KEY.SPECIALTY_TYPE, "特长"],
    [CONFIG.LOCAL_KEY.PERIOD_TYPE, "时期"],
    [CONFIG.LOCAL_KEY.CAMP_TYPE, "阵营"],
    [CONFIG.LOCAL_KEY.RACE_TYPE, "种族"],
  ];

  const requests: Record<string, () => Promise<ResultData<unknown[]>>> = {
    [CONFIG.LOCAL_KEY.HERO_BASIC]: API_DATA.HeroBasic,
    [CONFIG.LOCAL_KEY.HERO_IMG]: API_DATA.HeroImg,
    [CONFIG.LOCAL_KEY.HERO_ATLAS]: API_DATA.HeroAtlas,
    [CONFIG.LOCAL_KEY.HERO_DATA]: API_DATA.Herodata,
    [CONFIG.LOCAL_KEY.SKILL]: API_DATA.Skill,
    [CONFIG.LOCAL_KEY.SKILL_TYPE]: API_DATA.Skilltype,
    [CONFIG.LOCAL_KEY.SKILL_EFFECT]: API_DATA.Skilleffect,
    [CONFIG.LOCAL_KEY.SKIN]: API_DATA.Skin,
    [CONFIG.LOCAL_KEY.SKIN_TYPE]: API_DATA.Skintype,
    [CONFIG.LOCAL_KEY.RELATIONSHIP]: API_DATA.Relationship,
    [CONFIG.LOCAL_KEY.EQUIP]: API_DATA.Equip,
    [CONFIG.LOCAL_KEY.EQUIP_SYNTHETIC]: API_DATA.EquipSynthetic,
    [CONFIG.LOCAL_KEY.EQUIP_TYPE]: API_DATA.Equiptype,
    [CONFIG.LOCAL_KEY.EQUIP_EFFECT]: API_DATA.Equipeffect,
    [CONFIG.LOCAL_KEY.EPIGRAPH]: API_DATA.Epigraph,
    [CONFIG.LOCAL_KEY.EPIGRAPH_TYPE]: API_DATA.Epigraphtype,
    [CONFIG.LOCAL_KEY.EPIGRAPH_EFFECT]: API_DATA.Epigrapheffect,
    [CONFIG.LOCAL_KEY.PROFESSION_TYPE]: API_DATA.Professiontype,
    [CONFIG.LOCAL_KEY.LOCATION_TYPE]: API_DATA.Locationtype,
    [CONFIG.LOCAL_KEY.SPECIALTY_TYPE]: API_DATA.Specialtytype,
    [CONFIG.LOCAL_KEY.PERIOD_TYPE]: API_DATA.Periodtype,
    [CONFIG.LOCAL_KEY.CAMP_TYPE]: API_DATA.Camptype,
    [CONFIG.LOCAL_KEY.RACE_TYPE]: API_DATA.RaceType,
  };

  /** 英雄基础列表 */
  let hero_list: Hero.Basic[] = [];
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
    hero_list = await API_HERO.getHeroBasic();

    //获取远程数据并比对
    const data_requests = keywords.map(async ([key, name]) => {
      const v = (await requests[key]()).data;
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
    const voice_requests = hero_list.map(async (hero) => {
      if (!["梦奇", "盾山"].includes(hero.name)) {
        const v = (await API_DATA.Voice(hero.name)).data;
        const l = getLocalData(hero.pinyin, "voice_");

        //如果数据不一样，则将该数据名、数据键名、数据值加入
        if (JSON.stringify(l) !== JSON.stringify(v)) {
          need_update_voice.names.push(`《${hero.name}》`);
          need_update_voice.keys.push(hero.pinyin);
          need_update_voice.data.push(v);
        }
      }
    });
    await Promise.all(voice_requests);

    //更新并覆盖本地存储数据
    for (let i = 0; i < need_update_data.keys.length; i++) {
      const key = need_update_data.keys[i];
      localStorage.setItem(
        key as string,
        JSON.stringify(need_update_data.data[i]),
      );
    }
    for (let i = 0; i < need_update_voice.keys.length; i++) {
      const key = need_update_voice.keys[i];
      localStorage.setItem(
        "voice_" + key,
        JSON.stringify(need_update_voice.data[i]),
      );
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
