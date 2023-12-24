import { KVP_HERO, KVP_SKIN, KVP_TYPE, LOCAL_HERO, LOCAL_SKIN } from "@/api";

/** @description 获取皮肤列表 */
export const getSkinList = () => {
  const skin_ids = LOCAL_SKIN.getSkinList();
  const hero_name_kvp = KVP_HERO.getHeroNameKvp();
  const hero_gender_kvp = KVP_HERO.getHeroGenderKvp();
  const hero_profession_kvp = KVP_HERO.getHeroProfessionListKvp();
  const skin_name_kvp = KVP_SKIN.getSkinNameKvp();
  const skin_hero_kvp = KVP_SKIN.getSkinHeroKvp();
  const skin_price_kvp = KVP_SKIN.getSkinPriceKvp();
  const skin_type_kvp = KVP_SKIN.getSkinTypeKvp();
  const skin_image_kvp = KVP_SKIN.getSkinImageKvp();
  const type_skin_kvp = KVP_TYPE.getSkinKvp();
  const type_profession_kvp = KVP_TYPE.getProfessionKvp();

  //整合数据
  const hero_skin_list: Hero.Skin[] = [];
  for (let i = 0; i < skin_ids.length; i++) {
    const id = skin_ids[i];
    const { poster, posterBlur, posterBig, cover, avatar } = skin_image_kvp[id];

    hero_skin_list[i] = {
      id: id,
      hero: skin_hero_kvp[id],
      price: skin_price_kvp[id],
      type: skin_type_kvp[id],
      link: type_skin_kvp[skin_type_kvp[id]].link,
      category: type_skin_kvp[skin_type_kvp[id]].name,
      gender: hero_gender_kvp[skin_hero_kvp[id]],
      name: skin_name_kvp[id],
      skin_name: skin_name_kvp[id],
      poster,
      posterBlur,
      posterBig,
      cover,
      avatar,
      heroName: hero_name_kvp[skin_hero_kvp[id]],
      hero_name: hero_name_kvp[skin_hero_kvp[id]],
      profession: hero_profession_kvp[skin_hero_kvp[id]].map((item) => type_profession_kvp[item]),
    };
  }

  return hero_skin_list;
};

/** @description 获取皮肤信息键值 */
export const getSkinKvp = () => {
  const data = getSkinList();
  const kvp: Record<number, Hero.Skin> = {};
  data.forEach((item) => {
    kvp[item.id] = item;
  });
  return kvp;
};

/** @description 获取英雄的皮肤列表键值 */
export const getHeroSkinsKvp = () => {
  const skin_ids = LOCAL_HERO.getHeroSkinList();
  const data = getSkinKvp();
  const kvp: Record<number, Hero.Skin[]> = {};
  skin_ids.forEach((item) => {
    kvp[item.id] = item.value.map((id) => data[id]);
  });
  return kvp;
};
