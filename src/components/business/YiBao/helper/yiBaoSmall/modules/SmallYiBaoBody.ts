import { useMouseTrackingEffect } from "../../../hooks/useMouseTrackingEffect";

import { _adjustCoordinates, _getCoordsAngle, _getCoordsDistance } from "@/utils/tool";

/** @description 身体类 */
class SmallYiBaoBody {
  /** 跳跃动画函数 */
  private jumpAnimation!: Animation;
  /** 身体跟随鼠标函数 */
  private bodyFollowMouse!: {
    enableMouseTrackingEffect(): void;
    disableMouseTrackingEffect(): void;
  };
  /** 用于移动的容器DOM */
  body_move_box_dom!: HTMLElement;
  /** 用于转弯的容器DOM */
  body_rotate_box_dom!: HTMLElement;
  /** 身体DOM */
  body_dom!: HTMLElement;
  /** 是否处于跟随移动鼠标 */
  body_move_status = false;
  /** 当前鼠标位置 */
  mouse_coord: { x: number; y: number } = { x: 0, y: 0 };
  /** 当前乂宝位置 */
  body_coord: { x: number; y: number } = { x: 0, y: 0 };
  /** 跳跃时触发的函数 */
  jump_callback: () => void = () => {};

  constructor() {}

  /** @description 跟随鼠标 */
  private initFollowMouse() {
    this.bodyFollowMouse = useMouseTrackingEffect(this.body_dom, 75, (el, angleX, angleY) => {
      el.style.transform = `rotateX(${-angleY}deg) rotateY(${angleX}deg)`;
    });
  }

  /** @description 初始化DOM
   * @param moveDom 用于移动的容器DOM
   * @param dom 用于转弯的容器DOM
   * @param dom 身体DOM
   */
  init(body: HTMLElement, moveDom: HTMLElement, rotateDom: HTMLElement) {
    this.body_dom = body;
    this.body_move_box_dom = moveDom;
    this.body_rotate_box_dom = rotateDom;

    moveDom.style.left = "-25vw";

    this.initFollowMouse();

    window.addEventListener("mousemove", (e) => {
      this.mouse_coord = {
        x: e.clientX,
        y: e.clientY,
      };

      const coord = this.body_dom.getBoundingClientRect();

      const yibao_coord = {
        x: coord.left + coord.width / 2,
        y: coord.top + coord.height / 2,
      };

      const rotate = _getCoordsAngle(yibao_coord, this.mouse_coord);
      this.body_rotate_box_dom.style.transform = `rotateX(-90deg) rotateY(${rotate}deg)`;

      if (_getCoordsDistance(yibao_coord, this.mouse_coord) > 500) {
        if (this.body_move_status === true) return;
        this.body_move_status = true;
        this.jumpOnce();
      } else {
        if (!this.body_move_status) return;
        this.body_move_status = false;
      }
    });
  }

  /** @description 控制跟随鼠标
   * @param status 是否跟随鼠标
   */
  toggleFollowMouse(status: boolean) {
    return new Promise<void>((resolve) => {
      if (status) {
        this.bodyFollowMouse.enableMouseTrackingEffect();
      } else {
        this.bodyFollowMouse.disableMouseTrackingEffect();
      }

      setTimeout(resolve);
    });
  }

  /** @description 移动一段距离 */
  moveFollowMouse() {
    this.body_coord = _adjustCoordinates(this.body_coord, this.mouse_coord, 500, 20, () => {
      this.body_move_status = false;
    });
    this.body_move_box_dom.style.left = `${this.body_coord.x}px`;
    this.body_move_box_dom.style.top = `${this.body_coord.y}px`;
  }

  /** @description 跳跃一次 */
  jumpOnce() {
    const _this = this;
    this.jumpAnimation?.cancel();
    if (!this.body_move_status) return;

    setTimeout(() => {
      this.moveFollowMouse();
    }, 150);

    this.jumpAnimation = this.body_dom.animate(
      [
        {},
        { transformOrigin: "bottom center", transform: "scaleY(0.5)" },
        { transformOrigin: "bottom center", transform: "scaleY(0.75)" },
        { transformOrigin: "bottom center", transform: "translateY(-3.125rem) scaleY(1.15)" },
        { transformOrigin: "bottom center" },
      ],
      {
        duration: 500,
      },
    );

    this.jumpAnimation.onfinish = function () {
      this.cancel();
      if (!_this.body_move_status) return;
      _this.jumpOnce();
      _this.jump_callback();
    };
  }

  /** @description 设置跳跃触发的函数 */
  setJumpCallback(callback: () => void) {
    this.jump_callback = callback;
  }

  /** @description 重置样式 */
  resetStyle() {
    this.body_dom.style.cssText = "";
  }
}

const smallYiBaoBody = new SmallYiBaoBody();

export { smallYiBaoBody };
