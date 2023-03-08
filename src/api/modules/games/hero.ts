import { get, post } from "@/api/helper/transfer";
import { getHeroSkin } from "@/api/modules/games/skin";
import { getSkinVoice } from "@/api/modules/games/voice";
import { getHeroRelationship } from "@/api/modules/games/relationship";
import { getHeroSkill } from "@/api/modules/games/skill";

/** @description 获取英雄基础列表 */
export const getHeroBasic = () => Promise.resolve(get<Hero.Basic[]>({ name: "data_herobasic" }));

/** @description 获取某英雄拼音 */
export const getHeroPinyin = (hero_name: string) =>
  Promise.resolve(get<Hero.Basic>({ name: "data_herobasic", key: "name", value: hero_name, full: true }, true).pinyin);

/** @description 添加英雄基础列表 */
export const addHeroBasic = (data: General) => Promise.resolve(post<General>("data_herobasic", data));

/**
 * @description 获取英雄头像列表
 * @param hero_id 英雄id
 */
export const getHeroImg = (hero_id: number) =>
  Promise.resolve(get<Hero.HeadImg>({ name: "data_heroimg", key: "id", value: hero_id }));

/** @description 添加英雄头像列表 */
export const addHeroImg = (data: Hero.HeadImg) => Promise.resolve(post<Hero.HeadImg>("data_heroimg", data));

/** @description 获取英雄信息列表 */
export const getHeroData = () => Promise.resolve(get<Hero.Data[]>({ name: "data_herodata" }));

/** @description 添加英雄信息列表 */
export const addHeroData = (data: Hero.Data) => Promise.resolve(post<Hero.Data>("data_herodata", data));

/**
 * @description 获取英雄详情
 * @param hero_id 英雄id
 */
export const getHeroDetail = async (hero_id: number) => {
  const hero = get<Hero.Data>({ name: "data_herodata", key: "id", value: hero_id });
  const skins = await getHeroSkin(hero_id); //获取皮肤列表
  const skills = await getHeroSkill(hero_id); //获取技能列表
  const voices = await getSkinVoice(hero.name, "原皮"); //获取语音列表
  const relationships = await getHeroRelationship(hero_id); //获取关系列表

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
export const getSkillType = () => Promise.resolve(get<General[]>({ name: "data_skilltype" }));

/** @description 获取技能效果列表 */
export const getSkillEffect = () => Promise.resolve(get<General[]>({ name: "data_skilleffect" }));

/** @description 获取种族列表 */
export const getRaceType = () => Promise.resolve(get<General[]>({ name: "data_racetype" }));

/** @description 获取阵营列表 */
export const getCampType = () => Promise.resolve(get<General[]>({ name: "data_camptype" }));

/** @description 获取定位列表 */
export const getLocationType = () => Promise.resolve(get<General[]>({ name: "data_locationtype" }));

/** @description 获取时期列表 */
export const getPeriodType = () => Promise.resolve(get<General[]>({ name: "data_periodtype" }));

/** @description 获取职业列表 */
export const getProfessionType = () => Promise.resolve(get<General[]>({ name: "data_professiontype" }));

/** @description 获取特长列表 */
export const getSpecialtyType = () => Promise.resolve(get<General[]>({ name: "data_specialtytype" }));
