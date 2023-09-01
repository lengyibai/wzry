import { ref } from "vue";

import { API_DATA, API_HERO } from "@/api";

const useGetData = () => {
  const total = ref(0); //请求总数
  const index = ref(1); //用于计算下载进度
  const type = ref("基础数据"); //正在下载的数据类型
  const finish = ref(false); //请求结束

  const requests: [string, () => Promise<any>, string][] = [
    ["user", API_DATA.User, "用户"],
    ["herobasic", API_DATA.HeroBasic, "英雄基础"],
    ["heroimg", API_DATA.HeroImg, "英雄图片"],
    ["herodata", API_DATA.Herodata, "英雄信息"],
    ["skill", API_DATA.Skill, "技能列表"],
    ["skilltype", API_DATA.Skilltype, "技能类型"],
    ["skilleffect", API_DATA.Skilleffect, "技能效果"],
    ["skin", API_DATA.Skin, "皮肤"],
    ["skintype", API_DATA.Skintype, "皮肤类型"],
    ["relationship", API_DATA.Relationship, "关系"],
    ["equip", API_DATA.Equip, "装备"],
    ["equipSynthetic", API_DATA.EquipSynthetic, "装备合成"],
    ["equiptype", API_DATA.Equiptype, "装备类型"],
    ["equipeffect", API_DATA.Equipeffect, "装备效果"],
    ["epigraph", API_DATA.Epigraph, "铭文"],
    ["epigraphtype", API_DATA.Epigraphtype, "铭文类型"],
    ["epigrapheffect", API_DATA.Epigrapheffect, "铭文效果"],
    ["professiontype", API_DATA.Professiontype, "职业"],
    ["locationtype", API_DATA.Locationtype, "定位"],
    ["specialtytype", API_DATA.Specialtytype, "特长"],
    ["periodtype", API_DATA.Periodtype, "时期"],
    ["camptype", API_DATA.Camptype, "阵营"],
    ["racetype", API_DATA.RaceType, "种族"],
  ];

  const setData = <T extends { data: unknown }>(name: string, data: T) => {
    localStorage.setItem(name, JSON.stringify(data.data));
  };
  const isExist = (name: string, prefix = "data_") => {
    return !!localStorage.getItem(prefix + name);
  };

  const getData = async () => {
    total.value = requests.length;

    /* 下载数据 */
    //收集处理请求
    const data_requests = requests.map(async ([key, request]) => {
      if (!isExist(key)) {
        setData("data_" + key, await request());
        index.value++;
      }
    });
    await Promise.all(data_requests);

    const hero_list = await API_HERO.getHeroBasic();
    total.value = hero_list.length - 2;

    /* 下载语音数据 */
    type.value = "语音数据";
    index.value = 0;
    //收集处理请求
    const voice_requests = hero_list.map(async (item) => {
      if (!["梦奇", "盾山"].includes(item.name)) {
        if (!isExist(item.pinyin, "voice_")) {
          setData(`voice_${item.pinyin}`, {
            data: (await API_DATA.Voice(item.name)).data,
          });
          index.value++;
        }
      }
    });
    await Promise.all(voice_requests);

    finish.value = true;
  };
  getData();

  return {
    /** 请求总数 */
    total,
    /** 用于计算下载进度 */
    index,
    /** 正在下载的数据类型 */
    type,
    /** 请求结束 */
    finish,
  };
};

export { useGetData };
