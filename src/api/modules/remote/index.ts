import { AxiosProgressEvent } from "axios";

import { $LocaleHttp, $RemoteHttp, $ResourceHttp } from "@/api/helper";
import { RESOURCE_NAME } from "@/config/modules/resource-name";

/** @description 获取版本信息 */
export const Version = () => {
  return $LocaleHttp.Get<Global.Version.File>(`/${RESOURCE_NAME.VERSION}.json`);
};

/** @description 获取更新日志 */
export const UpdateLog = () => {
  return $LocaleHttp.Get<Global.Version.UpdateLog>(`/${RESOURCE_NAME.UPDATE_LOG}.json`);
};

/** @description 获取静态资源版本信息 */
export const StaticVersion = () => {
  return $LocaleHttp.Get<Global.Version.Static>(`/${RESOURCE_NAME.STATIC_VERSION}.json`);
};

/** @description 获取计划 */
export const Todo = () => {
  return $LocaleHttp.Get<Global.Todo>(`/${RESOURCE_NAME.TODO}.json`);
};

/** @description 获取公告 */
export const Notice = () => {
  return $LocaleHttp.Get<string>(`/${RESOURCE_NAME.NOTICE}.json`);
};

/** @description 获取音乐列表 */
export const Music = () => {
  return $LocaleHttp.Get<Global.Music[]>(`/${RESOURCE_NAME.MUSIC}.json`);
};

/** @description 获取战绩 */
export const Team = () => {
  return $RemoteHttp.Get<string[][]>(`/${RESOURCE_NAME.TEAM}.json`);
};

/** @description 获取邮箱列表 */
export const Mail = () => {
  return $LocaleHttp.Get<Global.Mail[]>(`/${RESOURCE_NAME.MAIL}.json`);
};

/** @description 获取铭文列表 */
export const Epigraph = () => {
  return $RemoteHttp.Get<number[]>(`/${RESOURCE_NAME.EPIGRAPH}.json`);
};

/** @description 获取铭文颜色 */
export const EpigraphColor = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Color[]>(`/${RESOURCE_NAME.EPIGRAPH_COLOR}.json`);
};

/** @description 获取铭文效果列表 */
export const EpigraphEffect = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Effect[]>(`/${RESOURCE_NAME.EPIGRAPH_EFFECT}.json`);
};

/** @description 获取铭文图片列表 */
export const EpigraphImage = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Image[]>(`/${RESOURCE_NAME.EPIGRAPH_IMAGE}.json`);
};

/** @description 获取铭文名称列表 */
export const EpigraphName = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Name[]>(`/${RESOURCE_NAME.EPIGRAPH_NAME}.json`);
};

/** @description 获取铭文类型列表 */
export const EpigraphType = () => {
  return $RemoteHttp.Get<Remote.Epigraph.Type[]>(`/${RESOURCE_NAME.EPIGRAPH_TYPE}.json`);
};

/** @description 获取装备列表 */
export const Equip = () => {
  return $RemoteHttp.Get<number[]>(`/${RESOURCE_NAME.EQUIP}.json`);
};

/** @description 获取装备列表 */
export const EquipDesc = () => {
  return $RemoteHttp.Get<Remote.Equip.Desc[]>(`/${RESOURCE_NAME.EQUIP_DESC}.json`);
};

/** @description 获取装备效果列表 */
export const EquipEffect = () => {
  return $RemoteHttp.Get<Remote.Equip.Effect[]>(`/${RESOURCE_NAME.EQUIP_EFFECT}.json`);
};

/** @description 获取装备图片列表 */
export const EquipImage = () => {
  return $RemoteHttp.Get<Remote.Equip.Image[]>(`/${RESOURCE_NAME.EQUIP_IMAGE}.json`);
};

/** @description 获取装备等级列表 */
export const EquipLevel = () => {
  return $RemoteHttp.Get<Remote.Equip.Level[]>(`/${RESOURCE_NAME.EQUIP_LEVEL}.json`);
};

/** @description 获取装备动机列表 */
export const EquipMotivation = () => {
  return $RemoteHttp.Get<Remote.Equip.Motivation[]>(`/${RESOURCE_NAME.EQUIP_MOTIVATION}.json`);
};

/** @description 获取装备名称列表 */
export const EquipName = () => {
  return $RemoteHttp.Get<Remote.Equip.Name[]>(`/${RESOURCE_NAME.EQUIP_NAME}.json`);
};

/** @description 获取装备注列表 */
export const EquipNote = () => {
  return $RemoteHttp.Get<Remote.Equip.Note[]>(`/${RESOURCE_NAME.EQUIP_NOTE}.json`);
};

/** @description 获取装备价格列表 */
export const EquipPrice = () => {
  return $RemoteHttp.Get<Remote.Equip.Price[]>(`/${RESOURCE_NAME.EQUIP_PRICE}.json`);
};

