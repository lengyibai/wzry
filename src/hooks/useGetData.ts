import switchStore from "@/store/globalSwitch";
import {
  getUser,
  getHerobasic,
  getHerodata,
  getSkilltype,
  getSkilleffect,
  getSkin,
  getSkintype,
  getEquip,
  getEquiptype,
  getEquipeffect,
  getEpigraph,
  getEpigraphtype,
  getEpigrapheffect,
  getProfessiontype,
  getLocationtype,
  getSpecialtytype,
  getPeriodtype,
  getCamptype,
  getRelationtype,
} from "@/api/main/data";

export default () => {
  const $switchStore = switchStore();

  const arr: [string, () => Promise<any>, string][] = [
    ["user", getUser, "用户"],
    ["herobasic", getHerobasic, "英雄基础"],
    ["herodata", getHerodata, "英雄信息"],
    ["skilltype", getSkilltype, "技能类型"],
    ["skilleffect", getSkilleffect, "技能效果"],
    ["skin", getSkin, "皮肤"],
    ["skintype", getSkintype, "皮肤类型"],
    ["equip", getEquip, "装备"],
    ["equiptype", getEquiptype, "装备类型"],
    ["equipeffect", getEquipeffect, "装备效果"],
    ["epigraph", getEpigraph, "铭文"],
    ["epigraphtype", getEpigraphtype, "铭文类型"],
    ["epigrapheffect", getEpigrapheffect, "铭文效果"],
    ["professiontype", getProfessiontype, "职业"],
    ["locationtype", getLocationtype, "定位"],
    ["specialtytype", getSpecialtytype, "特长"],
    ["periodtype", getPeriodtype, "时期"],
    ["camptype", getCamptype, "阵营"],
    ["relationtype", getRelationtype, "关系"],
  ];

  const setData = (name: string, data: any) => {
    localStorage.setItem("data_" + name, JSON.stringify(data.data));
  };

  const getData = async () => {
    let index = 1;
    for (const [key, request, name] of arr) {
      $switchStore.$loading.show(`正在下载${name}列表${index++}/20`);
      setData(key, await request());
    }
    await $switchStore.$loading.close();
  };
  if (!localStorage.getItem("data_user")) {
    getData();
  }
};
