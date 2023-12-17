import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取铭文列表 */
export const getEpigraphList = () => {
  const epigraph_list = get<Epigraph.Data[]>({
    name: CONFIG.LOCAL_KEY.EPIGRAPH,
  });
  return Promise.resolve(epigraph_list);
};

/** @description 获取铭文类型列表 */
export const getEpigraphType = () => {
  const epigraph_type = get<General[]>({
    name: CONFIG.LOCAL_KEY.EPIGRAPH_TYPE,
  });
  return Promise.resolve(epigraph_type);
};

/** @description 获取铭文效果列表 */
export const getEpigraphEffect = () => {
  const epigraph_effect = get<General[]>({
    name: CONFIG.LOCAL_KEY.EPIGRAPH_EFFECT,
  });
  return Promise.resolve(epigraph_effect);
};
