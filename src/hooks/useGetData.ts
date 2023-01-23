import { ref } from "vue";

import {
  Camptype,
  RaceType,
  Epigraph,
  Epigrapheffect,
  Epigraphtype,
  Equip,
  Equipeffect,
  EquipSynthetic,
  Equiptype,
  HeroBasic,
  Herodata,
  HeroImg,
  Locationtype,
  Periodtype,
  Professiontype,
  Relationship,
  Skill,
  Skilleffect,
  Skilltype,
  Skin,
  Skintype,
  Specialtytype,
  User,
  Voice,
} from "@/api/main/data";
import { getHeroBasic } from "@/api/main/games/hero";

export default () => {
  const total = ref(0); //请求总数
  const index = ref(1); //
  const type = ref("基础数据"); //正在下载的数据类型
  const title = ref(""); //正在下载的数据名
  const finish = ref(false); //请求结束

  const requests: [string, () => Promise<any>, string][] = [
    ["user", User, "用户"],
    ["herobasic", HeroBasic, "英雄基础"],
    ["heroimg", HeroImg, "英雄图片"],
    ["herodata", Herodata, "英雄信息"],
    ["skill", Skill, "技能列表"],
    ["skilltype", Skilltype, "技能类型"],
    ["skilleffect", Skilleffect, "技能效果"],
    ["skin", Skin, "皮肤"],
    ["skintype", Skintype, "皮肤类型"],
    ["relationship", Relationship, "关系"],
    ["equip", Equip, "装备"],
    ["equipSynthetic", EquipSynthetic, "装备合成"],
    ["equiptype", Equiptype, "装备类型"],
    ["equipeffect", Equipeffect, "装备效果"],
    ["epigraph", Epigraph, "铭文"],
    ["epigraphtype", Epigraphtype, "铭文类型"],
    ["epigrapheffect", Epigrapheffect, "铭文效果"],
    ["professiontype", Professiontype, "职业"],
    ["locationtype", Locationtype, "定位"],
    ["specialtytype", Specialtytype, "特长"],
    ["periodtype", Periodtype, "时期"],
    ["camptype", Camptype, "阵营"],
    ["racetype", RaceType, "种族"],
  ];

  const setData = (name: string, data: any) => {
    localStorage.setItem(name, JSON.stringify(data.data));
  };
  const isExist = (name: string, prefix = "data_") => {
    return !!localStorage.getItem(prefix + name);
  };

  const getData = async () => {
    total.value = requests.length;

    /* 下载数据 */
    for (const [key, request, name] of requests) {
      if (!isExist(key)) {
        title.value = name;
        setData("data_" + key, await request());
        await new Promise((resolve) => setTimeout(resolve, 50));
        index.value++;
      }
    }

    const hero_list = await getHeroBasic();
    total.value = hero_list.length - 2;

    /* 下载语音数据 */
    type.value = "语音数据";
    index.value = 0;
    for (let i = 0; i < hero_list.length; i++) {
      if (!["梦奇", "盾山"].includes(hero_list[i].name)) {
        if (!isExist(hero_list[i].pinyin, "voice_")) {
          title.value = hero_list[i].name;
          setData(`voice_${hero_list[i].pinyin}`, {
            data: (await Voice(hero_list[i].pinyin)).data,
          });
          await new Promise((resolve) => setTimeout(resolve, 50));
          index.value++;
        }
      }
    }
    finish.value = true;
  };
  getData();

  return {
    total,
    index,
    title,
    type,
    finish,
  };
};
