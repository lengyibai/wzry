import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取英雄列表 */
export const getHeroList = async () => {
  return await get<number[]>(LOCAL_KEY.HERO);
};

/** @description 获取英雄价格列表 */
export const getHeroPriceList = async () => {
  return await get<Remote.Hero.Price[]>(LOCAL_KEY.HERO_PRICE);
};

/** @description 获取英雄属性列表 */
export const getHeroAttrList = async () => {
  return await get<Remote.Hero.Attr[]>(LOCAL_KEY.HERO_ATTR);
};

/** @description 获取英雄阵营列表 */
export const getHeroCampList = async () => {
  return await get<Remote.Hero.Camp[]>(LOCAL_KEY.HERO_CAMP);
};

/** @description 获取英雄性别列表 */
export const getHeroGenderList = async () => {
  return await get<Remote.Hero.Gender[]>(LOCAL_KEY.HERO_GENDER);
};

/** @description 获取英雄头像列表 */
export const getHeroAvatarList = async () => {
  return await get<Remote.Hero.Avatar[]>(LOCAL_KEY.HERO_AVATAR);
};

/** @description 获取英雄身高列表 */
export const getHeroHeightList = async () => {
  return await get<Remote.Hero.Height[]>(LOCAL_KEY.HERO_HEIGHT);
};

/** @description 获取英雄简述列表 */
export const getHeroResumeList = async () => {
  return await get<Remote.Hero.Resume[]>(LOCAL_KEY.HERO_RESUME);
};

/** @description 获取英雄身份列表 */
export const getHeroIdentityList = async () => {
  return await get<Remote.Hero.Identity[]>(LOCAL_KEY.HERO_IDENTITY);
};

/** @description 获取英雄图片列表 */
export const getHeroImageList = async () => {
  return await get<Remote.Hero.Image[]>(LOCAL_KEY.HERO_IMAGE);
};

/** @description 获取英雄定位列表 */
export const getHeroLocationList = async () => {
  return await get<Remote.Hero.Location[]>(LOCAL_KEY.HERO_LOCATION);
};

/** @description 获取英雄代号列表 */
export const getHeroMarkList = async () => {
  return await get<Remote.Hero.Mark[]>(LOCAL_KEY.HERO_MARK);
};

/** @description 获取英雄名称列表 */
export const getHeroNameList = async () => {
  return await get<Remote.Hero.Name[]>(LOCAL_KEY.HERO_NAME);
};

/** @description 获取英雄时期列表 */
export const getHeroPeriodList = async () => {
  return await get<Remote.Hero.Period[]>(LOCAL_KEY.HERO_PERIOD);
};

/** @description 获取英雄拼音列表 */
export const getHeroPinyinList = async () => {
  return await get<Remote.Hero.Pinyin[]>(LOCAL_KEY.HERO_PINYIN);
};

/** @description 获取英雄职业列表 */
export const getHeroProfessionList = async () => {
  return await get<Remote.Hero.Profession[]>(LOCAL_KEY.HERO_PROFESSION);
};

/** @description 获取英雄种族列表 */
export const getHeroRaceList = async () => {
  return await get<Remote.Hero.Race[]>(LOCAL_KEY.HERO_RACE);
};

/** @description 获取英雄关系列表 */
export const getHeroRelationshipList = async () => {
  return await get<Remote.Hero.Relationship[]>(LOCAL_KEY.HERO_RELATIONSHIP);
};

/** @description 获取英雄技能单位列表 */
export const getHeroSkillUnitList = async () => {
  return await get<Remote.Hero.SkillUnit[]>(LOCAL_KEY.HERO_SKILL_UNIT);
};

/** @description 获取英雄皮肤列表 */
export const getHeroSkinList = async () => {
  return await get<Remote.Hero.Skin[]>(LOCAL_KEY.HERO_SKIN);
};

/** @description 获取英雄特长列表 */
export const getHeroSpecialtyList = async () => {
  return await get<Remote.Hero.Specialty[]>(LOCAL_KEY.HERO_SPECIALTY);
};

/** @description 获取技能列表 */
export const getSkillList = async () => {
  return await get<Remote.Skill.Data[]>(LOCAL_KEY.HERO_SKILL);
};

/** @description 获取皮肤列表 */
export const getSkinList = async () => {
  return await get<number[]>(LOCAL_KEY.SKIN);
};

/** @description 获取皮肤所属英雄列表 */
export const getSkinHeroList = async () => {
  return await get<Remote.Skin.Hero[]>(LOCAL_KEY.SKIN_HERO);
};

/** @description 获取皮肤图片列表 */
export const getSkinImageList = async () => {
  return await get<Remote.Skin.Image[]>(LOCAL_KEY.SKIN_IMAGE);
};

/** @description 获取皮肤名称列表 */
export const getSkinNameList = async () => {
  return await get<Remote.Skin.Name[]>(LOCAL_KEY.SKIN_NAME);
};

/** @description 获取皮肤价格列表 */
export const getSkinPriceList = async () => {
  return await get<Remote.Skin.Price[]>(LOCAL_KEY.SKIN_PRICE);
};

/** @description 获取皮肤类型列表 */
export const getSkinTypeList = async () => {
  return await get<Remote.Skin.Type[]>(LOCAL_KEY.SKIN_TYPE);
};

/** @description 获取指定英雄语音列表
 * @param heroName 英雄名称
 */
export const getVoiceList = async (heroName: string) => {
  return await get<Remote.Voice.Data[]>(heroName, "VOICE");
};
