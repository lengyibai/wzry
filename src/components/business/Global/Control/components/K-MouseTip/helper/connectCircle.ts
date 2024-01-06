/* 监听 */
export const connectCircle = (circle1: HTMLElement, circle2: HTMLElement, line: HTMLElement) => {
  //计算两个圆的中心坐标
  const rect1 = circle1.getBoundingClientRect();
  const rect2 = circle2.getBoundingClientRect();

  const x1 = rect1.width / 2;
  const y1 = rect1.height / 2;
  const x2 = rect2.left + rect2.width / 2 - rect1.left;
  const y2 = rect2.top + rect2.height / 2 - rect1.top;

  //计算线条的长度和角度
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) - circle2.offsetHeight / 2;
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  if (length > 5) {
    circle2.style.borderColor = "var(--red)";
    circle2.style.boxShadow =
      "0 0 0.625rem var(--red), 0 0 0.625rem var(--red) inset, 0 0 0.9375rem var(--red)";
    line.style.display = "block";
  } else {
    circle2.style.borderColor = "var(--white-50)";
    circle2.style.boxShadow = "initial";
    line.style.display = "none";
  }

  //设置线条的位置和角度
  setTimeout(() => {
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.top = `${y1}px`;
    line.style.left = `${x1}px`;
  });
};
