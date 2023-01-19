import { $deepMearge } from "@/utils";
interface Get {
  name: string; //用于获取本地存储的键名
  key?: string; //从本地存储获取的数据的键名
  value?: any; //匹配的值
  full?: boolean; //是否全字匹配
}

interface Patch extends Get {
  k?: string; //需要被修改的键名
  v: any; //需要修改成什么
}

interface Del {
  name: string; //用于获取本地存储的键名
  id: string; //数据id
}

/** @description: 通过字段查询指定值 */
export function get<R>(params: Get, alone?: true): R;
export function get<R>(params: Get, alone?: false): R[];
export function get<R>(params: Get, alone = true): R | R[] | void {
  const { name, key, value, full = true } = params;
  const d = localStorage.getItem(name);
  const data: R[] = d && JSON.parse(d);

  /* 如果没有填写该字段，则返回所有 */
  if (!(key && value)) {
    return data;
  }

  /* 只查询一个，否则查询多个 */
  if (alone) {
    return data.find((item: R) => {
      const i = item as Record<string, any>;
      return full ? i[key] === value : i[key].includes(value);
    });
  } else {
    return data.filter((item: R) => {
      const i = item as Record<string, any>;
      return full ? i[key] === value : i[key].includes(value);
    });
  }
}

/** @description: 添加 */
export const post = <R>(name: string, value: R) => {
  const d = localStorage.getItem(name);
  const v = (d && JSON.parse(d)) as R[];
  v.push(value);
  localStorage.setItem(name, JSON.stringify(v));
};

/**
 * @description: 修改
 * @param {boolean} obj: 是否传递对象进行修改
 */
export const patch = <R>(params: Patch, obj?: boolean) => {
  const { name, key = "", k = "", value, v } = params;
  const d = localStorage.getItem(name);
  const data: R[] = d && JSON.parse(d);
  let newData = data.find((item) => {
    const i = item as Record<string, any>;
    return i[key] === value;
  }) as Record<string, any>;
  if (obj) {
    newData = v;
  } else {
    newData[k] = v;
  }

  localStorage.setItem(name, JSON.stringify($deepMearge(data, [newData]))); //合并数据并存储
  return newData as R;
};

/** @description: 删除 */
export const del = <R extends Record<string, string>>(params: Del) => {
  const { name, id } = params;
  const d = localStorage.getItem(name);
  const v = (d && JSON.parse(d)) as R[];
  const index = v.findIndex((item) => item.id === id);
  v.splice(index, 1);
  localStorage.setItem(name, JSON.stringify(v));
};
