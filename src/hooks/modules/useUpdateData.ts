import { API_DATA, API_HERO } from "@/api";

const useUpdateData = () => {
  const keywords: [string, string][] = [
    ["herobasic", "英雄基础"],
    ["heroimg", "英雄图片"],
    ["herodata", "英雄信息"],
    ["skill", "技能列表"],
    ["skilltype", "技能类型"],
    ["skilleffect", "技能效果"],
    ["skin", "皮肤"],
    ["skintype", "皮肤类型"],
    ["relationship", "关系"],
    ["equip", "装备"],
    ["equipSynthetic", "装备合成"],
    ["equiptype", "装备类型"],
    ["equipeffect", "装备效果"],
    ["epigraph", "铭文"],
    ["epigraphtype", "铭文类型"],
    ["epigrapheffect", "铭文效果"],
    ["professiontype", "职业"],
    ["locationtype", "定位"],
    ["specialtytype", "特长"],
    ["periodtype", "时期"],
    ["camptype", "阵营"],
    ["racetype", "种族"],
  ];

  const requests: Record<string, () => Promise<any>> = {
    herobasic: API_DATA.HeroBasic,
    heroimg: API_DATA.HeroImg,
    herodata: API_DATA.Herodata,
    skill: API_DATA.Skill,
    skilltype: API_DATA.Skilltype,
    skilleffect: API_DATA.Skilleffect,
    skin: API_DATA.Skin,
    skintype: API_DATA.Skintype,
    relationship: API_DATA.Relationship,
    equip: API_DATA.Equip,
    equipSynthetic: API_DATA.EquipSynthetic,
    equiptype: API_DATA.Equiptype,
    equipeffect: API_DATA.Equipeffect,
    epigraph: API_DATA.Epigraph,
    epigraphtype: API_DATA.Epigraphtype,
    epigrapheffect: API_DATA.Epigrapheffect,
    professiontype: API_DATA.Professiontype,
    locationtype: API_DATA.Locationtype,
    specialtytype: API_DATA.Specialtytype,
    periodtype: API_DATA.Periodtype,
    camptype: API_DATA.Camptype,
    racetype: API_DATA.RaceType,
  };

  let hero_list: Hero.Basic[] = []; //英雄基础列表
  const need_update_data: Record<string, any[]> = {
    names: [],
    keys: [],
    data: [],
  }; //需要更新的数据
  const need_update_voice: Record<string, any[]> = {
    names: [],
    keys: [],
    data: [],
  }; //需要更新的语音

  /* 获取本地数据 */
  const getLocalData = (name: string, prefix = "data_") => {
    return JSON.parse(localStorage.getItem(prefix + name) as string);
  };

  /* 加载数据 */
  const load = async () => {
    hero_list = await API_HERO.getHeroBasic(); //获取英雄基础列表

    //获取远程数据并比对
    const data_requests = keywords.map(async ([key, name]) => {
      const v = (await requests[key]()).data;
      const l = getLocalData(key);
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

        if (JSON.stringify(l) !== JSON.stringify(v)) {
          need_update_voice.names.push(`《${hero.name}》`);
          need_update_voice.keys.push(hero.pinyin);
          need_update_voice.data.push(v);
        }
      }
    });
    await Promise.all(voice_requests);

    //更新覆盖数据
    for (let i = 0; i < need_update_data.keys.length; i++) {
      const key = need_update_data.keys[i];
      localStorage.setItem("data_" + key, JSON.stringify(need_update_data.data[i]));
    }
    for (let i = 0; i < need_update_voice.keys.length; i++) {
      const key = need_update_voice.keys[i];
      localStorage.setItem("voice_" + key, JSON.stringify(need_update_voice.data[i]));
    }

    //返回需要更新的中文字段
    return Promise.resolve({
      data: need_update_data.names.join("、"),
      voice: need_update_voice.names.join("、"),
    });
  };

  return load();
};

export { useUpdateData };
