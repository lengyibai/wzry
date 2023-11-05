import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取铭文列表 */
export const getEpigraphList = () => {
  const epigraph_list = get<Epigraph.Data[]>({
    name: CONFIG.LOCAL_KEY.EPIGRAPH,
  });
  return Promise.resolve(epigraph_list);
};
