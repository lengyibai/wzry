import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取英雄列表 */
export const getHeroList = () => {
  return get<number[]>({ name: LOCAL_KEY.HERO });
};

/** @description 获取英雄属性列表 */
export const getHeroAttrList = () => {
  return get<Remote.Hero.Attr[]>({ name: LOCAL_KEY.HERO_ATTR });
};

/** @description 获取英雄阵营列表 */
export const getHeroCampList = () => {
  return get<Remote.Hero.Camp[]>({ name: LOCAL_KEY.HERO_CAMP });
};

/** @description 获取英雄性别列表 */
export const getHeroGenderList = () => {
  return get<Remote.Hero.Gender[]>({ name: LOCAL_KEY.HERO_GENDER });
};

/** @description 获取英雄头像列表 */
export const getHeroAvatarList = () => {
  return get<Remote.Hero.Avatar[]>({ name: LOCAL_KEY.HERO_AVATAR });
};

/** @description 获取英雄身高列表 */
export const getHeroHeightList = () => {
  return get<Remote.Hero.Height[]>({ name: LOCAL_KEY.HERO_HEIGHT });
};

/** @description 获取英雄简述列表 */
export const getHeroResumeList = () => {
  return get<Remote.Hero.Resume[]>({ name: LOCAL_KEY.HERO_RESUME });
};

/** @description 获取英雄身份列表 */
export const getHeroIdentityList = () => {
  return get<Remote.Hero.Identity[]>({ name: LOCAL_KEY.HERO_IDENTITY });
};

/** @description 获取英雄图片列表 */
export const getHeroImageList = () => {
  return get<Remote.Hero.Image[]>({ name: LOCAL_KEY.HERO_IMAGE });
};

/** @description 获取英雄定位列表 */
export const getHeroLocationList = () => {
  return get<Remote.Hero.Location[]>({ name: LOCAL_KEY.HERO_LOCATION });
};

/** @description 获取英雄代号列表 */
export const getHeroMarkList = () => {
  return get<Remote.Hero.Mark[]>({ name: LOCAL_KEY.HERO_MARK });
};

/** @description 获取英雄名称列表 */
export const getHeroNameList = () => {
  return get<Remote.Hero.Name[]>({ name: LOCAL_KEY.HERO_NAME });
};

/** @description 获取英雄时期列表 */
export const getHeroPeriodList = () => {
  return get<Remote.Hero.Period[]>({ name: LOCAL_KEY.HERO_PERIOD });
};

/** @description 获取英雄拼音列表 */
export const getHeroPinyinList = () => {
  return get<Remote.Hero.Pinyin[]>({ name: LOCAL_KEY.HERO_PINYIN });
};

/** @description 获取英雄职业列表 */
export const getHeroProfessionList = () => {
  return get<Remote.Hero.Profession[]>({ name: LOCAL_KEY.HERO_PROFESSION });
};

/** @description 获取英雄种族列表 */
export const getHeroRaceList = () => {
  return get<Remote.Hero.Race[]>({ name: LOCAL_KEY.HERO_RACE });
};

/** @description 获取英雄关系列表 */
export const getHeroRelationshipList = () => {
  return get<Remote.Hero.Relationship[]>({ name: LOCAL_KEY.HERO_RELATIONSHIP });
};

/** @description 获取英雄技能单位列表 */
export const getHeroSkillUnitList = () => {
  return get<Remote.Hero.SkillUnit[]>({ name: LOCAL_KEY.HERO_SKILL_UNIT });
};

/** @description 获取英雄皮肤列表 */
export const getHeroSkinList = () => {
  return get<Remote.Hero.Skin[]>({ name: LOCAL_KEY.HERO_SKIN });
};

/** @description 获取英雄特长列表 */
export const getHeroSpecialtyList = () => {
  return get<Remote.Hero.Specialty[]>({ name: LOCAL_KEY.HERO_SPECIALTY });
};

/** @description 获取技能列表 */
export const getSkillList = () => {
  return get<Remote.Skill.Data[]>({ name: LOCAL_KEY.HERO_SKILL });
};

/** @description 获取皮肤列表 */
export const getSkinList = () => {
  return get<number[]>({ name: LOCAL_KEY.SKIN });
};

/** @description 获取皮肤所属英雄列表 */
export const getSkinHeroList = () => {
  return get<Remote.Skin.Hero[]>({ name: LOCAL_KEY.SKIN_HERO });
};

/** @description 获取皮肤图片列表 */
export const getSkinImageList = () => {
  return get<Remote.Skin.Image[]>({ name: LOCAL_KEY.SKIN_IMAGE });
};

/** @description 获取皮肤名称列表 */
export const getSkinNameList = () => {
  return get<Remote.Skin.Name[]>({ name: LOCAL_KEY.SKIN_NAME });
};

/** @description 获取皮肤价格列表 */
export const getSkinPriceList = () => {
  return get<Remote.Skin.Price[]>({ name: LOCAL_KEY.SKIN_PRICE });
};

/** @description 获取皮肤类型列表 */
export const getSkinTypeList = () => {
  return get<Remote.Skin.Type[]>({ name: LOCAL_KEY.SKIN_TYPE });
};

/** @description 获取指定英雄语音列表 */
export const getVoiceList = (pinyin: string) => {
  return get<Remote.Voice.Data[]>({ name: `${LOCAL_KEY.VOICE}${pinyin}` });
};
