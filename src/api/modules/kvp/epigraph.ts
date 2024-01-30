import { LOCAL_EPIGRAPH } from "@/api";
import { BASE_CONFIG } from "@/config";

/** @description 获取铭文颜色键值表 */
export const getEpigraphColorKvp = () => {
  const data = LOCAL_EPIGRAPH.getEpigraphColorList();
  const kvp: Record<number, Remote.Epigraph.Color["value"]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取铭文效果键值表 */
export const getEpigraphEffectKvp = () => {
  const data = LOCAL_EPIGRAPH.getEpigraphEffectList();
  const kvp: Record<number, Remote.Epigraph.Effect["value"]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取铭文图片键值表 */
export const getEpigraphImageKvp = () => {
  const data = LOCAL_EPIGRAPH.getEpigraphImageList();
  const kvp: Record<number, Pick<Remote.Epigraph.Image, "img" | "imgBlur">> = {};
  data.forEach((item) => {
    kvp[item.id] = {
      img: BASE_CONFIG.IMGBED + item.img,
      imgBlur: BASE_CONFIG.IMGBED + item.imgBlur,
    };
  });
  return kvp;
};

/** @description 获取铭文名称键值表 */
export const getEpigraphNameKvp = () => {
  const data = LOCAL_EPIGRAPH.getEpigraphNameList();
  const kvp: Record<number, string> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};

/** @description 获取铭文类型键值表 */
export const getEpigraphTypeKvp = () => {
  const data = LOCAL_EPIGRAPH.getEpigraphTypeList();
  const kvp: Record<number, number[]> = {};
  data.forEach((item) => {
    kvp[item.id] = item.value;
  });
  return kvp;
};
