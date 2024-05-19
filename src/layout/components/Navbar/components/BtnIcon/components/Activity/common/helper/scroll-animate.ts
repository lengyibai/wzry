type AnimationFunction = (
  /** 滚动动画开始的位置，默认为滚动区域顶部到达可视区顶部时开始 */
  scrollStart: number,
  /** 滚动动画结束的位置，默认为滚动区域顶部到达可视区时开始 */
  scrollEnd: number,
) => Record<string, (scroll: number) => string | number>;

class ScrollAnimate {
  /** 动画数组 */
  private animationStyle: [HTMLElement, AnimationFunction][] = [];
  /** 动画元素组 */
  private animationMap = new Map();
  /** 负责滚动的容器 */
  private scrollBox: HTMLElement;
  /** 滚动整体元素 */
  private playground: HTMLElement;

  constructor(scrollBox: HTMLElement, playground: HTMLElement) {
    this.scrollBox = scrollBox;
    this.playground = playground;

    scrollBox.addEventListener("scroll", (e: Event) => {
      const el = e.target as HTMLElement;
      this.updateStyle(el.scrollTop);
    });
  }

  /**
   * 创建动画参数，根据滚动开始位置、结束位置以及值的开始、结束位置，计算出当前滚动位置对应的值。
   * @param scrollStart 滚动开始位置
   * @param scrollEnd 滚动结束位置
   * @param valueStart 值的开始位置
   * @param valueEnd 值的结束位置
   */
  createAnimation(scrollStart: number, scrollEnd: number, valueStart: number, valueEnd: number) {
    // 用于计算当前滚动范围对应的值
    return (scroll: number) => {
      // 如果滚动位置小于等于开始位置，返回值的开始位置
      if (scroll <= scrollStart) return valueStart;
      // 如果滚动位置大于等于结束位置，返回值的结束位置
      if (scroll >= scrollEnd) return valueEnd;

      // 计算当前滚动位置对应的值，并确保结果为6位小数
      const value =
        valueStart + ((valueEnd - valueStart) * (scroll - scrollStart)) / (scrollEnd - scrollStart);
      return Number(value.toFixed(6));
    };
  }

  /** @description 添加要执行的元素动画 */
  addAnimationStyle(dom: HTMLElement, animation: AnimationFunction) {
    this.animationStyle.push([dom, animation]);
  }

  /** @description 更新元素初始位置 */
  updateMap() {
    // 清除当前的动画映射
    this.animationMap.clear();
    // 获取滚动主体的可视区距离，并计算滚动开始和结束的位置
    const playgroundRect = this.playground.getBoundingClientRect();
    const scrollStart = playgroundRect.top + window.scrollY;
    const scrollEnd = playgroundRect.bottom + window.scrollY - window.innerHeight;

    // 遍历动画样式映射，为每个DOM元素计算新的动画状态并更新到动画映射中
    for (const [dom, fn] of this.animationStyle) {
      this.animationMap.set(dom, fn(scrollStart, scrollEnd));
    }

    // 更新滚动容器的样式，以反映当前的滚动位置
    this.updateStyle(this.scrollBox.scrollTop);
  }

  /** @description 滚动实时更新样式 */
  private updateStyle(scroll: number) {
    for (const [dom, value] of this.animationMap) {
      for (const cssProp in value) {
        dom.style[cssProp] = value[cssProp](scroll);
      }
    }
  }
}

export { ScrollAnimate };
