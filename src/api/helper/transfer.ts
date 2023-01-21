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
export function get<R>(params: Get, alone?: true): R; //如果查询一个，则返回一个数据
export function get<R>(params: Get, alone?: false): R[]; //如果查询多个，则返回一个数组
export function get<R>(params: Get, alone = true): R | R[] | void {
  const { name, key, value, full = true } = params;
  const d = localStorage.getItem(name);
  const data: R[] = d && JSON.parse(d);

  //如果没有填写该字段，则返回所有数据
  if (!(key && value)) return data;

  //只查询一个，否则查询多个
  if (alone) {
    return data.find((item: R) => {
      const d = item as Record<string, any>;

      //判断是否使用全字匹配单个数据
      return full ? d[key] === value : d[key].includes(value);
    });
  } else {
    return data.filter((item: R) => {
      const i = item as Record<string, any>;

      //判断是否使用全字匹过滤多个数据
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
  const data: Record<string, R>[] = d && JSON.parse(d);

  //通过键值匹配查找到的数据索引
  const index = data.findIndex((item) => {
    const i = item as Record<string, any>;
    return i[key] === value;
  });

  let newData = data[index] as Record<string, any>;

  if (obj) {
    // 合并数据
    newData = { ...newData, ...v };
  } else {
    newData[k] = v;
  }

  //替换原数据表指定索引的数据
  data[index] = newData;
  localStorage.setItem(name, JSON.stringify(data)); //合并数据并存储
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
