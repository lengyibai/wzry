import { useMouseTrackingEffect } from "../../../hooks/useMouseTrackingEffect";

/** @description 虹膜类 */
class BigYiBaoIris {
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
    this.leftIrisFollowMouse = useMouseTrackingEffect(this.left_iris_dom, 20, (el, x, y) => {
      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    this.rightIrisFollowMouse = useMouseTrackingEffect(this.right_iris_dom, 20, (el, x, y) => {
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
    this.enableFollowMouse();
  }

  /** @description 惊恐 */
  scary() {
    this.left_iris_dom.style.width = "40%";
    this.right_iris_dom.style.width = "40%";
  }

  /** @description 开启跟随鼠标 */
  enableFollowMouse() {
    this.leftIrisFollowMouse.enableMouseTrackingEffect();
    this.rightIrisFollowMouse.enableMouseTrackingEffect();
  }

  /** @description 禁用跟随鼠标 */
  disableFollowMouse() {
    this.leftIrisFollowMouse.disableMouseTrackingEffect();
    this.rightIrisFollowMouse.disableMouseTrackingEffect();
  }

  /** @description 重置样式 */
  resetStyle() {
    this.left_iris_dom.style.cssText = "";
    this.right_iris_dom.style.cssText = "";
  }
}

const bigYiBaoIris = new BigYiBaoIris();

export { bigYiBaoIris };
