import switchStore from "@/store/switch";
import {
  HeroBasic,
  HeroImg,
  Herodata,
  Skill,
  Skilltype,
  Skilleffect,
  Skin,
  Skintype,
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
  const $switchStore = switchStore();

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
    herobasic: HeroBasic,
    heroimg: HeroImg,
    herodata: Herodata,
    skill: Skill,
    skilltype: Skilltype,
    skilleffect: Skilleffect,
    skin: Skin,
    skintype: Skintype,
    relationship: Relationship,
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

  let loacl_data: any[] = []; // 本地数据
  const remote_data: any[] = []; // 远程数据
  const need_update: Record<string, any[]> = {
    names: [],
    keys: [],
    data: [],
  }; //需要更新的数据

  /** @description: 获取本地数据 */
  const getLocalData = (name: string, prefix = "data_") => {
    return JSON.parse(localStorage.getItem(prefix + name) as string);
  };

  /* 加载数据 */
  const load = async () => {
    loacl_data = keywords.map((item) => {
      const v = getLocalData(item[0]);
      return {
        name: item[1],
        key: item[0],
        data: v,
      };
    });

    //获取远程数据
    for (let i = 0; i < loacl_data.length; i++) {
      const v = (await requests[keywords[i][0]]()).data;
      remote_data.push(v);
    }

    compare();
  };
  load();

  /* 比对远程数据设置状态 */
  const compare = () => {
    for (let i = 0; i < keywords.length; i++) {
      if (
        JSON.stringify(loacl_data[i].data) !== JSON.stringify(remote_data[i])
      ) {
        need_update.names.push(loacl_data[i].name);
        need_update.keys.push(loacl_data[i].key);
        need_update.data.push(remote_data[i]);
      }
    }

    if (need_update.names.length) {
      $switchStore.$tip({
        title: "更新提醒",
        text: `${need_update.names.join("、")}需要更新，是否立即更新？`,
        btn: true,
        btnText: ["暂不", "更新"],
        btnFn: updateData,
      });
    }
  };

  /* 更新数据 */
  const updateData = () => {
    $switchStore.$msg("正在更新");

    for (let i = 0; i < need_update.keys.length; i++) {
      const key = need_update.keys[i];
      localStorage.setItem("data_" + key, JSON.stringify(need_update.data[i]));
    }

    $switchStore.$msg("更新成功，3秒后自动刷新浏览器");

    setTimeout(() => {
      location.reload();
    }, 4000);
  };
  return {};
};
