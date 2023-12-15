import { API_SKIN } from "@/api";
import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取指定英雄皮肤列表 */
export const getHeroSkins = async (hero_id: number) => {
  const skin_list = await API_SKIN.getSkin();
  const hero_skins = skin_list.filter((skin) => skin.hero === hero_id);
  return Promise.resolve(hero_skins);
};

/** @description 获取指定英雄指定皮肤 */
export const getHeroSkin = async (hero_id: number, skin_name: string) => {
  const skins = await getHeroSkins(hero_id);
  const skin = skins.find((skin) => skin.name === skin_name)!;
  return Promise.resolve(skin);
};

/** @description 获取指定英雄皮肤图片  */
export const getHeroSkinImage = async (hero_id: number) => {
  const skin_img_list = await API_SKIN.getHeroSkinImage();
  const skin_img = skin_img_list.find((item) => item.id === hero_id)!;
  return Promise.resolve(skin_img);
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
