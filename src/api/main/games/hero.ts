import { get } from "@/api/helper/transfer";
import { getHeroSkin } from "@/api/main/games/skin";

/**
 * @description: GET请求
 */

/** @description: 获取英雄基础列表 */
export const getHeroBasic = () => {
  return Promise.resolve(get<Hero.General[]>({ name: "data_herobasic" }));
};

/** @description: 获取英雄信息列表 */
export const getHeroData = () => {
  return Promise.resolve(get<Hero.Data[]>({ name: "data_herodata" }));
};

/** @description: 获取英雄详情 */
export const getHeroDetail = async (id: number) => {
  const hero = get<Hero.Data>({ name: "data_herodata", key: "id", value: id });
  const skins = await getHeroSkin(id); //获取皮肤列表
  hero.skins = skins;
  return Promise.resolve(hero);
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
