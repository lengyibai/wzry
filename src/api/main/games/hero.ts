import { get, post } from "@/api/helper/transfer";
import { getHeroSkin } from "@/api/main/games/skin";
import { getSkinVoice } from "@/api/main/games/voice";
import { getHeroRelationship } from "@/api/main/games/relationship";
import { getHeroSkill } from "@/api/main/games/skill";

/** @description: 获取英雄基础列表 */
export const getHeroBasic = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_herobasic" }));
};
/** @description: 添加英雄基础列表 */
export const addHeroBasic = (data: Hero.General) => {
  return Promise.resolve(post<Hero.General>("data_herobasic", data));
};

/** @description: 获取英雄头像列表 */
export const getHeroImg = (id: number) => {
  return Promise.resolve(
    get<Hero.HeadImg>({ name: "data_heroimg", key: "id", value: id })
  );
};
/** @description: 添加英雄头像列表 */
export const addHeroImg = (data: Hero.HeadImg) => {
  return Promise.resolve(post<Hero.HeadImg>("data_heroimg", data));
};

/** @description: 获取英雄信息列表 */
export const getHeroData = () => {
  return Promise.resolve(get<Hero.Data[]>({ name: "data_herodata" }));
};
/** @description: 添加英雄信息列表 */
export const addHeroData = (data: Hero.Data) => {
  return Promise.resolve(post<Hero.Data>("data_herodata", data));
};

/** @description: 获取英雄详情 */
export const getHeroDetail = async (id: number) => {
  const hero = get<Hero.Data>({ name: "data_herodata", key: "id", value: id });
  const skins = await getHeroSkin(id); //获取皮肤列表
  const skills = await getHeroSkill(id); //获取技能列表
  const voices = await getSkinVoice(hero.name, "原皮"); //获取语音列表
  const relationships = await getHeroRelationship(id); //获取关系列表
  if (relationships) {
    for (let i = 0; i < relationships.length; i++) {
      relationships[i].hero = await getHeroImg(
        relationships[i].id as unknown as number
      );
    }
  }

  hero.skins = skins || [];
  hero.skins = skins || [];
  hero.skills = skills || [];
  hero.voices = voices || [];
  hero.relationships = relationships || [];

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

/** @description: 获取技能类型列表 */
export const getSkillType = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_skilltype" }));
};
/** @description: 获取技能效果列表 */
export const getSkillEffect = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_skilleffect" }));
};
/** @description: 获取种族列表 */
export const getRaceType = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_racetype" }));
};
/** @description: 获取阵营列表 */
export const getCampType = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_camptype" }));
};
/** @description: 获取定位列表 */
export const getLocationType = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_locationtype" }));
};
/** @description: 获取时期列表 */
export const getPeriodType = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_periodtype" }));
};
/** @description: 获取职业列表 */
export const getProfessionType = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_professiontype" }));
};
/** @description: 获取特长列表 */
export const getSpecialtyType = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_specialtytype" }));
};
