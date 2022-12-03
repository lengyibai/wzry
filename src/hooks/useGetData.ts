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
  getVoice,
} from "@/api/main/data";
import { getHeroBasic } from "@/api/main/games/hero";

export default async () => {
  const $switchStore = switchStore();

  const requests: [string, () => Promise<any>, string][] = [
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
    localStorage.setItem(name, JSON.stringify(data.data));
  };

  const getData = async () => {
    /* 下载数据 */
    let index = 1;
    for (const [key, request, name] of requests) {
      $switchStore.$loading.show(`正在下载${name}列表${index++}/${requests.length}`);
      setData("data_" + key, await request());
    }

    /* 下载语音数据 */
    let voice_index = 1;
    const hero_list = await getHeroBasic();
    for (let i = 0; i < hero_list.length; i++) {
      if (!["梦奇", "盾山"].includes(hero_list[i].name)) {
        setData(`voice_${hero_list[i].name}`, { data: await getVoice(hero_list[i].name) });
        $switchStore.$loading.show(`正在下载${hero_list[i].name}语音${voice_index++}/${hero_list.length - 2}`);
      }
    }
    await $switchStore.$loading.close();
  };

  if (!localStorage.getItem("data_user")) {
    getData();
  }
};
