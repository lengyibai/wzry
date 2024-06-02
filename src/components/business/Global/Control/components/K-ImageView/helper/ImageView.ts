import { _promiseTimeout } from "@/utils/tool";

/** @description FLIP查看图片 */
export class ScaleFLIPImage {
  private src: string;
  private blur: string;
  private scale: number;
  private x: number;
  private y: number;
  private parent!: HTMLElement;
  private overlay!: HTMLElement;
  private img!: HTMLImageElement;
  private isDragging!: boolean;
  private startX!: number;
  private startY!: number;
  private imgLoadCallback;

  constructor(
    parent: HTMLElement | undefined,
    main: HTMLElement,
    src: string,
    blur: string,
    imgLoadCallback: () => void,
  ) {
    this.parent = parent || document.body;
    this.overlay = main;
    this.src = src;
    this.blur = blur;
    this.scale = 1;
    this.x = 0;
    this.y = 0;
    this.imgLoadCallback = imgLoadCallback;

    this.createImage();
  }

  /* 创建图片 */
  private async createImage() {
    await _promiseTimeout();
    this.img = document.createElement("img");
    this.img.style.height = this.parent.offsetHeight + "px";
    this.img.style.position = "absolute";
    this.img.style.transition = "0.5s";
    this.img.style.opacity = "0";
    this.img.style.filter = "blur(var(--blur-image-load))";
    this.img.style.transformOrigin = "left top";
    this.img.style.left = this.parent.getBoundingClientRect().left + "px";
    this.img.style.top = this.parent.getBoundingClientRect().top + "px";
    this.img.src = this.blur;
    this.overlay.appendChild(this.img);

    await _promiseTimeout(16.7);
    if (window.innerWidth > window.innerHeight) {
      this.img.style.height = `75%`;
    } else {
      this.img.style.width = `75%`;
      this.img.style.height = "";
    }

    this.img.style.left = `50%`;
    this.img.style.top = `50%`;
    this.img.style.opacity = "1";
    this.img.style.transformOrigin = "center center";
    this.img.style.transform = `translate(-50%,-50%) scale(${this.scale})`;

    await _promiseTimeout(750);
    this.img.style.transition = "initial";
    this.img.style.top = "initial";
    this.img.style.left = "initial";
    this.img.style.transform = `scale(${this.scale})`;

    await _promiseTimeout(16.7);
    this.img.style.transition = "0.5s";

    await _promiseTimeout();
    const coverImg = new Image();
    coverImg.src = this.src;

    coverImg.onload = () => {
      this.img.src = this.src;
      this.img.onload = () => {
        this.img.style.filter = "blur(0)";
        this.imgLoadCallback();

        setTimeout(() => {
          this.img.style.transition = "0.25s";
        }, 500);
      };
    };

    this.bindEvents();
  }

  /* 绑定事件 */
  private bindEvents() {
    this.overlay.addEventListener("wheel", (event) => {
      const relativeSpeed = Math.min(100, Math.max(Math.abs(event.deltaX), Math.abs(event.deltaY)));

      const scrollSpeed = relativeSpeed * 0.01;

      if (event.deltaY > 0) {
        this.scale /= 1 + scrollSpeed;
        if (this.scale < 0.25) this.scale = 0.25;
      } else {
        this.scale *= 1 + scrollSpeed;
        if (this.scale > 20) this.scale = 20;
      }
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    this.img.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      this.isDragging = true;
      this.img.style.transition = "all 0s";

      if (event instanceof MouseEvent) {
        this.startX = event.clientX;
        this.startY = event.clientY;
      } else if (event instanceof TouchEvent) {
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
      }
    };
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if (!this.isDragging) return;

      let deltaX = 0;
      let deltaY = 0;

      if (event instanceof MouseEvent) {
        deltaX = event.clientX - this.startX;
        deltaY = event.clientY - this.startY;
        this.startX = event.clientX;
        this.startY = event.clientY;
      } else if (event instanceof TouchEvent) {
        deltaX = event.changedTouches[0].clientX - this.startX;
        deltaY = event.changedTouches[0].clientY - this.startY;
        this.startX = event.changedTouches[0].clientX;
        this.startY = event.changedTouches[0].clientY;
      }

      this.x += deltaX / this.scale;
      this.y += deltaY / this.scale;
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    };
    const handleMouseUp = () => {
      this.isDragging = false;
      this.img.style.transition = "all 0.25s";
    };

    this.overlay.addEventListener("mousedown", handleMouseDown);
    this.overlay.addEventListener("mousemove", handleMouseMove);
    this.overlay.addEventListener("mouseup", handleMouseUp);
    this.overlay.addEventListener("touchstart", handleMouseDown);
    this.overlay.addEventListener("touchmove", handleMouseMove);
    this.overlay.addEventListener("touchend", handleMouseUp);
  }

  /** @description 放大 */
  zoomIn() {
    this.scale *= 2;
    this.scale = Math.min(this.scale, 20);
    this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
  }

  /** @description 缩小 */
  zoomOut() {
    this.scale /= 2;
    this.scale = Math.max(this.scale, 0.25);
    this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
  }

  /** @description 销毁 */
  destruction() {
    this.img.remove();
    this.imgLoadCallback = () => {};
  }
}
