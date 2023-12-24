import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取皮肤列表 */
export const getSkinList = () => {
  return get<number[]>({ name: LOCAL_KEY.SKIN });
};

/** @description 获取皮肤所属英雄列表 */
export const getSkinHeroList = () => {
  return get<Remote.Skin.Hero[]>({ name: LOCAL_KEY.SKIN_HERO });
};

/** @description 获取皮肤图片列表 */
export const getSkinImageList = () => {
  return get<Remote.Skin.Image[]>({ name: LOCAL_KEY.SKIN_IMAGE });
};

/** @description 获取皮肤名称列表 */
export const getSkinNameList = () => {
  return get<Remote.Skin.Name[]>({ name: LOCAL_KEY.SKIN_NAME });
};

/** @description 获取皮肤价格列表 */
export const getSkinPriceList = () => {
  return get<Remote.Skin.Price[]>({ name: LOCAL_KEY.SKIN_PRICE });
};

/** @description 获取皮肤类型列表 */
export const getSkinTypeList = () => {
  return get<Remote.Skin.Type[]>({ name: LOCAL_KEY.SKIN_TYPE });
};
