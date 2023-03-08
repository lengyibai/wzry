import { get, post } from "@/api/helper/transfer";

/** @description 获取皮肤列表 */
export const getSkin = () => Promise.resolve(get<Hero.Skin[]>({ name: "data_skin" }));

/**
 * @description 添加皮肤列表
 * @param data 皮肤列表
 */
export const addSkin = (data: Hero.Skin) => Promise.resolve(post<Hero.Skin>("data_skin", data));

/**
 * @description 获取指定英雄皮肤
 * @param hero_id 英雄id
 */
export const getHeroSkin = (hero_id: number) =>
  Promise.resolve(get<Hero.Skin>({ name: "data_skin", key: "hero", value: hero_id }, false));

/** @description 获取皮肤类型列表 */
export const getSkinType = () => Promise.resolve(get<Hero.SkinType[]>({ name: "data_skintype" }));

/**
 * @description 获取指定皮肤类型
 * @param skin_id 皮肤id
 */
export const getAssignSkinType = (skin_id: number) =>
  Promise.resolve(get<Hero.SkinType>({ name: "data_skintype", key: "id", value: skin_id }));
