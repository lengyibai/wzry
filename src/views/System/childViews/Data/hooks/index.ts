import { ref } from "vue";
import { $deepCopy } from "@/utils/index";
import {
  HeroBasic,
  HeroImg,
  Herodata,
  Skill,
  Skilltype,
  Skilleffect,
  Skin,
  Skintype,
  Relationtype,
  Relationship,
  Equip,
  EquipSynthetic,
  Equiptype,
  Equipeffect,
  Epigraph,
  Epigraphtype,
  Epigrapheffect,
  Professiontype,
  Locationtype,
  Specialtytype,
  Periodtype,
  Camptype,
  RaceType,
} from "@/api/main/data";
export default () => {
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
    ["relationtype", "关系类型"],
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
    herobasic: HeroBasic,
    heroimg: HeroImg,
    herodata: Herodata,
    skill: Skill,
    skilltype: Skilltype,
    skilleffect: Skilleffect,
    skin: Skin,
    skintype: Skintype,
    relationship: Relationship,
    relationtype: Relationtype,
    equip: Equip,
    equipSynthetic: EquipSynthetic,
    equiptype: Equiptype,
    equipeffect: Equipeffect,
    epigraph: Epigraph,
    epigraphtype: Epigraphtype,
    epigrapheffect: Epigrapheffect,
    professiontype: Professiontype,
    locationtype: Locationtype,
    specialtytype: Specialtytype,
    periodtype: Periodtype,
    camptype: Camptype,
    racetype: RaceType,
  };

  const tableData = ref<any[]>([]);
  const cache = ref<any[]>([]);

  /* 获取本地数据 */
  const getLocalData = (name: string, prefix = "data_") => {
    return JSON.parse(localStorage.getItem(prefix + name) as string);
  };

  /* 设置状态 */
  const setStatus = (data: any, v: any) => {
    data.data = JSON.parse(localStorage.getItem("data_" + data.key) as string);
    if (JSON.stringify(v) === JSON.stringify(data.data)) {
      data.status = "最新";
    } else if (data.data.length > v.length) {
      data.status = "本地已更改";
    } else {
      data.status = "待更新";
    }
  };

  /* 更新数据 */
  const updateData = (key: string, data: any) => {
    localStorage.setItem("data_" + key, JSON.stringify(data));
  };

  /* 加载数据 */
  const load = async () => {
    tableData.value = keywords.map((item) => {
      const v = getLocalData(item[0]);
      return {
        name: item[1],
        key: item[0],
        data: v,
        status: "正在检查...",
        length: v.length,
      };
    });
    for (let i = 0; i < tableData.value.length; i++) {
      const data = tableData.value[i];
      const v = (await requests[data.key]()).data;
      setStatus(data, v);
    }

    cache.value = $deepCopy<any[]>(tableData.value);
  };

  return { keywords, requests, load, setStatus, cache, tableData, updateData };
};
