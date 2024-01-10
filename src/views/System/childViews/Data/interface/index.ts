import { ResultData } from "@/api/interface";

/** @description 表格数据 */
export interface TableData {
  /** 数据名 */
  name: string;
  /** 数据键名 */
  key: string;
  /** 数据 */
  data: unknown[];
  /** 检查状态 */
  status: string;
  /** 数据量 */
  length: number;
  /** 占用大小 */
  size: number;
  /** 请求 */
  request: () => Promise<ResultData<any>>;
}
