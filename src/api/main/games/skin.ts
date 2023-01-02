import { get, post } from "@/api/helper/transfer";

/** @description: 获取皮肤列表 */
export const getSkin = () => {
  return Promise.resolve(get<Hero.Skin[]>({ name: "data_skin" }));
};

/** @description: 添加皮肤列表 */
export const addSkin = (data: Hero.Skin) => {
  return Promise.resolve(post<Hero.Skin>("data_skin", data));
};

/** @description: 获取指定英雄皮肤 */
export const getHeroSkin = (id: number) => {
  return Promise.resolve(
    get<Hero.Skin>({ name: "data_skin", key: "hero", value: id }, false)
  );
};

/** @description: 获取皮肤类型列表 */
export const getSkinType = () => {
  return Promise.resolve(get<Hero.SkinType[]>({ name: "data_skintype" }));
};

/** @description: 获取指定皮肤类型 */
export const getAssignSkinType = (id: number) => {
  return Promise.resolve(
    get<Hero.SkinType>({ name: "data_skintype", key: "id", value: id })
  );
};
