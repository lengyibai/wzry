import { get } from "@/api/helper/transfer";
import { API_SKILL, API_SKIN, API_RELATIONSHIP, API_HERO } from "@/api";
import { CONFIG } from "@/config";

/** @description 获取英雄图集列表 */
export const getHeroAtlas = async () => {
  const hero_atlas_list = get<Hero.Atlas[]>({
    name: CONFIG.LOCAL_KEY.HERO_ATLAS,
  });

  //创建id作为键的初始数据
  const base_data: Record<
    number,
    Pick<Hero.Data, "name" | "gender" | "profession"> & {
      images: Hero.Image | {};
      skinImages: Record<
        number,
        Pick<Hero.Skin, "id" | "cover" | "poster" | "posterBlur" | "posterBig" | "headImg">
      >;
    }
  > = {};
  hero_atlas_list.forEach((hero) => {
    base_data[hero.id] = {
      name: "",
      gender: "男",
      profession: [],
      images: {},
      skinImages: {},
    };
  });

  //获取英雄名
  const hero_names = await API_HERO.getHeroName();
  hero_names.forEach((item) => {
    base_data[item.id].name = item.name;
  });

  //获取英雄性别
  const hero_genders = await API_HERO.getHeroGender();
  hero_genders.forEach((item) => {
    base_data[item.id].gender = item.name;
  });

  //获取英雄职业
  const hero_professions = await API_HERO.getHeroProfession();
  hero_professions.forEach((item) => {
    base_data[item.id].profession = item.name;
  });

  //获取英雄海报
  const hero_images = await API_HERO.getHeroImage();
  hero_images.forEach((item) => {
    base_data[item.id].images = item;
  });

  //获取英雄皮肤图片
  const hero_skin_images = await API_SKIN.getHeroSkinImage();
  hero_skin_images.forEach((hero) => {
    hero.skins.forEach((skin) => {
      base_data[hero.id].skinImages[skin.id] = skin;
    });
  });

  //整合数据
  for (let i = 0; i < hero_atlas_list.length; i++) {
    const hero_atla = hero_atlas_list[i];
    const images = base_data[hero_atla.id].images;
    hero_atla.profession = base_data[hero_atla.id].profession;
    hero_atla.gender = base_data[hero_atla.id].gender;
    hero_atla.name = base_data[hero_atla.id].name;
    hero_atlas_list[i] = {
      ...hero_atla,
      ...hero_atlas_list[i],
      ...images,
      skins: hero_atla.skins.map((atla) => {
        return {
          ...atla,
          ...base_data[hero_atla.id].skinImages[atla.id],
        };
      }),
    };
  }

  return Promise.resolve(hero_atlas_list);
};

/** @description 获取英雄信息列表 */
export const getHeroData = async () => {
  const hero_data_list = get<Hero.Data[]>({ name: CONFIG.LOCAL_KEY.HERO_DATA });

  //创建id作为键的初始数据
  const base_data: Record<
    number,
    Pick<
      Hero.Data,
      "headImg" | "name" | "profession" | "skills" | "gender" | "skinCount" | "relationCount"
    > & {
      images: Hero.Image | {};
    }
  > = {};
  hero_data_list.forEach((hero) => {
    base_data[hero.id] = {
      name: "",
      headImg: "",
      profession: [],
      skills: [],
      gender: "男",
      skinCount: 0,
      relationCount: 0,
      images: {},
    };
  });

  //统计英雄皮肤数量
  const skin_list = await API_SKIN.getSkin();
  skin_list.forEach((item) => {
    base_data[item.hero].skinCount += 1;
  });

  //统计关系数量
  const relationship_list = await API_RELATIONSHIP.getRelationship();
  relationship_list.forEach((item) => {
    base_data[item.id].relationCount += 1;
  });

  //获取英雄名
  const hero_names = await API_HERO.getHeroName();
  hero_names.forEach((item) => {
    base_data[item.id].name = item.name;
  });

  //获取英雄头像
  const hero_heads = await API_HERO.getHeroHead();
  hero_heads.forEach((item) => {
    base_data[item.id].headImg = item.name;
  });

  //获取英雄性别
  const hero_genders = await API_HERO.getHeroGender();
  hero_genders.forEach((item) => {
    base_data[item.id].gender = item.name;
  });

  //获取英雄职业
  const hero_professions = await API_HERO.getHeroProfession();
  hero_professions.forEach((item) => {
    base_data[item.id].profession = item.name;
  });

  //获取英雄技能
  const hero_skills = await API_SKILL.getHeroSkill();
  hero_skills.forEach((item) => {
    base_data[item.id].skills = item.skills;
  });

  //获取英雄海报
  const hero_images = await API_HERO.getHeroImage();
  hero_images.forEach((item) => {
    base_data[item.id].images = item;
  });

  //整合数据
  for (let i = 0; i < hero_data_list.length; i++) {
    const hero = hero_data_list[i];
    const images = base_data[hero.id].images;
    hero.skinCount = base_data[hero.id].skinCount;
    hero.relationCount = base_data[hero.id].relationCount;
    hero.profession = base_data[hero.id].profession;
    hero.gender = base_data[hero.id].gender;
    hero.headImg = base_data[hero.id].headImg;
    hero.name = base_data[hero.id].name;
    hero.skills = base_data[hero.id].skills;
    hero_data_list[i] = { ...hero, ...images };
  }

  return Promise.resolve(hero_data_list);
};

