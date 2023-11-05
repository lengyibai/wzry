import { get, post } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取皮肤列表 */
export const getSkin = () => {
  const skin = get<Hero.Skin[]>({ name: CONFIG.LOCAL_KEY.SKIN });
  return Promise.resolve(skin);
};

/** @description 添加皮肤 */
export const addSkin = (data: Hero.Skin) => {
  const skin = post<Hero.Skin>(CONFIG.LOCAL_KEY.SKIN, data);
  return Promise.resolve(skin);
};

/** @description 获取指定英雄皮肤 */
export const getHeroSkin = (hero_id: number) => {
  const params = { name: CONFIG.LOCAL_KEY.SKIN, key: "hero", value: hero_id };
  const hero_skin = get<Hero.Skin>(params, false);
  return Promise.resolve(hero_skin);
};

/** @description 获取皮肤类型列表 */
export const getSkinType = () => {
  const skin_type_list = get<Hero.SkinType[]>({
    name: CONFIG.LOCAL_KEY.SKIN_TYPE,
  });
  return Promise.resolve(skin_type_list);
};

/** @description 获取指定皮肤类型 */
export const getAssignSkinType = (skin_id: number) => {
  const params = {
    name: CONFIG.LOCAL_KEY.SKIN_TYPE,
    key: "id",
    value: skin_id,
  };
  const skin_type = get<Hero.SkinType>(params);
  return Promise.resolve(skin_type);
};
