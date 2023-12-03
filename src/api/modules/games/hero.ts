import { get, post } from "@/api/helper/transfer";
import { API_SKILL, API_SKIN, API_VOICE, API_RELATIONSHIP } from "@/api";
import { CONFIG } from "@/config";

/** @description 获取英雄基础列表 */
export const getHeroBasic = () => {
  const hero_basic_list = get<Hero.Basic[]>({
    name: CONFIG.LOCAL_KEY.HERO_BASIC,
  });
  return Promise.resolve(hero_basic_list);
};

/** @description 获取某英雄拼音 */
export const getHeroPinyin = (hero_name: string) => {
  const params = {
    name: CONFIG.LOCAL_KEY.HERO_BASIC,
    key: "name",
    value: hero_name,
    full: true,
  };
  const pinyin = get<Hero.Basic>(params, true).pinyin;
  return Promise.resolve(pinyin);
};

/** @description 添加英雄基础信息 */
export const addHeroBasic = (data: General) => {
  const hero_basic = post<General>(CONFIG.LOCAL_KEY.HERO_BASIC, data);
  return Promise.resolve(hero_basic);
};

/** @description 获取英雄头像列表 */
export const getHeroImg = (hero_id: number) => {
  const params = { name: CONFIG.LOCAL_KEY.HERO_IMG, key: "id", value: hero_id };
  const hero_head_img_list = get<Hero.HeadImg>(params);
  return Promise.resolve(hero_head_img_list);
};

/** @description 添加英雄头像列表 */
export const addHeroImg = (data: Hero.HeadImg) => {
  const hero_head_img = post<Hero.HeadImg>(CONFIG.LOCAL_KEY.HERO_IMG, data);
  return Promise.resolve(hero_head_img);
};

/** @description 获取英雄信息列表 */
export const getHeroData = () => {
  const hero_data_list = get<Hero.Data[]>({ name: CONFIG.LOCAL_KEY.HERO_DATA });
  return Promise.resolve(hero_data_list);
};

/** @description 添加英雄信息列表 */
export const addHeroData = (data: Hero.Data) => {
  const hero_data = post<Hero.Data>(CONFIG.LOCAL_KEY.HERO_DATA, data);
  return Promise.resolve(hero_data);
};

/** @description 获取英雄图集列表 */
export const getHeroAtlas = () => {
  const hero_atlas_list = get<Hero.Atlas[]>({
    name: CONFIG.LOCAL_KEY.HERO_ATLAS,
  });
  return Promise.resolve(hero_atlas_list);
};

/**
 * @description 获取英雄详情
 * @param hero_id 英雄id
 */
export const getHeroDetail = async (hero_id: number) => {
  const params = {
    name: CONFIG.LOCAL_KEY.HERO_DATA,
    key: "id",
    value: hero_id,
  };
  const hero = get<Hero.Data>(params);

  /** 获取英雄基础信息列表 */
  const heros = await getHeroBasic();
  /** 获取皮肤列表 */
  const skins = await API_SKIN.getHeroSkins(hero_id);
  /** 获取技能列表 */
  const skills = await API_SKILL.getHeroSkill(hero_id);
  /** 获取语音列表 */
  const voices = await API_VOICE.getSkinVoice(hero.name, "原皮");
  /** 获取关系列表 */
  const relationships = await API_RELATIONSHIP.getHeroRelationship(hero_id);

  //如果存在关系，则请求相关人物的头像
  if (relationships?.length) {
    for (let i = 0; i < relationships.length; i++) {
      const hero_img = await getHeroImg(relationships[i].id);
      relationships[i].headImage = hero_img.headImg;
    }
  }

  hero.skins = skins;
  hero.skills = skills;
  hero.voices = voices;
  hero.relationships = relationships.map((item) => {
    return {
      ...item,
      heroName: heros.find((hero) => hero.id === item.id)!.name,
    };
  });

  const {
    cover,
    gender,
    headImg,
    id,
    name: heroName,
    poster,
    posterBig,
    posterBlur,
    profession,
  } = hero;
  //皮肤列表第一个为原皮肤
  hero.skins.unshift({
    id: 0,
    category: "",
    cover,
    gender,
    headImg,
    hero: id,
    heroName,
    name: "原版皮肤",
    num: 0,
    poster,
    posterBig,
    posterBlur,
    price: "",
    profession,
    type: 0,
  });

  return Promise.resolve(hero);
};

/** @description 获取技能类型列表 */
export const getSkillType = () => {
  const skill_type_list = get<General[]>({ name: CONFIG.LOCAL_KEY.SKILL_TYPE });
  return Promise.resolve(skill_type_list);
};

/** @description 获取技能效果列表 */
export const getSkillEffect = () => {
  const skill_effect_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.SKILL_EFFECT,
  });
  return Promise.resolve(skill_effect_list);
};

/** @description 获取种族列表 */
export const getRaceType = () => {
  const race_type_list = get<General[]>({ name: CONFIG.LOCAL_KEY.RACE_TYPE });
  return Promise.resolve(race_type_list);
};

/** @description 获取阵营列表 */
export const getCampType = () => {
  const camp_type_list = get<General[]>({ name: CONFIG.LOCAL_KEY.CAMP_TYPE });
  return Promise.resolve(camp_type_list);
};

/** @description 获取定位列表 */
export const getLocationType = () => {
  const location_type_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.LOCATION_TYPE,
  });
  return Promise.resolve(location_type_list);
};

/** @description 获取时期列表 */
export const getPeriodType = () => {
  const period_type_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.PERIOD_TYPE,
  });
  return Promise.resolve(period_type_list);
};

/** @description 获取职业列表 */
export const getProfessionType = () => {
  const profession_type_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.PROFESSION_TYPE,
  });
  return Promise.resolve(profession_type_list);
};

/** @description 获取特长列表 */
export const getSpecialtyType = () => {
  const specialty_type_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.SPECIALTY_TYPE,
  });
  return Promise.resolve(specialty_type_list);
};
