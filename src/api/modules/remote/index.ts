import { $LocaleHttp, $RemoteHttp } from "@/api/helper";

/** @description 获取版本信息 */
export const Version = () => {
  return $LocaleHttp.Get<VersionUpdate>("/version.json");
};

/** @description 获取计划 */
export const Todo = () => {
  return $LocaleHttp.Get<{ data: string }>("/todo.json");
};

/** @description 获取公告 */
export const Notice = () => {
  return $LocaleHttp.Get<{ data: string }>("/notice.json");
};

/** @description 获取音乐列表 */
export const Music = () => {
  return $LocaleHttp.Get<{ data: Music[] }>("/music.json");
};

/** @description 获取用户列表 */
export const User = () => {
  return $RemoteHttp.Get<Remote.User[]>("/user.json");
};

/** @description 获取战绩 */
export const Team = () => {
  return $RemoteHttp.Get<string[][]>("/team.json");
};

/** @description 获取铭文列表 */
export const Epigraph = () => {
  return $RemoteHttp.Get<number[]>("/epigraph.json");
};

/** @description 获取铭文效果列表 */
export const EpigraphEffect = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Effect[]>("/epigraphEffect.json");
};

/** @description 获取铭文图片列表 */
export const EpigraphImage = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Image[]>("/epigraphImage.json");
};

/** @description 获取铭文名称列表 */
export const EpigraphName = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Name[]>("/epigraphName.json");
};

/** @description 获取铭文类型列表 */
export const EpigraphType = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Type[]>("/epigraphType.json");
};

/** @description 获取装备列表 */
export const Equip = () => {
  return $RemoteHttp.Get<number[]>("/equip.json");
};

/** @description 获取装备列表 */
export const EquipDesc = () => {
  return $RemoteHttp.Get<Remote.Equip.Desc[]>("/equipDesc.json");
};

/** @description 获取装备效果列表 */
export const EquipEffect = () => {
  return $RemoteHttp.Get<Remote.Equip.Effect[]>("/equipEffect.json");
};

/** @description 获取装备图片列表 */
export const EquipImage = () => {
  return $RemoteHttp.Get<Remote.Equip.Image[]>("/equipImage.json");
};

/** @description 获取装备等级列表 */
export const EquipLevel = () => {
  return $RemoteHttp.Get<Remote.Equip.Level[]>("/equipLevel.json");
};

/** @description 获取装备动机列表 */
export const EquipMotivation = () => {
  return $RemoteHttp.Get<Remote.Equip.Motivation[]>("/equipMotivation.json");
};

/** @description 获取装备名称列表 */
export const EquipName = () => {
  return $RemoteHttp.Get<Remote.Equip.Name[]>("/equipName.json");
};

/** @description 获取装备注列表 */
export const EquipNote = () => {
  return $RemoteHttp.Get<Remote.Equip.Note[]>("/equipNote.json");
};

/** @description 获取装备价格列表 */
export const EquipPrice = () => {
  return $RemoteHttp.Get<Remote.Equip.Price[]>("/equipPrice.json");
};

/** @description 获取装备合成列表 */
export const EquipSynthetic = () => {
  return $RemoteHttp.Get<Remote.Equip.Synthetic[]>("/equipSynthetic.json");
};

/** @description 获取装备类型列表 */
export const Equiptype = () => {
  return $RemoteHttp.Get<Remote.Equip.Type[]>("/equipType.json");
};

/** @description 获取英雄列表 */
export const Hero = () => {
  return $RemoteHttp.Get<number[]>("/hero.json");
};

/** @description 获取英雄属性列表 */
export const HeroAttr = () => {
  return $RemoteHttp.Get<Remote.Hero.Attr[]>("/heroAttr.json");
};

/** @description 获取英雄阵营列表 */
export const HeroCamp = () => {
  return $RemoteHttp.Get<Remote.Hero.Camp[]>("/heroCamp.json");
};

/** @description 获取英雄性别列表 */
export const HeroGender = () => {
  return $RemoteHttp.Get<Remote.Hero.Gender[]>("/heroGender.json");
};

/** @description 获取英雄头像列表 */
export const HeroHead = () => {
  return $RemoteHttp.Get<Remote.Hero.Avatar[]>("/heroHead.json");
};

/** @description 获取英雄身高列表 */
export const HeroHeight = () => {
  return $RemoteHttp.Get<Remote.Hero.Height[]>("/heroHeight.json");
};

/** @description 获取英雄身份列表 */
export const HeroIdentity = () => {
  return $RemoteHttp.Get<Remote.Hero.Identity[]>("/heroIdentity.json");
};

/** @description 获取英雄图片列表 */
export const HeroImage = () => {
  return $RemoteHttp.Get<Remote.Hero.Image[]>("/heroImage.json");
};

/** @description 获取英雄定位列表 */
export const HeroLocation = () => {
  return $RemoteHttp.Get<Remote.Hero.Location[]>("/heroLocation.json");
};

/** @description 获取英雄代号列表 */
export const HeroMark = () => {
  return $RemoteHttp.Get<Remote.Hero.Mark[]>("/heroMark.json");
};

