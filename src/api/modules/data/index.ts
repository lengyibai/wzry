import { API_HERO } from "@/api";
import http from "@/api/helper";

/** @description 获取版本信息 */
const Version = () => http.Get<VersionUpdate>("/version.json");

/** @description 获取公告 */
const Notice = () => http.Get<string>("/notice.json");

/** @description 获取计划 */
const Todo = () => http.Get<string>("/todo.json");

/** @description 获取战绩 */
const Team = () => http.Get<string>("/team.json");

/** @description 获取用户列表 */
const User = () => http.Get<User[]>("/user.json");

/** @description 获取英雄基础列表 */
const HeroBasic = () => http.Get<General[]>("/heroBasic.json");

/** @description 获取英雄图片列表 */
const HeroImg = () => http.Get<Hero.HeadImg[]>("/heroImg.json");

/** @description 获取英雄信息列表 */
const Herodata = () => http.Get<Hero.Data[]>("/heroData.json");

/**
 * @description 获取英雄语音列表
 * @param hero_name 英雄名
 */
const Voice = async (hero_name: string) => {
  const pinyin = await API_HERO.getHeroPinyin(hero_name);
  return http.Get<Hero.Voices[]>(`/voices/${pinyin}.json`);
};

/** @description 获取技能列表 */
const Skill = () => http.Get<Hero.Skill[]>("/skill.json");

/** @description 获取技能类型列表 */
const Skilltype = () => http.Get<Hero.SkillType[]>("/skillType.json");

/** @description 获取技能效果列表 */
const Skilleffect = () => http.Get<Hero.SkillEffect[]>("/skillEffect.json");

/** @description 获取皮肤列表 */
const Skin = () => http.Get<Hero.Skin[]>("/skin.json");

/** @description 获取皮肤类型列表 */
const Skintype = () => http.Get<Hero.SkinType[]>("/skinType.json");

/**
 * 铭文装备
 */
/** @description 获取装备列表 */
const Equip = () => http.Get<Equip.Data[]>("/equip.json");

/** @description 获取装备合成列表 */
const EquipSynthetic = () => http.Get<Equip.Synthetic[]>("/equipSynthetic.json");

/** @description 获取装备类型列表 */
const Equiptype = () => http.Get<General[]>("/equipType.json");

/** @description 获取装备效果列表 */
const Equipeffect = () => http.Get<Equip.Effect[]>("/equipEffect.json");

/** @description 获取铭文列表 */
const Epigraph = () => http.Get<Epigraph.Data[]>("/epigraph.json");

/** @description 获取铭文类型列表 */
const Epigraphtype = () => http.Get<General[]>("/epigraphType.json");

/** @description 获取铭文效果列表 */
const Epigrapheffect = () => http.Get<Epigraph.EpigraphEffect[]>("/epigraphEffect.json");

/**
 *  杂项
 */
/** @description 获取职业列表 */
const Professiontype = () => http.Get<General[]>("/professionType.json");

/** @description 获取定位列表 */
const Locationtype = () => http.Get<General[]>("/locationType.json");

/** @description 获取特长列表 */
const Specialtytype = () => http.Get<General[]>("/specialtyType.json");

/** @description 获取时期列表 */
const Periodtype = () => http.Get<General[]>("/periodType.json");

/** @description 获取阵营列表 */
const Camptype = () => http.Get<General[]>("/campType.json");

/** @description 获取种族列表 */
const RaceType = () => http.Get<General[]>("/raceType.json");

/** @description 获取关系列表 */
const Relationship = () => http.Get<Hero.Relationship[]>("/relationship.json");

export default {
  Version,
  Notice,
  Todo,
  Team,
  User,
  HeroBasic,
  HeroImg,
  Herodata,
  Voice,
  Skill,
  Skilltype,
  Skilleffect,
  Skin,
  Skintype,
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
  Relationship,
};