/** @description 获取装备合成列表 */
export const EquipSynthetic = () => {
  return $RemoteHttp.Get<Remote.Equip.Synthetic[]>(`/${RESOURCE_NAME.EQUIP_SYNTHETIC}.json`);
};

/** @description 获取装备类型列表 */
export const EquipType = () => {
  return $RemoteHttp.Get<Remote.Equip.Type[]>(`/${RESOURCE_NAME.EQUIP_TYPE}.json`);
};

/** @description 获取英雄列表 */
export const Hero = () => {
  return $RemoteHttp.Get<number[]>(`/${RESOURCE_NAME.HERO}.json`);
};

/** @description 获取英雄价格列表 */
export const HeroPrice = () => {
  return $RemoteHttp.Get<number[]>(`/${RESOURCE_NAME.HERO_PRICE}.json`);
};

/** @description 获取英雄属性列表 */
export const HeroAttr = () => {
  return $RemoteHttp.Get<Remote.Hero.Attr[]>(`/${RESOURCE_NAME.HERO_ATTR}.json`);
};

/** @description 获取英雄阵营列表 */
export const HeroCamp = () => {
  return $RemoteHttp.Get<Remote.Hero.Camp[]>(`/${RESOURCE_NAME.HERO_CAMP}.json`);
};

/** @description 获取英雄性别列表 */
export const HeroGender = () => {
  return $RemoteHttp.Get<Remote.Hero.Gender[]>(`/${RESOURCE_NAME.HERO_GENDER}.json`);
};

/** @description 获取英雄头像列表 */
export const HeroAvatar = () => {
  return $RemoteHttp.Get<Remote.Hero.Avatar[]>(`/${RESOURCE_NAME.HERO_HEAD}.json`);
};

/** @description 获取英雄身高列表 */
export const HeroHeight = () => {
  return $RemoteHttp.Get<Remote.Hero.Height[]>(`/${RESOURCE_NAME.HERO_HEIGHT}.json`);
};

/** @description 获取英雄简述列表 */
export const HeroResume = () => {
  return $RemoteHttp.Get<Remote.Hero.Resume[]>(`/${RESOURCE_NAME.HERO_RESUME}.json`);
};

/** @description 获取英雄身份列表 */
export const HeroIdentity = () => {
  return $RemoteHttp.Get<Remote.Hero.Identity[]>(`/${RESOURCE_NAME.HERO_IDENTITY}.json`);
};

/** @description 获取英雄图片列表 */
export const HeroImage = () => {
  return $RemoteHttp.Get<Remote.Hero.Image[]>(`/${RESOURCE_NAME.HERO_IMAGE}.json`);
};

/** @description 获取英雄定位列表 */
export const HeroLocation = () => {
  return $RemoteHttp.Get<Remote.Hero.Location[]>(`/${RESOURCE_NAME.HERO_LOCATION}.json`);
};

/** @description 获取英雄代号列表 */
export const HeroMark = () => {
  return $RemoteHttp.Get<Remote.Hero.Mark[]>(`/${RESOURCE_NAME.HERO_MARK}.json`);
};

/** @description 获取英雄名称列表 */
export const HeroName = () => {
  return $RemoteHttp.Get<Remote.Hero.Name[]>(`/${RESOURCE_NAME.HERO_NAME}.json`);
};

/** @description 获取英雄时期列表 */
export const HeroPeriod = () => {
  return $RemoteHttp.Get<Remote.Hero.Period[]>(`/${RESOURCE_NAME.HERO_PERIOD}.json`);
};

/** @description 获取英雄拼音列表 */
export const HeroPinyin = () => {
  return $RemoteHttp.Get<Remote.Hero.Pinyin[]>(`/${RESOURCE_NAME.HERO_PINYIN}.json`);
};

/** @description 获取英雄职业列表 */
export const HeroProfession = () => {
  return $RemoteHttp.Get<Remote.Hero.Profession[]>(`/${RESOURCE_NAME.HERO_PROFESSION}.json`);
};

/** @description 获取英雄种族列表 */
export const HeroRace = () => {
  return $RemoteHttp.Get<Remote.Hero.Race[]>(`/${RESOURCE_NAME.HERO_RACE}.json`);
};

/** @description 获取英雄关系列表 */
export const HeroRelationship = () => {
  return $RemoteHttp.Get<Remote.Hero.Relationship[]>(`/${RESOURCE_NAME.HERO_RELATIONSHIP}.json`);
};

/** @description 获取英雄技能单位列表 */
export const HeroSkillUnit = () => {
  return $RemoteHttp.Get<Remote.Hero.SkillUnit[]>(`/${RESOURCE_NAME.HERO_SKILL_UNIT}.json`);
};

/** @description 获取英雄皮肤列表 */
export const HeroSkin = () => {
  return $RemoteHttp.Get<Remote.Hero.Skin[]>(`/${RESOURCE_NAME.HERO_SKIN}.json`);
};

