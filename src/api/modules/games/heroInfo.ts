import {
  API_VOICE_INFO,
  API_HERO,
  API_SKIN_INFO,
  API_SKILL_INFO,
  API_RELATIONSHIP_INFO,
} from "@/api";

/** @description 获取指定英雄头像  */
export const getHeroHead = async (hero_id: number) => {
  const hero_head_list = await API_HERO.getHeroHead();
  const hero_head = hero_head_list.find((item) => item.id === hero_id)!.name;
  return Promise.resolve(hero_head);
};

/** @description 获取指定英雄图片  */
export const getHeroImage = async (hero_id: number) => {
  const hero_img_list = await API_HERO.getHeroImage();
  const hero_img = hero_img_list.find((item) => item.id === hero_id);
  return Promise.resolve(hero_img);
};

/** @description 获取指定英雄名称  */
export const getHeroName = async (hero_id: number) => {
  const hero_name_list = await API_HERO.getHeroName();
  const hero_name = hero_name_list.find((item) => item.id === hero_id)!.name;
  return Promise.resolve(hero_name);
};

/** @description 获取指定英雄拼音 */
export const getHeroPinyin = async (hero_id: number) => {
  const hero_pinyin_list = await API_HERO.getHeroPinyin();
  const hero_pinyin = hero_pinyin_list.find((item) => item.id === hero_id)!.name;
  return Promise.resolve(hero_pinyin);
};

/** @description 获取指定英雄性别  */
export const getHeroGender = async (hero_id: number) => {
  const hero_gender_list = await API_HERO.getHeroGender();
  const hero_gender = hero_gender_list.find((item) => item.id === hero_id)!.name;
  return Promise.resolve(hero_gender);
};

/** @description 获取指定英雄职业  */
export const getHeroProfession = async (hero_id: number) => {
  const hero_profession_list = await API_HERO.getHeroProfession();
  const hero_profession = hero_profession_list.find((item) => item.id === hero_id)!.name;
  return Promise.resolve(hero_profession);
};

/** @description 获取英雄详情 */
export const getHeroDetail = async (hero_id: number) => {
  /** 获取英雄基础信息列表 */
  const heros = await API_HERO.getHeroData();
  const hero = heros.find((item) => item.id === hero_id)!;

  /** 获取皮肤列表 */
  const skins = await API_SKIN_INFO.getHeroSkins(hero_id);
  /** 获取技能列表 */
  const skills = await API_SKILL_INFO.getHeroSkill(hero_id);
  /** 获取语音列表 */
  const voices = await API_VOICE_INFO.getSkinVoice(hero_id, "原皮");
  /** 获取关系列表 */
  const relationships = await API_RELATIONSHIP_INFO.getHeroRelationship(hero_id);

  //创建id作为键的初始数据
  const base_data: Record<number, string> = {};
  heros.forEach((hero) => {
    base_data[hero.id] = "";
  });

  //获取英雄头像
  const hero_heads = await API_HERO.getHeroHead();
  hero_heads.forEach((item) => {
    base_data[item.id] = item.name;
  });

  //如果存在关系，则请求相关人物的头像
  if (relationships?.length) {
    relationships.forEach((item) => {
      item.headImage = base_data[item.id];
    });
  }

  const hero_detail: Hero.Detail = {
    ...hero,
    voices,
    skins,
    skills,
    relationships: relationships.map((item) => {
      return {
        ...item,
        heroName: heros.find((hero) => hero.id === item.id)!.name,
      };
    }),
  };

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
  hero_detail.skins.unshift({
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

  return Promise.resolve(hero_detail);
};
