import { LOCAL_KEY } from "./local-key";

import { API_DATA } from "@/api";
import type { ResultData } from "@/api/interface";

/** @description 请求、key配置 */
const REQUEST: [string, () => Promise<ResultData<unknown>>, string][] = [
  [LOCAL_KEY.EPIGRAPH, API_DATA.Epigraph, "铭文"],
  [LOCAL_KEY.EPIGRAPH_COLOR, API_DATA.EpigraphColor, "铭文颜色"],
  [LOCAL_KEY.EPIGRAPH_EFFECT, API_DATA.EpigraphEffect, "铭文效果"],
  [LOCAL_KEY.EPIGRAPH_IMAGE, API_DATA.EpigraphImage, "铭文图片"],
  [LOCAL_KEY.EPIGRAPH_NAME, API_DATA.EpigraphName, "铭文名称"],
  [LOCAL_KEY.EPIGRAPH_TYPE, API_DATA.EpigraphType, "铭文类型"],
  [LOCAL_KEY.EQUIP, API_DATA.Equip, "装备"],
  [LOCAL_KEY.EQUIP_DESC, API_DATA.EquipDesc, "装备描述"],
  [LOCAL_KEY.EQUIP_EFFECT, API_DATA.EquipEffect, "装备效果"],
  [LOCAL_KEY.EQUIP_IMAGE, API_DATA.EquipImage, "装备图片"],
  [LOCAL_KEY.EQUIP_LEVEL, API_DATA.EquipLevel, "装备等级"],
  [LOCAL_KEY.EQUIP_MOTIVATION, API_DATA.EquipMotivation, "装备动机"],
  [LOCAL_KEY.EQUIP_NAME, API_DATA.EquipName, "装备名称"],
  [LOCAL_KEY.EQUIP_NOTE, API_DATA.EquipNote, "装备备注"],
  [LOCAL_KEY.EQUIP_PRICE, API_DATA.EquipPrice, "装备价格"],
  [LOCAL_KEY.EQUIP_SYNTHETIC, API_DATA.EquipSynthetic, "装备合成"],
  [LOCAL_KEY.EQUIP_TYPE, API_DATA.EquipType, "装备类型"],
  [LOCAL_KEY.HERO, API_DATA.Hero, "英雄"],
  [LOCAL_KEY.HERO_ATTR, API_DATA.HeroAttr, "英雄属性"],
  [LOCAL_KEY.HERO_CAMP, API_DATA.HeroCamp, "英雄阵营"],
  [LOCAL_KEY.HERO_GENDER, API_DATA.HeroGender, "英雄性别"],
  [LOCAL_KEY.HERO_AVATAR, API_DATA.HeroAvatar, "英雄头像"],
  [LOCAL_KEY.HERO_HEIGHT, API_DATA.HeroHeight, "英雄身高"],
  [LOCAL_KEY.HERO_RESUME, API_DATA.HeroResume, "英雄简述"],
  [LOCAL_KEY.HERO_IDENTITY, API_DATA.HeroIdentity, "英雄身份"],
  [LOCAL_KEY.HERO_IMAGE, API_DATA.HeroImage, "英雄图片"],
  [LOCAL_KEY.HERO_LOCATION, API_DATA.HeroLocation, "英雄定位"],
  [LOCAL_KEY.HERO_MARK, API_DATA.HeroMark, "英雄代号"],
  [LOCAL_KEY.HERO_NAME, API_DATA.HeroName, "英雄名称"],
  [LOCAL_KEY.HERO_PERIOD, API_DATA.HeroPeriod, "英雄时期"],
  [LOCAL_KEY.HERO_PINYIN, API_DATA.HeroPinyin, "英雄拼音"],
  [LOCAL_KEY.HERO_PROFESSION, API_DATA.HeroProfession, "英雄职业"],
  [LOCAL_KEY.HERO_RACE, API_DATA.HeroRace, "英雄种族"],
  [LOCAL_KEY.HERO_RELATIONSHIP, API_DATA.HeroRelationship, "英雄关系"],
  [LOCAL_KEY.HERO_SKILL_UNIT, API_DATA.HeroSkillUnit, "英雄技能单位"],
  [LOCAL_KEY.HERO_SKIN, API_DATA.HeroSkin, "英雄皮肤"],
  [LOCAL_KEY.HERO_SPECIALTY, API_DATA.HeroSpecialty, "英雄特长"],
  [LOCAL_KEY.HERO_SKILL, API_DATA.Skill, "英雄技能"],
  [LOCAL_KEY.SKIN, API_DATA.Skin, "皮肤"],
  [LOCAL_KEY.SKIN_HERO, API_DATA.SkinHero, "皮肤英雄"],
  [LOCAL_KEY.SKIN_IMAGE, API_DATA.SkinImage, "皮肤图片"],
  [LOCAL_KEY.SKIN_NAME, API_DATA.SkinName, "皮肤名称"],
  [LOCAL_KEY.SKIN_PRICE, API_DATA.SkinPrice, "皮肤价格"],
  [LOCAL_KEY.SKIN_TYPE, API_DATA.SkinType, "皮肤类型"],
  [LOCAL_KEY.TYPE_CAMP, API_DATA.TypeCamp, "类型阵营"],
  [LOCAL_KEY.TYPE_EPIGRAPH, API_DATA.TypeEpigraph, "类型铭文"],
  [LOCAL_KEY.TYPE_EPIGRAPH_EFFECT, API_DATA.TypeEpigraphEffect, "类型铭文效果"],
  [LOCAL_KEY.TYPE_EQUIP, API_DATA.TypeEquip, "类型装备"],
  [LOCAL_KEY.TYPE_EQUIP_EFFECT, API_DATA.TypeEquipEffect, "类型装备效果"],
  [LOCAL_KEY.TYPE_LOCATION, API_DATA.TypeLocation, "类型定位"],
  [LOCAL_KEY.TYPE_PERIOD, API_DATA.TypePeriod, "类型时期"],
  [LOCAL_KEY.TYPE_PROFESSION, API_DATA.TypeProfession, "类型职业"],
  [LOCAL_KEY.TYPE_RACE, API_DATA.TypeRace, "类型种族"],
  [LOCAL_KEY.TYPE_SKIN, API_DATA.TypeSkin, "类型皮肤"],
  [LOCAL_KEY.TYPE_SPECIALTY, API_DATA.TypeSpecialty, "类型特长"],
];

export { REQUEST };
