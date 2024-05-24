import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取铭文列表 */
export const getEpigraphList = async () => {
  return await get<number[]>(LOCAL_KEY.epigraph);
};

/** @description 获取铭文效果列表 */
export const getEpigraphColorList = async () => {
  return await get<Remote.Epigraph.Color[]>(LOCAL_KEY.epigraphColor);
};

/** @description 获取铭文效果列表 */
export const getEpigraphEffectList = async () => {
  return await get<Remote.Epigraph.Effect[]>(LOCAL_KEY.epigraphEffect);
};

/** @description 获取铭文图片列表 */
export const getEpigraphImageList = async () => {
  return await get<Remote.Epigraph.Image[]>(LOCAL_KEY.epigraphImage);
};

/** @description 获取铭文名称列表 */
export const getEpigraphNameList = async () => {
  return await get<Remote.Epigraph.Name[]>(LOCAL_KEY.epigraphName);
};

/** @description 获取铭文类型列表 */
export const getEpigraphTypeList = async () => {
  return await get<Remote.Epigraph.Type[]>(LOCAL_KEY.epigraphType);
};
