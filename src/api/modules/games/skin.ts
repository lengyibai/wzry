import { get, post } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取皮肤列表 */
export const getSkin = () => Promise.resolve(get<Hero.Skin[]>({ name: CONFIG.LOCAL_KEY.SKIN }));

/**
 * @description 添加皮肤列表
 * @param data 皮肤列表
 */
export const addSkin = (data: Hero.Skin) => Promise.resolve(post<Hero.Skin>(CONFIG.LOCAL_KEY.SKIN, data));

/**
 * @description 获取指定英雄皮肤
 * @param hero_id 英雄id
 */
export const getHeroSkin = (hero_id: number) =>
  Promise.resolve(get<Hero.Skin>({ name: CONFIG.LOCAL_KEY.SKIN, key: "hero", value: hero_id }, false));

/** @description 获取皮肤类型列表 */
export const getSkinType = () => Promise.resolve(get<Hero.SkinType[]>({ name: CONFIG.LOCAL_KEY.SKIN_TYPE }));

/**
 * @description 获取指定皮肤类型
 * @param skin_id 皮肤id
 */
export const getAssignSkinType = (skin_id: number) =>
  Promise.resolve(get<Hero.SkinType>({ name: CONFIG.LOCAL_KEY.SKIN_TYPE, key: "id", value: skin_id }));
