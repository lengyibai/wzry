import { getHeroPinyin } from "../games/hero";

import http from "@/api";

/** @description 获取版本信息 */
export const Version = () => http.Get<VersionUpdate>("/version.json");

/** @description 获取公告 */
export const Notice = () => http.Get<string>("/notice.json");

/** @description 获取计划 */
export const Todo = () => http.Get<string>("/todo.json");

/** @description 获取战绩 */
export const Team = () => http.Get<string>("/team.json");

/** @description 获取用户列表 */
export const User = () => http.Get<User[]>("/user.json");

/** @description 获取英雄基础列表 */
export const HeroBasic = () => http.Get<General[]>("/heroBasic.json");

/** @description 获取英雄图片列表 */
export const HeroImg = () => http.Get<Hero.HeadImg[]>("/heroImg.json");

/** @description 获取英雄信息列表 */
export const Herodata = () => http.Get<Hero.Data[]>("/heroData.json");

/**
 * @description 获取英雄语音列表
 * @param hero_name 英雄名
 */
export const Voice = async (hero_name: string) => {
  const pinyin = await getHeroPinyin(hero_name);
  return http.Get<Hero.Voices[]>(`/voices/${pinyin}.json`);
};

/** @description 获取技能列表 */
export const Skill = () => http.Get<Hero.Skill[]>("/skill.json");

/** @description 获取技能类型列表 */
export const Skilltype = () => http.Get<Hero.SkillType[]>("/skillType.json");

/** @description 获取技能效果列表 */
export const Skilleffect = () => http.Get<Hero.SkillEffect[]>("/skillEffect.json");

/** @description 获取皮肤列表 */
export const Skin = () => http.Get<Hero.Skin[]>("/skin.json");

/** @description 获取皮肤类型列表 */
export const Skintype = () => http.Get<Hero.SkinType[]>("/skinType.json");

/**
 * 铭文装备
 */
/** @description 获取装备列表 */
export const Equip = () => http.Get<Equip.Data[]>("/equip.json");

/** @description 获取装备合成列表 */
export const EquipSynthetic = () => http.Get<Equip.Synthetic[]>("/equipSynthetic.json");

/** @description 获取装备类型列表 */
export const Equiptype = () => http.Get<General[]>("/equipType.json");

/** @description 获取装备效果列表 */
export const Equipeffect = () => http.Get<Equip.Effect[]>("/equipEffect.json");

/** @description 获取铭文列表 */
export const Epigraph = () => http.Get<Epigraph.Data[]>("/epigraph.json");

/** @description 获取铭文类型列表 */
export const Epigraphtype = () => http.Get<General[]>("/epigraphType.json");

/** @description 获取铭文效果列表 */
export const Epigrapheffect = () => http.Get<Epigraph.EpigraphEffect[]>("/epigraphEffect.json");

/**
 *  杂项
 */
/** @description 获取职业列表 */
export const Professiontype = () => http.Get<General[]>("/professionType.json");

/** @description 获取定位列表 */
export const Locationtype = () => http.Get<General[]>("/locationType.json");

/** @description 获取特长列表 */
export const Specialtytype = () => http.Get<General[]>("/specialtyType.json");

/** @description 获取时期列表 */
export const Periodtype = () => http.Get<General[]>("/periodType.json");

/** @description 获取阵营列表 */
export const Camptype = () => http.Get<General[]>("/campType.json");

/** @description 获取种族列表 */
export const RaceType = () => http.Get<General[]>("/raceType.json");

/** @description 获取关系列表 */
export const Relationship = () => http.Get<Hero.Relationship[]>("/relationship.json");
