import switchStore from "@/store/switch";
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
  Relationtype,
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

export default async () => {
  const $switchStore = switchStore();
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
    ["relationtype", Relationtype, "关系类型"],
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
    /* 下载数据 */
    let index = 1;
    for (const [key, request, name] of requests) {
      if (!isExist(key)) {
        $switchStore.$loading.show(
          `正在下载${name}列表${index++}/${requests.length}`
        );
        setData("data_" + key, await request());
      }
    }

    /* 下载语音数据 */
    let voice_index = 1;
    const hero_list = await getHeroBasic();
    for (let i = 0; i < hero_list.length; i++) {
      if (!["梦奇", "盾山"].includes(hero_list[i].name)) {
        if (!isExist(hero_list[i].name, "voice_")) {
          setData(`voice_${hero_list[i].name}`, {
            data: await Voice(hero_list[i].name),
          });
          $switchStore.$loading.show(
            `正在下载${hero_list[i].name}语音${voice_index++}/${
              hero_list.length - 2
            }`
          );
        }
      }
    }
    await $switchStore.$loading.close();
  };
  getData();
};
