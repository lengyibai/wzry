import { LOCAL_HERO } from "@/api";
import { BASE_CONFIG } from "@/config";
import { _getBlurImgLink } from "@/utils/concise";
import { _setSkillHighlight } from "@/utils/tool";

/** @description 获取英雄价格键值表 */
export const getHeroPriceKvp = async () => {
  const data = await LOCAL_HERO.getHeroPriceList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄属性键值表 */
export const getHeroAttrKvp = async () => {
  const data = await LOCAL_HERO.getHeroAttrList();
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
export const getHeroPinyinKvp = async () => {
  const data = await LOCAL_HERO.getHeroPinyinList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄阵营键值表 */
export const getHeroCampKvp = async () => {
  const data = await LOCAL_HERO.getHeroCampList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄头像键值表 */
export const getHeroAvatarKvp = async () => {
  const data = await LOCAL_HERO.getHeroAvatarList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = BASE_CONFIG.IMGBED + item.value;
  });
  return kvp;
};

/** @description 获取英雄图片键值表 */
export const getHeroImageKvp = async () => {
  const data = await LOCAL_HERO.getHeroImageList();
  const kvp: Record<number, Omit<Remote.Hero.Image, "id">> = {};
  data.forEach((item) => {
    kvp[item.id] = {
      cover: BASE_CONFIG.IMGBED + item.cover,
      coverBlur: _getBlurImgLink(item.coverBlur),
      poster: BASE_CONFIG.IMGBED + item.poster,
      posterBlur: _getBlurImgLink(item.posterBlur),
      posterBig: BASE_CONFIG.IMGBED + item.posterBig,
    };
  });
  return kvp;
};

/** @description 获取英雄身高键值表 */
export const getHeroHeightKvp = async () => {
  const data = await LOCAL_HERO.getHeroHeightList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄简述键值表 */
export const getHeroResumeKvp = async () => {
  const data = await LOCAL_HERO.getHeroResumeList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄身份键值表 */
export const getHeroIdentityKvp = async () => {
  const data = await LOCAL_HERO.getHeroIdentityList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄定位键值表 */
export const getHeroLocationKvp = async () => {
  const data = await LOCAL_HERO.getHeroLocationList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄代号键值表 */
export const getHeroMarkKvp = async () => {
  const data = await LOCAL_HERO.getHeroMarkList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄名称键值表 */
export const getHeroNameKvp = async () => {
  const data = await LOCAL_HERO.getHeroNameList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄时期键值表 */
export const getHeroPeriodKvp = async () => {
  const data = await LOCAL_HERO.getHeroPeriodList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄种族键值表 */
export const getHeroRaceKvp = async () => {
  const data = await LOCAL_HERO.getHeroRaceList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄技能单位键值表 */
export const getHeroSkillUnitKvp = async () => {
  const data = await LOCAL_HERO.getHeroSkillUnitList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄性别键值表 */
export const getHeroGenderKvp = async () => {
  const data = await LOCAL_HERO.getHeroGenderList();
  const kvp: Record<number, Game.GenderText> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄职业列表键值表 */
export const getHeroProfessionListKvp = async () => {
  const data = await LOCAL_HERO.getHeroProfessionList();
  const kvp: Record<number, number[]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄特长列表键值表 */
export const getHeroSpecialtyListKvp = async () => {
  const data = await LOCAL_HERO.getHeroSpecialtyList();
  const kvp: Record<number, string[]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄技能列表键值表 */
export const getHeroSkillListKvp = async () => {
  const data = await LOCAL_HERO.getSkillList();
  const kvp: Record<number, Remote.Skill.Info[][]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.skills.map((item) => {
      return item.map((item) => {
        return {
          ...item,
          img: BASE_CONFIG.IMGBED + item.img,
          desc: _setSkillHighlight(item.desc),
        };
      });
    });
  });
  return kvp;
};

/** @description 获取英雄皮肤列表键值表 */
export const getHeroSkinListKvp = async () => {
  const data = await LOCAL_HERO.getHeroSkinList();
  const kvp: Record<number, number[]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取英雄关系列表键值表 */
export const getHeroRelationshipListKvp = async () => {
  const data = await LOCAL_HERO.getHeroRelationshipList();
  const kvp: Record<number, Remote.Hero.Relationship["value"]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤所属英雄键值表 */
export const getSkinHeroKvp = async () => {
  const data = await LOCAL_HERO.getSkinHeroList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤图片键值表 */
export const getSkinImageKvp = async () => {
  const data = await LOCAL_HERO.getSkinImageList();
  const kvp: Record<number, Omit<Remote.Skin.Image, "id">> = {};
  data.forEach((item) => {
    kvp[item.id] = {
      avatar: BASE_CONFIG.IMGBED + item.avatar,
      cover: BASE_CONFIG.IMGBED + item.cover,
      poster: BASE_CONFIG.IMGBED + item.poster,
      posterBig: BASE_CONFIG.IMGBED + item.posterBig,
      posterBlur: _getBlurImgLink(item.posterBlur),
    };
  });
  return kvp;
};

/** @description 获取皮肤名称键值表 */
export const getSkinNameKvp = async () => {
  const data = await LOCAL_HERO.getSkinNameList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤价格键值表 */
export const getSkinPriceKvp = async () => {
  const data = await LOCAL_HERO.getSkinPriceList();
  const kvp: Record<
    number,
    {
      price: string;
      debris: string;
    }
  > = {};
  data.forEach((item) => {
    kvp[item.id] = {
      price: item.value,
      debris: item.debris || "",
    };
  });
  return kvp;
};

/** @description 获取皮肤类型键值表 */
export const getSkinTypeKvp = async () => {
  const data = await LOCAL_HERO.getSkinTypeList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤语音列表键值表 */
export const getSkinVoiceListKvp = async () => {
  const data = await LOCAL_HERO.getHeroNameList();
  const kvp: Record<number, Remote.Voice.Data[]> = {};
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    kvp[item.id] = await LOCAL_HERO.getVoiceList(item.value);
  }
  return kvp;
};
