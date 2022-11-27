import { get } from "@/api/helper/transfer";

/** @description: 获取铭文列表 */
export const getEpigraph = () => {
  return Promise.resolve(get<any, Epigraph.Data[]>({ name: "data_epigraph" }));
};
