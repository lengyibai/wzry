/** @description: 返回值 */
export namespace ResultData {
  export interface User {
    headImg: string;
    id: number;
    name: string;
    password: string;
    wzryToken: string;
    role: 0 | 1;
  }
}
