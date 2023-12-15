import { API_HERO } from "@/api";
import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取皮肤列表 */
export const getSkin = async () => {
  const skin_list = get<Hero.Skin[]>({ name: CONFIG.LOCAL_KEY.SKIN });

  //创建id作为键的初始数据
  const base_data: Record<
    number,
    Pick<Hero.Skin, "profession" | "gender" | "heroName"> & {
      skin_images: Record<number, Record<number, Hero.SkinImage>>;
    }
  > = {};

  const hero_names = await API_HERO.getHeroName();
  hero_names.forEach((item) => {
    base_data[item.id] = {
      profession: [],
      gender: "男",
      heroName: "",
      skin_images: {},
    };
  });

  //获取英雄职业
  const hero_professions = await API_HERO.getHeroProfession();
  hero_professions.forEach((item) => {
    base_data[item.id].profession = item.name;
  });

  //获取英雄性别
  const hero_genders = await API_HERO.getHeroGender();
  hero_genders.forEach((item) => {
    base_data[item.id].gender = item.name;
  });

  //获取英雄名称
  hero_names.forEach((item) => {
    base_data[item.id].heroName = item.name;
  });

  //获取英雄皮肤图片
  const skin_images = await getHeroSkinImage();
  skin_images.forEach((item) => {
    item.skins.forEach((skin) => {
      base_data[item.id].skin_images[skin.id] = skin;
    });
  });

  //整合数据
  for (let i = 0; i < skin_list.length; i++) {
    const skin = skin_list[i];
    const skin_info = base_data[skin.hero].skin_images;

    skin.profession = base_data[skin.hero].profession;
    skin.gender = base_data[skin.hero].gender;
    skin.heroName = base_data[skin.hero].heroName;
    skin_list[i] = {
      ...skin,
      ...skin_info[skin.id],
    };
  }

  return Promise.resolve(skin_list);
};

/** @description 获取英雄皮肤图片列表 */
export const getHeroSkinImage = () => {
  const skin_img_list = get<Hero.SkinImage[]>({
    name: CONFIG.LOCAL_KEY.SKIN_IMAGE,
  });
  return Promise.resolve(skin_img_list);
};

/** @description 获取皮肤类型列表 */
export const getSkinType = () => {
  const skin_type_list = get<Hero.SkinType[]>({
    name: CONFIG.LOCAL_KEY.SKIN_TYPE,
  });
  return Promise.resolve(skin_type_list);
};
