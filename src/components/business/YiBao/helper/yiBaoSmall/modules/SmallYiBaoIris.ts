import { useMouseTrackingEffect } from "../../../hooks/useMouseTrackingEffect";

/** @description 虹膜类 */
class SmallYiBaoIris {
  /** 左虹膜DOM */
  private left_iris_dom!: HTMLElement;
  /** 右虹膜DOM */
  private right_iris_dom!: HTMLElement;
  /** 左虹膜跟随鼠标函数 */
  private leftIrisFollowMouse!: {
    enableMouseTrackingEffect(): void;
    disableMouseTrackingEffect(): void;
  };
  /** 右虹膜跟随鼠标函数 */
  private rightIrisFollowMouse!: {
    enableMouseTrackingEffect(): void;
    disableMouseTrackingEffect(): void;
  };

  constructor() {}

  /** @description 跟随鼠标 */
  private followMouse() {
    this.leftIrisFollowMouse = useMouseTrackingEffect(this.left_iris_dom, 100, (el, x, y) => {
      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    this.rightIrisFollowMouse = useMouseTrackingEffect(this.right_iris_dom, 100, (el, x, y) => {
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /** @description 初始化DOM
   * @param left_iris_dom 左虹膜DOM
   * @param right_iris_dom 右虹膜DOM
   */
  init(left_iris_dom: HTMLElement, right_iris_dom: HTMLElement) {
    this.left_iris_dom = left_iris_dom;
    this.right_iris_dom = right_iris_dom;

    this.followMouse();
  }

  /** @description 惊恐 */
  scary() {
    this.left_iris_dom.style.top = "10%";
    this.right_iris_dom.style.top = "10%";
    this.left_iris_dom.style.width = "40%";
    this.right_iris_dom.style.width = "40%";
  }

  /** @description 控制跟随鼠标
   * @param status 是否跟随鼠标
   */
  toggleFollowMouse(status: boolean) {
    return new Promise<void>((resolve) => {
      if (status) {
        this.leftIrisFollowMouse.enableMouseTrackingEffect();
        this.rightIrisFollowMouse.enableMouseTrackingEffect();
      } else {
        this.leftIrisFollowMouse.disableMouseTrackingEffect();
        this.rightIrisFollowMouse.disableMouseTrackingEffect();
      }

      setTimeout(resolve);
    });
  }

  /** @description 重置样式 */
  resetStyle() {
    this.left_iris_dom.style.cssText = "";
    this.right_iris_dom.style.cssText = "";
  }
}

const smallYiBaoIris = new SmallYiBaoIris();

export { smallYiBaoIris };
