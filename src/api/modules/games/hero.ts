import { KVP_HERO, KVP_TYPE, LOCAL_HERO } from "@/api";

/** @description 获取英雄图集列表 */
export const getHeroAtlas = () => {
  const hero_ids = LOCAL_HERO.getHeroList();
  const hero_name_kvp = KVP_HERO.getHeroNameKvp();
  const hero_gender_kvp = KVP_HERO.getHeroGenderKvp();
  const hero_image_kvp = KVP_HERO.getHeroImageKvp();
  const hero_profession_list_kvp = KVP_HERO.getHeroProfessionListKvp();
  const hero_skin_list_kvp = KVP_HERO.getHeroSkinListKvp();
  const skin_image_kvp = KVP_HERO.getSkinImageKvp();
  const skin_name_kvp = KVP_HERO.getSkinNameKvp();
  const type_profession_kvp = KVP_TYPE.getProfessionKvp();

  //整合数据
  const hero_atlas_list: Game.Hero.Atlas[] = [];
  for (let i = 0; i < hero_ids.length; i++) {
    const id = hero_ids[i];
    const { cover, coverBlur, poster, posterBlur, posterBig } = hero_image_kvp[id];

    //获取职业中文名称
    const profession = hero_profession_list_kvp[id].map((item) => type_profession_kvp[item]);
    //获取皮肤图片列表
    const skins = hero_skin_list_kvp[id].map((skinId) => {
      const { cover, poster, posterBlur, posterBig } = skin_image_kvp[skinId];
      return {
        id: skinId,
        name: skin_name_kvp[skinId],
        poster,
        cover,
        posterBlur,
        posterBig,
      };
    });

    hero_atlas_list[i] = {
      id: id,
      name: hero_name_kvp[id],
      gender: hero_gender_kvp[id],
      poster,
      cover,
      posterBlur,
      posterBig,
      coverBlur,
      profession,
      skins,
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
  const hero_resume_kvp = KVP_HERO.getHeroResumeKvp();
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
  const hero_data_list: Game.Hero.Data[] = [];
  for (let i = 0; i < hero_ids.length; i++) {
    const heroId = hero_ids[i];
    const { attack, difficulty, effect, survival } = hero_attr_kvp[heroId];
    const { cover, coverBlur, poster, posterBlur, posterBig } = hero_image_kvp[heroId];

    //获取职业中文名称
    const profession = hero_profession_list_kvp[heroId].map((item) => type_profession_kvp[item]);

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
      resume: hero_resume_kvp[heroId],
      identity: hero_identity_kvp[heroId],
      location: hero_location_kvp[heroId],
      mark: hero_mark_kvp[heroId],
      name: hero_name_kvp[heroId],
      period: type_period_kvp[hero_period_kvp[heroId]],
      race: hero_race_kvp[heroId],
      skillUnit: hero_skill_unit_kvp[heroId],
      gender: hero_gender_kvp[heroId],
      profession,
      specialty: hero_specialty_list_kvp[heroId],
      skills: hero_skill_list_kvp[heroId],
      skinCount: hero_skin_list_kvp[heroId].length,
      relationCount: hero_relationship_list_kvp[heroId]?.length || 0,
    };
  }
  return hero_data_list;
};

/** @description 获取英雄详情 */
export const getHeroDetail = (hero_id: number) => {
  const heros = getHeroData();
  const hero_name_kvp = KVP_HERO.getHeroNameKvp();
  const hero_avatar_kvp = KVP_HERO.getHeroAvatarKvp();
  const hero_skin_kvp = getHeroSkinListKvp();
  const hero_relationship_kvp = KVP_HERO.getHeroRelationshipListKvp();
  const hero = heros.find((item) => item.id === hero_id)!;

  //获取关系英雄中文名称和头像
  const relationships = hero_relationship_kvp[hero_id]?.map((relationship) => {
    return {
      ...relationship,
      avatar: hero_avatar_kvp[relationship.id],
      heroName: hero_name_kvp[relationship.id],
    };
  });

  const hero_detail: Game.Hero.Detail = {
    ...hero,
    skins: hero_skin_kvp[hero_id],
    relationships: relationships || [],
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

  //皮肤列表第一个为原皮肤，避免没有皮肤的英雄无法加载皮肤页面
  hero_detail.skins.unshift({
    id: 0,
    category: "",
    link: "",
    alias: "",
    typeSort: 0,
    name: "原版皮肤",
    price: "",
    type: 0,
    cover,
    gender,
    avatar,
    hero: id,
    heroName,
    poster,
    posterBig,
    posterBlur,
    profession,
  });

  return hero_detail;
};

/** @description 获取指定皮肤语音 */
export const getSkinVoice = (hero_id: number, skin_name: string): Remote.Voice.Data => {
  const skin_voices = KVP_HERO.getSkinVoiceListKvp();
  const hero_name = KVP_HERO.getHeroNameKvp();

  if (!["梦奇", "盾山"].includes(hero_name[hero_id])) {
    const voice_data = skin_voices[hero_id].find((item) => item.name === skin_name);

    //如果没有获取到对应皮肤的语音，则使用原皮肤语音
    if (voice_data) return voice_data;
    return skin_voices[hero_id].find((item) => item.name === "原皮")!;
  } else {
    return [] as unknown as Remote.Voice.Data;
  }
};

/**
 * @description 获取指定英雄在指定英雄的关系内的关系描述
 * @param hero_id 查询英雄id
 * @param child_id 查询到的英雄关系中二次查询关系的
 */
export const getHeroRelationshipDesc = (hero_id: number, child_id: number) => {
  const relationship = KVP_HERO.getHeroRelationshipListKvp()[hero_id];
  const hero = getHeroDetail(child_id);
  const target = relationship.find((item) => item.id === child_id)!;
  return {
    relation: target.relation,
    desc: target.desc,
    gender: hero.gender,
  };
};

/** @description 获取皮肤列表 */
export const getSkinList = () => {
  const skin_ids = LOCAL_HERO.getSkinList();
  const hero_name_kvp = KVP_HERO.getHeroNameKvp();
  const hero_gender_kvp = KVP_HERO.getHeroGenderKvp();
  const hero_profession_kvp = KVP_HERO.getHeroProfessionListKvp();
  const skin_name_kvp = KVP_HERO.getSkinNameKvp();
  const skin_hero_kvp = KVP_HERO.getSkinHeroKvp();
  const skin_price_kvp = KVP_HERO.getSkinPriceKvp();
  const skin_type_kvp = KVP_HERO.getSkinTypeKvp();
  const skin_image_kvp = KVP_HERO.getSkinImageKvp();
  const type_skin_kvp = KVP_TYPE.getSkinKvp();
  const type_profession_kvp = KVP_TYPE.getProfessionKvp();

  //整合数据
  const hero_skin_list: Game.Hero.Skin[] = [];
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
      alias: type_skin_kvp[skin_type_kvp[id]].alias,
      typeSort: type_skin_kvp[skin_type_kvp[id]].sort,
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

/** @description 通过英雄id+皮肤用获取皮肤信息，主要用于弹幕语音 */
export const getSkinDetail = (hero_id: number, skin_name: string) => {
  const data = getSkinList();
  const skin = data.find((item) => {
    return item.hero === hero_id && item.name === skin_name;
  });
  return skin;
};

/** @description 获取皮肤信息键值 */
export const getSkinKvp = () => {
  const data = getSkinList();
  const kvp: Record<number, Game.Hero.Skin> = {};
  data.forEach((item) => {
    kvp[item.id] = item;
  });
  return kvp;
};

/** @description 获取英雄的皮肤列表键值 */
export const getHeroSkinListKvp = () => {
  const skin_ids = LOCAL_HERO.getHeroSkinList();
  const data = getSkinKvp();
  const kvp: Record<number, Game.Hero.Skin[]> = {};
  skin_ids.forEach((item) => {
    kvp[item.id] = item.value.map((id) => data[id]);
  });
  return kvp;
};
