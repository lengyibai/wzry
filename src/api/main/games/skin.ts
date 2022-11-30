import { get } from "@/api/helper/transfer";

/** @description: 获取皮肤列表 */
export const getSkin = () => {
  return Promise.resolve(get<Hero.Data[]>({ name: "data_skin" }));
};

/** @description: 获取指定英雄皮肤 */
export const getHeroSkin = (id: number) => {
  const skins = get<Hero.Skin>({ name: "data_skin", key: "hero", value: id }, false);
  return Promise.resolve(skins);
};

/** @description: 获取皮肤类型 */
export const getSkinType = () => {
  return Promise.resolve(get<Hero.SkinType[]>({ name: "data_skintype" }));
};
