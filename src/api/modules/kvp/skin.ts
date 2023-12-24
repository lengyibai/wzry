import { LOCAL_SKIN } from "@/api";

/** @description 获取皮肤所属英雄键值表 */
export const getSkinHeroKvp = () => {
  const data = LOCAL_SKIN.getSkinHeroList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤图片键值表 */
export const getSkinImageKvp = () => {
  const data = LOCAL_SKIN.getSkinImageList();
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
  const data = LOCAL_SKIN.getSkinNameList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤价格键值表 */
export const getSkinPriceKvp = () => {
  const data = LOCAL_SKIN.getSkinPriceList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取皮肤类型键值表 */
export const getSkinTypeKvp = () => {
  const data = LOCAL_SKIN.getSkinTypeList();
  const kvp: Record<number, number> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};
