import { get, post } from "@/api/helper/transfer";
import { API_SKILL, API_SKIN, API_VOICE, API_RELATIONSHIP } from "@/api";
import { CONFIG } from "@/config";

/** @description 获取英雄基础列表 */
export const getHeroBasic = () => Promise.resolve(get<Hero.Basic[]>({ name: CONFIG.LOCAL_KEY.HERO_BASIC }));

/** @description 获取某英雄拼音 */
export const getHeroPinyin = (hero_name: string) =>
  Promise.resolve(
    get<Hero.Basic>({ name: CONFIG.LOCAL_KEY.HERO_BASIC, key: "name", value: hero_name, full: true }, true).pinyin,
  );

/** @description 添加英雄基础列表 */
export const addHeroBasic = (data: General) => Promise.resolve(post<General>(CONFIG.LOCAL_KEY.HERO_BASIC, data));

/**
 * @description 获取英雄头像列表
 * @param hero_id 英雄id
 */
export const getHeroImg = (hero_id: number) =>
  Promise.resolve(get<Hero.HeadImg>({ name: CONFIG.LOCAL_KEY.HERO_IMG, key: "id", value: hero_id }));

/** @description 添加英雄头像列表 */
export const addHeroImg = (data: Hero.HeadImg) => Promise.resolve(post<Hero.HeadImg>(CONFIG.LOCAL_KEY.HERO_IMG, data));

/** @description 获取英雄信息列表 */
export const getHeroData = () => Promise.resolve(get<Hero.Data[]>({ name: CONFIG.LOCAL_KEY.HERO_DATA }));

/** @description 添加英雄信息列表 */
export const addHeroData = (data: Hero.Data) => Promise.resolve(post<Hero.Data>(CONFIG.LOCAL_KEY.HERO_DATA, data));

/**
 * @description 获取英雄详情
 * @param hero_id 英雄id
 */
export const getHeroDetail = async (hero_id: number) => {
  const hero = get<Hero.Data>({ name: CONFIG.LOCAL_KEY.HERO_DATA, key: "id", value: hero_id });
  /** 获取皮肤列表 */
  const skins = await API_SKIN.getHeroSkin(hero_id);
  /** 获取技能列表 */
  const skills = await API_SKILL.getHeroSkill(hero_id);
  /** 获取语音列表 */
  const voices = await API_VOICE.getSkinVoice(hero.name, "原皮");
  /** 获取关系列表 */
  const relationships = await API_RELATIONSHIP.getHeroRelationship(hero_id);

  //如果存在关系，则请求相关人物的头像
  if (relationships) {
    for (let i = 0; i < relationships.length; i++) {
      relationships[i].hero = await getHeroImg(relationships[i].id as unknown as number);
    }
  }

  hero.skins = skins || [];
  hero.skins = skins || [];
  hero.skills = skills || [];
  hero.voices = voices || [];
  hero.relationships = relationships || [];

  //皮肤列表第一个为原皮肤
  hero.skins.unshift({
    id: 0,
    hero: hero.id,
    num: 0,
    price: "",
    type: 0,
    name: "原版皮肤",
    heroName: "",
    poster: hero.poster,
    headImg: hero.headImg,
    cover: "",
    profession: [],
    gender: "",
  });

  return Promise.resolve(hero);
};

/** @description 获取技能类型列表 */
export const getSkillType = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.SKILL_TYPE }));

/** @description 获取技能效果列表 */
export const getSkillEffect = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.SKILL_EFFECT }));

/** @description 获取种族列表 */
export const getRaceType = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.RACE_TYPE }));

/** @description 获取阵营列表 */
export const getCampType = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.CAMP_TYPE }));

/** @description 获取定位列表 */
export const getLocationType = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.LOCATION_TYPE }));

/** @description 获取时期列表 */
export const getPeriodType = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.PERIOD_TYPE }));

/** @description 获取职业列表 */
export const getProfessionType = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.PROFESSION_TYPE }));

/** @description 获取特长列表 */
export const getSpecialtyType = () => Promise.resolve(get<General[]>({ name: CONFIG.LOCAL_KEY.SPECIALTY_TYPE }));