/** @description 获取英雄图片列表 */
export const getHeroImage = () => {
  const hero_img_list = get<Hero.Image[]>({
    name: CONFIG.LOCAL_KEY.HERO_IMAGE,
  });
  return Promise.resolve(hero_img_list);
};

/** @description 获取英雄头像列表 */
export const getHeroHead = () => {
  const hero_head_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.HERO_HEAD,
  });
  return Promise.resolve(hero_head_list);
};

/** @description 获取英雄名称列表  */
export const getHeroName = () => {
  const hero_name_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.HERO_NAME,
  });
  return Promise.resolve(hero_name_list);
};

/** @description 获取英雄拼音列表 */
export const getHeroPinyin = () => {
  const hero_pinyin_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.HERO_PINYIN,
  });
  return Promise.resolve(hero_pinyin_list);
};

/** @description 获取英雄性别列表 */
export const getHeroGender = () => {
  const hero_gender_list = get<General<GenderText>[]>({
    name: CONFIG.LOCAL_KEY.HERO_GENDER,
  });
  return Promise.resolve(hero_gender_list);
};

/** @description 获取英雄职业列表 */
export const getHeroProfession = () => {
  const hero_profession_list = get<General<Hero.Profession[]>[]>({
    name: CONFIG.LOCAL_KEY.HERO_PROFESSION,
  });
  return Promise.resolve(hero_profession_list);
};

/** @description 获取技能类型列表 */
export const getSkillType = () => {
  const skill_type_list = get<General[]>({ name: CONFIG.LOCAL_KEY.SKILL_TYPE });
  return Promise.resolve(skill_type_list);
};

/** @description 获取技能效果列表 */
export const getSkillEffect = () => {
  const skill_effect_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.SKILL_EFFECT,
  });
  return Promise.resolve(skill_effect_list);
};

/** @description 获取种族列表 */
export const getRaceType = () => {
  const race_type_list = get<General[]>({ name: CONFIG.LOCAL_KEY.RACE_TYPE });
  return Promise.resolve(race_type_list);
};

/** @description 获取阵营列表 */
export const getCampType = () => {
  const camp_type_list = get<General[]>({ name: CONFIG.LOCAL_KEY.CAMP_TYPE });
  return Promise.resolve(camp_type_list);
};

/** @description 获取定位列表 */
export const getLocationType = () => {
  const location_type_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.LOCATION_TYPE,
  });
  return Promise.resolve(location_type_list);
};

/** @description 获取时期列表 */
export const getPeriodType = () => {
  const period_type_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.PERIOD_TYPE,
  });
  return Promise.resolve(period_type_list);
};

/** @description 获取职业列表 */
export const getProfessionType = () => {
  const profession_type_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.PROFESSION_TYPE,
  });
  return Promise.resolve(profession_type_list);
};

/** @description 获取特长列表 */
export const getSpecialtyType = () => {
  const specialty_type_list = get<General[]>({
    name: CONFIG.LOCAL_KEY.SPECIALTY_TYPE,
  });
  return Promise.resolve(specialty_type_list);
};
