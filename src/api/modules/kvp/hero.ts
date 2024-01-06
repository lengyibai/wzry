import { LOCAL_HERO } from "@/api";

/** @description 获取英雄属性键值表 */
export const getHeroAttrKvp = () => {
  const data = LOCAL_HERO.getHeroAttrList();
  const kvp: Record<number, Remote.Hero.Attr> = {};
  data.forEach((item) => {
    kvp[item.id] = {
      id: item.id,
      attack: item.attack,
      difficulty: item.difficulty,
      effect: item.effect,
      survival: item.survival,
    };
  });
  return kvp;
};

/** @description 获取英雄拼音键值表 */
export const getHeroPinyinKvp = () => {
  const data = LOCAL_HERO.getHeroPinyinList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄阵营键值表 */
export const getHeroCampKvp = () => {
  const data = LOCAL_HERO.getHeroCampList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄头像键值表 */
export const getHeroAvatarKvp = () => {
  const data = LOCAL_HERO.getHeroAvatarList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄图片键值表 */
export const getHeroImageKvp = () => {
  const data = LOCAL_HERO.getHeroImageList();
  const kvp: Record<number, Omit<Remote.Hero.Image, "id">> = {};
  data.forEach((item) => {
    kvp[item.id] = {
      cover: item.cover,
      coverBlur: item.coverBlur,
      poster: item.poster,
      posterBlur: item.posterBlur,
      posterBig: item.posterBig,
    };
  });
  return kvp;
};

/** @description 获取英雄身高键值表 */
export const getHeroHeightKvp = () => {
  const data = LOCAL_HERO.getHeroHeightList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄简述键值表 */
export const getHeroResumeKvp = () => {
  const data = LOCAL_HERO.getHeroResumeList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄身份键值表 */
export const getHeroIdentityKvp = () => {
  const data = LOCAL_HERO.getHeroIdentityList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄定位键值表 */
export const getHeroLocationKvp = () => {
  const data = LOCAL_HERO.getHeroLocationList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄代号键值表 */
export const getHeroMarkKvp = () => {
  const data = LOCAL_HERO.getHeroMarkList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄名称键值表 */
export const getHeroNameKvp = () => {
  const data = LOCAL_HERO.getHeroNameList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄时期键值表 */
export const getHeroPeriodKvp = () => {
  const data = LOCAL_HERO.getHeroPeriodList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄种族键值表 */
export const getHeroRaceKvp = () => {
  const data = LOCAL_HERO.getHeroRaceList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄技能单位键值表 */
export const getHeroSkillUnitKvp = () => {
  const data = LOCAL_HERO.getHeroSkillUnitList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄性别键值表 */
export const getHeroGenderKvp = () => {
  const data = LOCAL_HERO.getHeroGenderList();
  const kvp: Record<number, Game.GenderText> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄职业列表键值表 */
export const getHeroProfessionListKvp = () => {
  const data = LOCAL_HERO.getHeroProfessionList();
  const kvp: Record<number, number[]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄特长列表键值表 */
export const getHeroSpecialtyListKvp = () => {
  const data = LOCAL_HERO.getHeroSpecialtyList();
  const kvp: Record<number, string[]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄技能列表键值表 */
export const getHeroSkillListKvp = () => {
  const data = LOCAL_HERO.getSkillList();
  const kvp: Record<number, Remote.Skill.Info[][]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.skills;
  });
  return kvp;
};

/** @description 获取英雄皮肤列表键值表 */
export const getHeroSkinListKvp = () => {
  const data = LOCAL_HERO.getHeroSkinList();
  const kvp: Record<number, number[]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄关系列表键值表 */
export const getHeroRelationshipListKvp = () => {
  const data = LOCAL_HERO.getHeroRelationshipList();
  const kvp: Record<number, Remote.Hero.Relationship["value"]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤所属英雄键值表 */
export const getSkinHeroKvp = () => {
  const data = LOCAL_HERO.getSkinHeroList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤图片键值表 */
export const getSkinImageKvp = () => {
  const data = LOCAL_HERO.getSkinImageList();
  const kvp: Record<number, Omit<Remote.Skin.Image, "id">> = {};
  data.forEach((item) => {
    kvp[item.id] = {
      avatar: item.avatar,
      cover: item.cover,
      poster: item.poster,
      posterBig: item.posterBig,
      posterBlur: item.posterBlur,
    };
  });
  return kvp;
};

/** @description 获取皮肤名称键值表 */
export const getSkinNameKvp = () => {
  const data = LOCAL_HERO.getSkinNameList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤价格键值表 */
export const getSkinPriceKvp = () => {
  const data = LOCAL_HERO.getSkinPriceList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤类型键值表 */
export const getSkinTypeKvp = () => {
  const data = LOCAL_HERO.getSkinTypeList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤语音列表键值表 */
export const getSkinVoiceListKvp = () => {
  const hero_ids = LOCAL_HERO.getHeroPinyinList();
  const kvp: Record<number, Remote.Voice.Data[]> = {};
  hero_ids.forEach((item) => {
    kvp[item.id] = LOCAL_HERO.getVoiceList(item.value);
  });
  return kvp;
};
