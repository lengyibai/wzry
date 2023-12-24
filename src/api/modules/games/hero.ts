import { GAME_SKIN, KVP_HERO, KVP_SKIN, KVP_TYPE, KVP_VOICE, LOCAL_HERO } from "@/api";

/** @description 获取英雄图集列表 */
export const getHeroAtlas = () => {
  const hero_ids = LOCAL_HERO.getHeroList();
  const hero_name_kvp = KVP_HERO.getHeroNameKvp();
  const hero_gender_kvp = KVP_HERO.getHeroGenderKvp();
  const hero_image_kvp = KVP_HERO.getHeroImageKvp();
  const hero_profession_list_kvp = KVP_HERO.getHeroProfessionListKvp();
  const hero_skin_list_kvp = KVP_HERO.getHeroSkinListKvp();
  const skin_image_kvp = KVP_SKIN.getSkinImageKvp();
  const skin_name_kvp = KVP_SKIN.getSkinNameKvp();
  const type_profession_kvp = KVP_TYPE.getProfessionKvp();

  //整合数据
  const hero_atlas_list: Hero.Atlas[] = [];
  for (let i = 0; i < hero_ids.length; i++) {
    const id = hero_ids[i];
    const { cover, coverBlur, poster, posterBlur, posterBig } = hero_image_kvp[id];

    hero_atlas_list[i] = {
      id: id,
      name: hero_name_kvp[id],
      gender: hero_gender_kvp[id],
      poster,
      cover,
      posterBlur,
      posterBig,
      coverBlur,
      profession: hero_profession_list_kvp[id].map((item) => type_profession_kvp[item]),
      skins: hero_skin_list_kvp[id].map((skinId) => {
        const { cover, poster, posterBlur, posterBig } = skin_image_kvp[skinId];
        return {
          id: skinId,
          name: skin_name_kvp[skinId],
          poster,
          cover,
          posterBlur,
          posterBig,
        };
      }),
    };
  }

  return hero_atlas_list;
};

/** @description 获取英雄信息列表 */
export const getHeroData = () => {
  const hero_ids = LOCAL_HERO.getHeroList();
  const hero_attr_kvp = KVP_HERO.getHeroAttrKvp();
  const hero_camp_kvp = KVP_HERO.getHeroCampKvp();
  const hero_avatar_kvp = KVP_HERO.getHeroAvatarKvp();
  const hero_image_kvp = KVP_HERO.getHeroImageKvp();
  const hero_height_kvp = KVP_HERO.getHeroHeightKvp();
  const hero_identity_kvp = KVP_HERO.getHeroIdentityKvp();
  const hero_location_kvp = KVP_HERO.getHeroLocationKvp();
  const hero_mark_kvp = KVP_HERO.getHeroMarkKvp();
  const hero_name_kvp = KVP_HERO.getHeroNameKvp();
  const hero_period_kvp = KVP_HERO.getHeroPeriodKvp();
  const hero_race_kvp = KVP_HERO.getHeroRaceKvp();
  const hero_skill_unit_kvp = KVP_HERO.getHeroSkillUnitKvp();
  const hero_gender_kvp = KVP_HERO.getHeroGenderKvp();
  const hero_profession_list_kvp = KVP_HERO.getHeroProfessionListKvp();
  const hero_specialty_list_kvp = KVP_HERO.getHeroSpecialtyListKvp();
  const hero_skill_list_kvp = KVP_HERO.getHeroSkillListKvp();
  const hero_relationship_list_kvp = KVP_HERO.getHeroRelationshipListKvp();
  const hero_skin_list_kvp = KVP_HERO.getHeroSkinListKvp();
  const type_camp_kvp = KVP_TYPE.getCampKvp();
  const type_period_kvp = KVP_TYPE.getPeriodKvp();
  const type_profession_kvp = KVP_TYPE.getProfessionKvp();

  //整合数据
  const hero_data_list: Hero.Data[] = [];
  for (let i = 0; i < hero_ids.length; i++) {
    const heroId = hero_ids[i];
    const { attack, difficulty, effect, survival } = hero_attr_kvp[heroId];
    const { cover, coverBlur, poster, posterBlur, posterBig } = hero_image_kvp[heroId];
    hero_data_list[i] = {
      id: heroId,
      attack,
      difficulty,
      effect,
      survival,
      cover,
      coverBlur,
      poster,
      posterBlur,
      posterBig,
      camp: type_camp_kvp[hero_camp_kvp[heroId]],
      avatar: hero_avatar_kvp[heroId],
      height: hero_height_kvp[heroId],
      identity: hero_identity_kvp[heroId],
      location: hero_location_kvp[heroId],
      mark: hero_mark_kvp[heroId],
      name: hero_name_kvp[heroId],
      period: type_period_kvp[hero_period_kvp[heroId]],
      race: hero_race_kvp[heroId],
      skillUnit: hero_skill_unit_kvp[heroId],
      gender: hero_gender_kvp[heroId],
      profession: hero_profession_list_kvp[heroId].map((item) => type_profession_kvp[item]),
      specialty: hero_specialty_list_kvp[heroId],
      skills: hero_skill_list_kvp[heroId],
      skinCount: hero_skin_list_kvp[heroId].length,
      relationCount: hero_relationship_list_kvp[heroId].length,
    };
  }
  return hero_data_list;
};

/** @description 获取英雄详情 */
export const getHeroDetail = (hero_id: number) => {
  const heros = getHeroData();
  const hero_name_kvp = KVP_HERO.getHeroNameKvp();
  const hero_avatar_kvp = KVP_HERO.getHeroAvatarKvp();
  const skin_voice_kvp = KVP_VOICE.getSkinVoiceKvp();
  const hero_skin_kvp = GAME_SKIN.getHeroSkinsKvp();
  const hero_skill_kvp = KVP_HERO.getHeroSkillListKvp();
  const hero_relationship_kvp = KVP_HERO.getHeroRelationshipListKvp();
  const hero = heros.find((item) => item.id === hero_id)!;

  const hero_detail: Hero.Detail = {
    ...hero,
    voices: skin_voice_kvp[hero_id].map((item) => item.voice),
    skins: hero_skin_kvp[hero_id],
    skills: hero_skill_kvp[hero_id],
    relationships: hero_relationship_kvp[hero_id].map((relationship) => {
      return {
        ...relationship,
        avatar: hero_avatar_kvp[relationship.id],
        heroName: hero_name_kvp[hero_id],
      };
    }),
  };

  const {
    cover,
    gender,
    avatar,
    id,
    name: heroName,
    poster,
    posterBig,
    posterBlur,
    profession,
  } = hero;

  //皮肤列表第一个为原皮肤
  hero_detail.skins.unshift({
    id: 0,
    category: "",
    cover,
    gender,
    avatar,
    hero: id,
    heroName,
    link: "",
    name: "原版皮肤",
    poster,
    posterBig,
    posterBlur,
    price: "",
    profession,
    type: 0,
  });

  return hero_detail;
};

/**
 * @description 获取指定英雄在指定英雄的关系内的关系描述
 * @param hero_id 查询英雄id
 * @param child_id 查询到的英雄关系中二次查询关系的
 */
export const getHeroRelationshipDesc = (hero_id: number, child_id: number) => {
  const relationship = KVP_HERO.getHeroRelationshipListKvp()[hero_id];
  const hero = getHeroDetail(child_id);
  const target = relationship.find((item) => item.id === child_id);
  return {
    relation: target?.relation,
    desc: target?.desc,
    gender: hero.gender,
  };
};