/** @description 获取英雄名称列表 */
export const HeroName = () => {
  return $RemoteHttp.Get<Remote.Hero.Name[]>("/heroName.json");
};

/** @description 获取英雄时期列表 */
export const HeroPeriod = () => {
  return $RemoteHttp.Get<Remote.Hero.Period[]>("/heroPeriod.json");
};

/** @description 获取英雄拼音列表 */
export const HeroPinyin = () => {
  return $RemoteHttp.Get<Remote.Hero.Pinyin[]>("/heroPinyin.json");
};

/** @description 获取英雄职业列表 */
export const HeroProfession = () => {
  return $RemoteHttp.Get<Remote.Hero.Profession[]>("/heroProfession.json");
};

/** @description 获取英雄种族列表 */
export const HeroRace = () => {
  return $RemoteHttp.Get<Remote.Hero.Race[]>("/heroRace.json");
};

/** @description 获取英雄关系列表 */
export const HeroRelationship = () => {
  return $RemoteHttp.Get<Remote.Hero.Relationship[]>("/heroRelationship.json");
};

/** @description 获取英雄技能单位列表 */
export const HeroSkillUnit = () => {
  return $RemoteHttp.Get<Remote.Hero.SkillUnit[]>("/heroSkillUnit.json");
};

/** @description 获取英雄皮肤列表 */
export const HeroSkin = () => {
  return $RemoteHttp.Get<Remote.Hero.Skin[]>("/heroSkin.json");
};

/** @description 获取英雄特长列表 */
export const HeroSpecialty = () => {
  return $RemoteHttp.Get<Remote.Hero.Specialty[]>("/heroSpecialty.json");
};

/** @description 获取技能列表 */
export const Skill = () => {
  return $RemoteHttp.Get<Remote.Skill.Data[]>("/heroSkill.json");
};

/** @description 获取皮肤列表 */
export const Skin = () => {
  return $RemoteHttp.Get<number[]>("/skin.json");
};

/** @description 获取皮肤英雄列表 */
export const SkinHero = () => {
  return $RemoteHttp.Get<Remote.Skin.Hero[]>("/skinHero.json");
};

/** @description 获取皮肤图片列表 */
export const SkinImage = () => {
  return $RemoteHttp.Get<Remote.Skin.Image[]>("/skinImage.json");
};

/** @description 获取皮肤名称列表 */
export const SkinName = () => {
  return $RemoteHttp.Get<Remote.Skin.Name[]>("/skinName.json");
};

/** @description 获取皮肤价格列表 */
export const SkinPrice = () => {
  return $RemoteHttp.Get<Remote.Skin.Price[]>("/skinPrice.json");
};

/** @description 获取皮肤类型列表 */
export const SkinType = () => {
  return $RemoteHttp.Get<Remote.Skin.Type[]>("/skinType.json");
};

/** @description 获取类型阵营表 */
export const TypeCamp = () => {
  return $RemoteHttp.Get<Remote.DataType.Camp[]>("/typeCamp.json");
};

/** @description 获取类型铭文表 */
export const TypeEpigraph = () => {
  return $RemoteHttp.Get<Remote.DataType.Epigraph[]>("/typeEpigraph.json");
};

/** @description 获取类型铭文效果表 */
export const TypeEpigraphEffect = () => {
  return $RemoteHttp.Get<Remote.DataType.EpigraphEffect[]>("/typeEpigraphEffect.json");
};

/** @description 获取类型装备表 */
export const TypeEquip = () => {
  return $RemoteHttp.Get<Remote.DataType.Equip[]>("/typeEquip.json");
};

/** @description 获取类型装备效果表 */
export const TypeEquipEffect = () => {
  return $RemoteHttp.Get<Remote.DataType.EquipEffect[]>("/typeEquipEffect.json");
};

/** @description 获取类型定位表 */
export const TypeLocation = () => {
  return $RemoteHttp.Get<Remote.DataType.Location[]>("/typeLocation.json");
};

/** @description 获取类型时期表 */
export const TypePeriod = () => {
  return $RemoteHttp.Get<Remote.DataType.Period[]>("/typePeriod.json");
};

/** @description 获取类型职业表 */
export const TypeProfession = () => {
  return $RemoteHttp.Get<Remote.DataType.Profession[]>("/typeProfession.json");
};

/** @description 获取类型种族表 */
export const TypeRace = () => {
  return $RemoteHttp.Get<Remote.DataType.Race[]>("/typeRace.json");
};

/** @description 获取类型皮肤表 */
export const TypeSkin = () => {
  return $RemoteHttp.Get<Remote.DataType.Skin[]>("/typeSkin.json");
};

/** @description 获取类型技能表 */
export const TypeSkill = () => {
  return $RemoteHttp.Get<Remote.DataType.Skin[]>("/typeSkill.json");
};

/** @description 获取类型特长表 */
export const TypeSpecialty = () => {
  return $RemoteHttp.Get<Remote.DataType.Specialty[]>("/typeSpecialty.json");
};

/** @description 获取英雄语音列表 */
export const Voice = (pinyin: string) => {
  return $RemoteHttp.Get<Remote.Voice.Data[]>(`/voices/${pinyin}.json`);
};
