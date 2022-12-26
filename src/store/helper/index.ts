// 获取装备的序号
export const num = (id: number) => {
  return Number(id.toString().slice(2));
};
export const t = (a: number, b: number) => {
  if (num(a) < num(b)) {
    return (num(a) - 1) * 115 + "px";
  } else {
    return (num(b) - 1) * 115 + "px";
  }
};
export const h = (a: number, b: number, c: number) => {
  const x = num(a);
  const y = num(b);
  const z = num(c);
  let total = Math.abs(y - z);
  if (x < y) {
    total = Math.abs(x - z);
  }

  if (x > y) {
    total = Math.abs(y - z);
  }

  if (x > z) {
    total = Math.abs(x - y);
  }

  return total * 115 + "px";
};
