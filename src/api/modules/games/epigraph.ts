import { get } from "@/api/helper/transfer";
import { CONFIG } from "@/config";

/** @description 获取铭文列表 */
export const getEpigraphList = () => Promise.resolve(get<Epigraph.Data[]>({ name: CONFIG.LOCAL_KEY.EPIGRAPH }));
