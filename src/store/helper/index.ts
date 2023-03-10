const multiple = () => {
  const width = window.innerWidth;
  let multiple = 1;
  if (width < 480) {
    multiple = 10 / 16;
  } else if (width < 720) {
    multiple = 12 / 16;
  } else if (width < 960) {
    multiple = 14 / 16;
  }

  return multiple;
};

/** @description 获取装备的序号 */
export const num = (id: number) => Number(id.toString().slice(2));

/**
 * @description: 获取线条顶部距离
 * @param left 左侧装备id
 * @param right 右侧装备id
 */
export const top = (left: number, right: number) => {
  if (num(left) < num(right)) {
    return (num(left) - 1) * 100 * multiple() + "px";
  } else {
    return (num(right) - 1) * 100 * multiple() + "px";
  }
};

/**
 * @description: 获取线条高度
 * @param one 第一栏装备的id
 * @param two 第二栏第一件参与合成的装备id
 * @param three 第二栏倒数第一件参与合成的装备id
 */
export const height = (one: number, two: number, three: number) => {
  const x = num(one);
  const y = num(two);
  const z = num(three);
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

  return total * 100 * multiple() + "px";
};
