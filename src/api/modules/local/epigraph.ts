import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取铭文列表 */
export const getEpigraphList = () => {
  return get<number[]>({
    name: LOCAL_KEY.EPIGRAPH,
  });
};

/** @description 获取铭文效果列表 */
export const getEpigraphColorList = () => {
  return get<Remote.Epigraph.Color[]>({
    name: LOCAL_KEY.EPIGRAPH_COLOR,
  });
};

/** @description 获取铭文效果列表 */
export const getEpigraphEffectList = () => {
  return get<Remote.Epigraph.Effect[]>({
    name: LOCAL_KEY.EPIGRAPH_EFFECT,
  });
};

/** @description 获取铭文图片列表 */
export const getEpigraphImageList = () => {
  return get<Remote.Epigraph.Image[]>({
    name: LOCAL_KEY.EPIGRAPH_IMAGE,
  });
};

/** @description 获取铭文名称列表 */
export const getEpigraphNameList = () => {
  return get<Remote.Epigraph.Name[]>({
    name: LOCAL_KEY.EPIGRAPH_NAME,
  });
};

/** @description 获取铭文类型列表 */
export const getEpigraphTypeList = () => {
  return get<Remote.Epigraph.Type[]>({
    name: LOCAL_KEY.EPIGRAPH_TYPE,
  });
};