/** @description 获取英雄特长列表 */
export const HeroSpecialty = () => {
  return $RemoteHttp.Get<Remote.Hero.Specialty[]>(`/${RESOURCE_NAME.HERO_SPECIALTY}.json`);
};

/** @description 获取技能列表 */
export const Skill = () => {
  return $RemoteHttp.Get<Remote.Skill.Data[]>(`/${RESOURCE_NAME.SKILL}.json`);
};

/** @description 获取皮肤列表 */
export const Skin = () => {
  return $RemoteHttp.Get<number[]>(`/${RESOURCE_NAME.SKIN}.json`);
};

/** @description 获取皮肤英雄列表 */
export const SkinHero = () => {
  return $RemoteHttp.Get<Remote.Skin.Hero[]>(`/${RESOURCE_NAME.SKIN_HERO}.json`);
};

/** @description 获取皮肤图片列表 */
export const SkinImage = () => {
  return $RemoteHttp.Get<Remote.Skin.Image[]>(`/${RESOURCE_NAME.SKIN_IMAGE}.json`);
};

/** @description 获取皮肤名称列表 */
export const SkinName = () => {
  return $RemoteHttp.Get<Remote.Skin.Name[]>(`/${RESOURCE_NAME.SKIN_NAME}.json`);
};

/** @description 获取皮肤价格列表 */
export const SkinPrice = () => {
  return $RemoteHttp.Get<Remote.Skin.Price[]>(`/${RESOURCE_NAME.SKIN_PRICE}.json`);
};

/** @description 获取皮肤类型列表 */
export const SkinType = () => {
  return $RemoteHttp.Get<Remote.Skin.Type[]>(`/${RESOURCE_NAME.SKIN_TYPE}.json`);
};

/** @description 获取类型阵营表 */
export const TypeCamp = () => {
  return $RemoteHttp.Get<Remote.DataType.Camp[]>(`/${RESOURCE_NAME.TYPE_CAMP}.json`);
};

/** @description 获取类型铭文表 */
export const TypeEpigraph = () => {
  return $RemoteHttp.Get<Remote.DataType.Epigraph[]>(`/${RESOURCE_NAME.TYPE_EPIGRAPH}.json`);
};

/** @description 获取类型铭文效果表 */
export const TypeEpigraphEffect = () => {
  return $RemoteHttp.Get<Remote.DataType.EpigraphEffect[]>(
    `/${RESOURCE_NAME.TYPE_EPIGRAPH_EFFECT}.json`,
  );
};

/** @description 获取类型装备表 */
export const TypeEquip = () => {
  return $RemoteHttp.Get<Remote.DataType.Equip[]>(`/${RESOURCE_NAME.TYPE_EQUIP}.json`);
};

/** @description 获取类型装备效果表 */
export const TypeEquipEffect = () => {
  return $RemoteHttp.Get<Remote.DataType.EquipEffect[]>(`/${RESOURCE_NAME.TYPE_EQUIP_EFFECT}.json`);
};

/** @description 获取类型定位表 */
export const TypeLocation = () => {
  return $RemoteHttp.Get<Remote.DataType.Location[]>(`/${RESOURCE_NAME.TYPE_LOCATION}.json`);
};

/** @description 获取类型时期表 */
export const TypePeriod = () => {
  return $RemoteHttp.Get<Remote.DataType.Period[]>(`/${RESOURCE_NAME.TYPE_PERIOD}.json`);
};

/** @description 获取类型职业表 */
export const TypeProfession = () => {
  return $RemoteHttp.Get<Remote.DataType.Profession[]>(`/${RESOURCE_NAME.TYPE_PROFESSION}.json`);
};

/** @description 获取类型种族表 */
export const TypeRace = () => {
  return $RemoteHttp.Get<Remote.DataType.Race[]>(`/${RESOURCE_NAME.TYPE_RACE}.json`);
};

/** @description 获取类型皮肤表 */
export const TypeSkin = () => {
  return $RemoteHttp.Get<Remote.DataType.Skin[]>(`/${RESOURCE_NAME.TYPE_SKIN}.json`);
};

/** @description 获取类型特长表 */
export const TypeSpecialty = () => {
  return $RemoteHttp.Get<Remote.DataType.Specialty[]>(`/${RESOURCE_NAME.TYPE_SPECIALTY}.json`);
};

/** @description 获取英雄语音列表 */
export const Voice = (pinyin: string) => {
  return $RemoteHttp.Get<Remote.Voice.Data[]>(`/${RESOURCE_NAME.VOICE}/${pinyin}.json`);
};

/** @description 获取相关资源Zip
 * @param onDownloadProgress 下载进度回调
 */
export const ZipResource = (
  url: string,
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => void,
) => {
  return $ResourceHttp.Get<any>(`/${url}`, {
    onDownloadProgress,
  });
};
