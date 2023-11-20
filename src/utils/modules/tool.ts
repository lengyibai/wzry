import { CONFIG } from "@/config";

/** @description 随机数 */
export const random = (min: number, max: number, num = 0) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(num));
};

/** @description 小数百分比互转 */
export const potEoPct = (str: string | number, ret = 4) => {
  if (typeof str === "string") {
    return Number(str.replace("%", "")) / 100;
  }
  return Number((str * 100).toFixed(ret));
};

/** @description 根据时间段问候 */
export const timeGreet = (greet: Record<string, string> = {}) => {
  const {
    a = "午夜好",
    b = "早上好",
    c = "上午好",
    d = "中午好",
    e = "下午好",
    f = "晚上好",
  } = greet;
  const now = new Date().getHours();
  return now < 4 ? a : now < 10 ? b : now < 12 ? c : now < 14 ? d : now < 18 ? e : f;
};

/** @description requestAnimationFrame计时器 */
export const frameInterval = (fn: () => void, fre = 0) => {
  let time = 0;
  f();
  function f() {
    time += 10;
    if (time > fre) {
      fn();
      time = 0;
    }
    requestAnimationFrame(f);
  }
};

/** @description 判断是否为数组 */
export const isArray = (type: any) => Object.prototype.toString.call(type) === "[object Array]";

/** @description 中文转拼音 */
export const pinyin = (str: string) => {
  if (typeof str !== "string") return str;
  let result = "";
  let abbreviation = "";
  const reg = /[a-zA-Z0-9]/;
  for (const val of str) {
    let name = "";
    for (const key in CONFIG.PINYIN) {
      if (CONFIG.PINYIN[key].includes(val)) {
        name = key;
        abbreviation += name[0].toLowerCase();
        break;
      }
    }
    result += reg.test(val) ? val : name;
  }
  return [result.toLowerCase(), abbreviation];
};

/** @description 正则搜索 */
export const search = <T>(
  data: T[],
  value: string | string[],
  keys: string | string[],
  highlight = false,
): T[] => {
  const arr: T[] = [];
  const fn = (item: any, key: string): void | undefined => {
    const reg = new RegExp(item.toString().toLowerCase(), "i");
    arr.push(
      ...data.filter((item: any) => {
        item[key] = item[key].toString();
        const pin_yin: string[] = pinyin(item[key]);
        if (pin_yin.some((py) => reg.test(py) || reg.test(item[key]))) {
          if (highlight) {
            item[key] = item[key].replace(
              reg,
              (match: string) => `<i style="color:var(--blue)">${match}</i>`,
            );
          }
          return true;
        }
      }),
    );
  };

  if (Array.isArray(keys)) {
    keys.forEach((key: string) => fn(value || "", key));
  } else if (Array.isArray(value)) {
    value.forEach((val: any) => {
      if (Array.isArray(keys)) {
        keys.forEach((key: string) => fn(val || "", key));
      } else {
        fn(val || "", keys);
      }
    });
  } else {
    fn(value || "", keys);
  }

  return arr;
};

/** @description 获取浏览器版本 */
export const browserV = (() => {
  const ua = navigator.userAgent;
  let browser = "";
  let version = 0;
  if (ua.indexOf("Chrome") > -1) {
    browser = "chrome";
    version = Number(
      ua
        .match(/Chrome\/[\d.]+/)![0]
        .split("/")[1]
        .split(".")[0],
    );
  } else if (ua.indexOf("Safari") > -1) {
    browser = "safari";
    version = Number(
      ua
        .match(/Version\/[\d.]+/)![0]
        .split("/")[1]
        .split(".")[0],
    );
  } else if (ua.indexOf("Firefox") > -1) {
    browser = "firefox";
    version = Number(
      ua
        .match(/Firefox\/[\d.]+/)![0]
        .split("/")[1]
        .split(".")[0],
    );
  }
  return { browser, version };
})();

/** @description 排序 */
export const typeSort = <T>(data: any[], key: string, rev = true): T[] => {
  const num = typeof key == "boolean" ? (key ? 1 : -1) : rev ? 1 : -1;
  return data.sort(((a: any, b: any) => {
    if (typeof data[0] == "object") {
      if (typeof a[key] == "number") {
        return (a[key] - b[key]) * num;
      }
      if (typeof a[key] == "string") {
        return a[key].toString().localeCompare(b[key].toString()) * num;
      }
    }

    if (typeof a == "number") {
      return (a - b) * num;
    }

    if (typeof a == "string") {
      return a.toString().localeCompare(b.toString()) * num;
    }
  }) as () => any);
};

/** @description 保存为文件 */
export const savefiles = (data: any, name: string): void => {
  const urlObject = window.URL || window.webkitURL || window;
  const export_blob = new Blob([data]);
  const save_link = document.createElementNS(
    "http://www.w3.org/1999/xhtml",
    "a",
  ) as HTMLAnchorElement;
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  save_link.click();
};

type ImageOptimizerOptions = {
  el?: HTMLInputElement;
  file?: File;
  width?: number;
  ratio?: number;
  maxsize?: number;
  success: (data: FormData, file: File, url: string) => void;
  fail?: (error: ErrorEvent) => void;
};
/** @description 图片压缩 */
export const imageOptimizer = (obj: ImageOptimizerOptions) => {
  const canvas = document.createElement("canvas");
  canvas.classList.add("imageOptimizer");
  document.body.appendChild(canvas);

  const files = obj.el?.files?.[0] || obj.file;
  if (!files) return;

  const name = files.name;
  const ratio = obj.ratio || 1;
  const maxsize = obj.maxsize || 1024;
  const width = obj.width || 10000;

  function dataURLtoFile(dataURL: string, filename: string) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }

  function formData(file: File) {
    const data = new FormData();
    data.append("file", file);
    return data;
  }

  const reader = new FileReader();
  reader.readAsDataURL(files);

  reader.onload = (e: any) => {
    const result = e.target.result as string;

    if (e.total / 1024 > maxsize) {
      const image = new Image();
      image.src = result;
      image.onload = () => {
        const context = canvas.getContext("2d");
        const scale = width / image.width;

        if (scale < 1) {
          canvas.width = image.width * scale;
          canvas.height = image.height * scale;
          context!.drawImage(image, 0, 0, image.width * scale, image.height * scale);
        } else {
          canvas.width = image.width;
          canvas.height = image.height;
          context!.drawImage(image, 0, 0, image.width, image.height);
        }

        const dataUrl = canvas.toDataURL("image/jpeg", ratio);
        const file = dataURLtoFile(dataUrl, name);
        obj.success(formData(file), file, dataUrl);
        canvas.remove();
      };
      image.onerror = obj.fail as any;
    } else {
      const file = dataURLtoFile(result, name);
      obj.success(formData(file), file, result);
      canvas.remove();
    }
  };
  reader.onerror = obj.fail as any;
};

/** @description Promise定时器 */
export const promiseTimeout = (fn: () => void, delay: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, delay);
  });
};

/** @description 判断是否为移动端 */
export const isPhone = (() => /mobile/i.test(navigator.userAgent))();

/** @description 判断表单指定属性名是否为空 */
export const existEmpty = (obj: Record<string, any>, arr: string[] = []) =>
  (arr.length > 0 ? arr : Object.keys(obj)).filter((key) => obj[key] === "").length > 0
    ? (arr.length > 0 ? arr : Object.keys(obj)).filter((key) => obj[key] === "")
    : false;

/** @description 节流(立即执行) */
export const throttleInstant = (() => {
  let last = 0;
  return (callback: () => void, wait = 800) => {
    const now = +new Date();
    if (now - last > wait) {
      callback();
      last = now;
    }
  };
})();

/** @description 防抖立即执行 */
export const debounceInstant = (() => {
  let timer: NodeJS.Timeout | undefined;
  return <T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
    ...args: Parameters<T>
  ): void => {
    if (timer) clearTimeout(timer);
    const callNow = !timer;
    timer = setTimeout(() => {
      timer = undefined;
    }, delay);
    //eslint-disable-next-line prefer-spread
    if (callNow) fn.apply(undefined, args);
  };
})();

/** @description 视差动画 */
export class Parallax {
  fn: (x: number, y: number) => void = () => {};

  constructor(fn: (x: number, y: number) => void) {
    this.fn = fn;
  }

  move(e: MouseEvent | Touch): void {
    const { innerWidth: w, innerHeight: h } = window;
    const x = Number(((e.pageX - w / 2) / (w / 2)).toFixed(2));
    const y = Number(((e.pageY - h / 2) / (h / 2)).toFixed(2));

    this.fn(x, y);
  }
}

/** @description 查看图片 */
export class ScaleImage {
  src: string;
  blur: string;
  scale: number;
  x: number;
  y: number;
  overlay!: HTMLElement;
  zoomInButton!: HTMLElement;
  zoomOutButton!: HTMLElement;
  closeButton!: HTMLElement;
  img!: HTMLImageElement;
  isDragging!: boolean;
  startX!: number;
  startY!: number;

  constructor(src: string, blur: string) {
    this.src = src;
    this.blur = blur;
    this.scale = 1;
    this.x = 0;
    this.y = 0;

    this.createOverlay();
    this.creatButton();
    this.createImage();
    this.bindEvents();
  }

  /* 创建容器 */
  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s;
      z-index: var(--z-index-view-img);
      opacity: 0;
    `;
    document.body.appendChild(this.overlay);

    setTimeout(() => {
      this.overlay.style.opacity = "1";
    });
  }

  /* 创建图片 */
  createImage() {
    this.img = document.createElement("img");
    this.img.style.cssText = `
      width: 50%;
      transform: scale(${this.scale});
      transition: all 0.25s;
      background-color: #1a1a1a;
      filter: blur(var(--image-load-blur));
    `;
    this.img.src = this.blur;
    this.overlay.appendChild(this.img);

    this.img.onload = () => {
      const coverImg = new Image();
      coverImg.src = this.src;

      coverImg.onload = () => {
        this.img.src = this.src;

        this.img.onload = () => {
          this.img.style.filter = "blur(0)";
        };
      };
    };
  }

  /* 创建按钮 */
  creatButton() {
    const button_style = `
    position: absolute;
    font-size: 3.125rem;
    color: #fff;
    z-index: 1;
    `;

    //关闭按钮
    this.closeButton = document.createElement("button");
    this.closeButton.style.cssText = button_style;
    this.closeButton.className += "global_cursor-pointer iconfont wzry-guanbi";
    this.closeButton.style.top = "0";
    this.closeButton.style.right = "0";
    this.closeButton.style.transform = "translate(-100%, 100%) scale(0.75)";

    //放大按钮
    this.zoomInButton = document.createElement("button");
    this.zoomInButton.style.cssText = button_style;
    this.zoomInButton.className += "global_cursor-pointer iconfont wzry-fangda";
    this.zoomInButton.style.bottom = "0";
    this.zoomInButton.style.left = "50%";
    this.zoomInButton.style.transform = "translate(-150%, -100%)";

    //缩小按钮
    this.zoomOutButton = document.createElement("button");
    this.zoomOutButton.style.cssText = button_style;
    this.zoomOutButton.className += "global_cursor-pointer iconfont wzry-suoxiao";
    this.zoomOutButton.style.bottom = "0";
    this.zoomOutButton.style.left = "50%";
    this.zoomOutButton.style.transform = "translate(50%, -100%)";

    this.overlay.appendChild(this.closeButton);
    this.overlay.appendChild(this.zoomInButton);
    this.overlay.appendChild(this.zoomOutButton);
  }

  /* 绑定事件 */
  bindEvents() {
    this.overlay.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        this.scale /= 1.25;
        if (this.scale < 0.25) this.scale = 0.25;
      } else {
        this.scale *= 1.25;
        if (this.scale > 20) this.scale = 20;
      }
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    this.img.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    /* 拖动 */
    document.addEventListener("mousedown", (event) => {
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.isDragging = true;
      this.img.style.transition = "all 0s";
    });
    document.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.img.style.transition = "all 0.25s";
    });
    document.addEventListener("mousemove", (event) => {
      if (!this.isDragging) return;
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.x += deltaX / this.scale;
      this.y += deltaY / this.scale;
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    /* 兼容移动端 */
    document.addEventListener("touchstart", (event) => {
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
      this.isDragging = true;
      this.img.style.transition = "all 0s";
    });
    document.addEventListener("touchend", () => {
      this.isDragging = false;
      this.img.style.transition = "all 0.25s";
    });
    document.addEventListener("touchmove", (event) => {
      if (!this.isDragging) return;
      const deltaX = event.changedTouches[0].clientX - this.startX;
      const deltaY = event.changedTouches[0].clientY - this.startY;
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
      this.x += deltaX / this.scale;
      this.y += deltaY / this.scale;
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    this.closeButton.addEventListener("click", () => {
      this.overlay.style.opacity = "0";
      setTimeout(() => {
        this.overlay.remove();
      }, 250);
    });

    /* 缩放 */
    const fn1 = () => {
      this.scale *= 2;
      this.scale = Math.min(this.scale, 20);
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    };
    const fn2 = () => {
      this.scale /= 2;
      this.scale = Math.max(this.scale, 0.25);
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    };
    this.zoomInButton.addEventListener("mouseup", fn1);
    this.zoomInButton.addEventListener("touchend", fn1);
    this.zoomOutButton.addEventListener("mouseup", fn2);
    this.zoomOutButton.addEventListener("touchend", fn2);
  }
}

/** @description FLIP查看图片 */
export class ScaleFLIPImage {
  src: string;
  blur: string;
  scale: number;
  x: number;
  y: number;
  parent!: HTMLElement;
  overlay!: HTMLElement;
  zoomInButton!: HTMLElement;
  zoomOutButton!: HTMLElement;
  closeButton!: HTMLElement;
  img!: HTMLImageElement;
  isDragging!: boolean;
  startX!: number;
  startY!: number;

  constructor(e: Event, src: string, blur: string) {
    this.parent = e.target as HTMLElement;
    this.src = src;
    this.blur = blur;
    this.scale = 1;
    this.x = 0;
    this.y = 0;

    this.createOverlay();
    this.creatButton();
    this.createImage();
  }

  /* 创建容器 */
  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s;
      z-index: var(--z-index-view-img);
      opacity: 0;
    `;
    document.body.appendChild(this.overlay);

    setTimeout(() => {
      this.overlay.style.opacity = "1";
    });
  }

  /* 创建图片 */
  createImage() {
    setTimeout(() => {
      this.img = document.createElement("img");
      this.img.style.width = "75%";
      this.img.style.maxWidth = this.parent.offsetWidth + "px";
      this.img.style.position = "absolute";
      this.img.style.transition = "0.5s";
      this.img.style.opacity = "0";
      this.img.style.filter = "blur(var(--image-load-blur))";
      this.img.style.transformOrigin = "left top";
      this.img.style.left = this.parent.getBoundingClientRect().left + "px";
      this.img.style.top = this.parent.getBoundingClientRect().top + "px";

      this.img.src = this.blur;
      this.overlay.appendChild(this.img);

      this.img.onload = () => {
        const coverImg = new Image();
        coverImg.src = this.src;

        coverImg.onload = () => {
          this.img.src = this.src;

          this.img.onload = () => {
            this.img.style.filter = "blur(0)";
          };
        };
        this.bindEvents();
      };
    }, 1);

    setTimeout(() => {
      this.img.style.maxWidth = "75%";
      this.img.style.left = `50%`;
      this.img.style.top = `50%`;
      this.img.style.opacity = "1";
      this.img.style.transformOrigin = "center center";
      this.img.style.transform = `translate(-50%,-50%) scale(${this.scale})`;
      this.img.style.backgroundColor = "#1a1a1a";
      setTimeout(() => {
        this.img.style.transition = "initial";
        this.img.style.top = "initial";
        this.img.style.left = "initial";
        this.img.style.transform = `scale(${this.scale})`;
        setTimeout(() => {
          this.img.style.transition = "0.25s";
        }, 16.7);
      }, 500);
    }, 100);
  }

  /* 创建按钮 */
  creatButton() {
    const button_style = `
    position: absolute;
    font-size: 3.125rem;
    color: #fff;
    z-index: 1;
    `;

    //关闭按钮
    this.closeButton = document.createElement("button");
    this.closeButton.style.cssText = button_style;
    this.closeButton.className += "global_cursor-pointer iconfont wzry-guanbi";
    this.closeButton.style.top = "0";
    this.closeButton.style.right = "0";
    this.closeButton.style.transform = "translate(-100%, 100%) scale(0.75)";

    //放大按钮
    this.zoomInButton = document.createElement("button");
    this.zoomInButton.style.cssText = button_style;
    this.zoomInButton.className += "global_cursor-pointer iconfont wzry-fangda";
    this.zoomInButton.style.bottom = "0";
    this.zoomInButton.style.left = "50%";
    this.zoomInButton.style.transform = "translate(-150%, -100%)";

    //缩小按钮
    this.zoomOutButton = document.createElement("button");
    this.zoomOutButton.style.cssText = button_style;
    this.zoomOutButton.className += "global_cursor-pointer iconfont wzry-suoxiao";
    this.zoomOutButton.style.bottom = "0";
    this.zoomOutButton.style.left = "50%";
    this.zoomOutButton.style.transform = "translate(50%, -100%)";

    this.overlay.appendChild(this.closeButton);
    this.overlay.appendChild(this.zoomInButton);
    this.overlay.appendChild(this.zoomOutButton);
  }

  /* 绑定事件 */
  bindEvents() {
    this.overlay.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        this.scale /= 1.25;
        if (this.scale < 0.25) this.scale = 0.25;
      } else {
        this.scale *= 1.25;
        if (this.scale > 20) this.scale = 20;
      }
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    this.img.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    /* 拖动 */
    document.addEventListener("mousedown", (event) => {
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.isDragging = true;
      this.img.style.transition = "all 0s";
    });
    document.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.img.style.transition = "all 0.25s";
    });
    document.addEventListener("mousemove", (event) => {
      if (!this.isDragging) return;
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.x += deltaX / this.scale;
      this.y += deltaY / this.scale;
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    /* 兼容移动端 */
    document.addEventListener("touchstart", (event) => {
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
      this.isDragging = true;
      this.img.style.transition = "all 0s";
    });
    document.addEventListener("touchend", () => {
      this.isDragging = false;
      this.img.style.transition = "all 0.25s";
    });
    document.addEventListener("touchmove", (event) => {
      if (!this.isDragging) return;
      const deltaX = event.changedTouches[0].clientX - this.startX;
      const deltaY = event.changedTouches[0].clientY - this.startY;
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
      this.x += deltaX / this.scale;
      this.y += deltaY / this.scale;
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    this.closeButton.addEventListener("click", () => {
      this.overlay.style.opacity = "0";
      setTimeout(() => {
        this.overlay.remove();
      }, 250);
    });

    /* 缩放 */
    const fn1 = () => {
      setTimeout(() => {
        this.scale *= 2;
        this.scale = Math.min(this.scale, 20);
        this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
      });
    };
    const fn2 = () => {
      setTimeout(() => {
        this.scale /= 2;
        this.scale = Math.max(this.scale, 0.25);
        this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
      });
    };
    this.zoomInButton.addEventListener("mouseup", fn1);
    this.zoomInButton.addEventListener("touchend", fn1);
    this.zoomOutButton.addEventListener("mouseup", fn2);
    this.zoomOutButton.addEventListener("touchend", fn2);
  }
}

/** @description 音频可视化 */
export class AudioVisual {
  audio: HTMLMediaElement;
  cvs: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  animationFrameId!: number;
  isInit = false;
  dataArray: string | any[] | Uint8Array = [];
  analyser!: AnalyserNode;
  constructor(audio: HTMLAudioElement, canvas: HTMLCanvasElement) {
    this.audio = audio;
    this.cvs = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.init();
  }

  /** 初始化画布 */
  init() {
    this.cvs.width = this.cvs.offsetWidth * devicePixelRatio;
    this.cvs.height = this.cvs.offsetHeight * devicePixelRatio;
    this.draw();
  }
  /** 播放音频 */
  play() {
    //判断是否初始化
    if (this.isInit) {
      return;
    }

    //开始初始化
    //创建音频上下文
    const audioCtx = new AudioContext();
    //创建音频源节点
    const source = audioCtx.createMediaElementSource(this.audio);
    //创建分析器节点
    this.analyser = audioCtx.createAnalyser();
    this.analyser.fftSize = 512;
    //接收分析器节点的分析数据
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    source.connect(this.analyser);
    this.analyser.connect(audioCtx.destination);
    //已初始化
    this.isInit = true;
  }

  /** 把分析出来的波形绘制到canvas上 */
  draw() {
    const draw = () => {
      //逐帧绘制
      this.animationFrameId = requestAnimationFrame(draw);

      //接下来清空画布
      const { width, height } = this.cvs;
      this.ctx.clearRect(0, 0, width, height);
      if (!this.isInit) {
        return;
      }
      //让分析器节点分析出数据到数组中
      this.analyser.getByteFrequencyData(this.dataArray as Uint8Array);
      /** 条的数量 */
      const len = this.dataArray.length;
      const barWidth = width / len; //条的宽度
      this.ctx.fillStyle = "#72b0d540";
      //循环绘制
      for (let i = 0; i < len; i++) {
        const data = this.dataArray[i];
        const barHeight = (data / 255) * height; //条的高度
        const x1 = i * barWidth + width / 2; //右边区域中条的x坐标
        const x2 = width / 2 - (i + 1) * barWidth; //左边区域中条的x坐标 镜像
        const y = height - barHeight; //条的y坐标
        this.ctx.fillRect(x1, y, barWidth - 2, barHeight); //填充右边区域
        this.ctx.fillRect(x2, y, barWidth - 2, barHeight); //填充左边区域
      }
    };
    draw();
  }

  /** 销毁 */
  destroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}

/**
 * @description: 元素聚焦
 * @param el 需要进行聚焦的元素
 * @param status 聚焦状态
 */
export class FocusElement {
  el: HTMLElement;
  zIndex: string;
  outline: string;
  transition: string;

  constructor(el: HTMLElement) {
    this.el = el;
    this.zIndex = el.style.zIndex;
    this.outline = el.style.outline;
    this.transition = el.style.transition;
  }

  focus() {
    this.el.style.outline = "2000px solid rgba(0, 0, 0, 0)";
    this.el.style.zIndex = "9";
    setTimeout(() => {
      this.el.style.transition = "outline 0.5s";
      this.el.style.outline = "4000px solid rgba(0, 0, 0, 0.8)";
    }, 10);
  }

  blur() {
    this.el.style.outline = "2000px solid rgba(0, 0, 0, 0)";
    this.el.style.zIndex = this.zIndex;
    setTimeout(() => {
      this.el.style.outline = this.outline;
      this.el.style.transition = this.transition;
    }, 500);
  }
}

/** @description 计算文件大小 */
export const getFileSizeInKB = (file: any) => {
  const str = JSON.stringify(file, null, 2);
  const blob = new Blob([str]);
  const fileSizeInBytes = blob.size;
  const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
  return Number(fileSizeInKB);
};

/** @description 触底加载 */
export class LoadMore {
  /** 是否允许加载 */
  private allowLoad = true;
  /** 元素 */
  private readonly el: HTMLElement;
  /** 元素 */
  private readonly loadHeight: number;
  /** 回调函数 */
  private readonly load: () => void;
  /** 滚动回调 */
  private readonly scroll!: (v: number) => void;

  constructor(
    config: {
      parent: HTMLElement;
      loadHeight?: number;
    },
    callback: {
      load: () => void;
      scroll?: (v: number) => void;
    },
  ) {
    const { parent, loadHeight = 1 } = config;
    const { load, scroll } = callback;

    this.el = parent;
    this.loadHeight = loadHeight;
    this.load = load;
    scroll && (this.scroll = scroll);
    this.el.addEventListener("scroll", this.handleScroll.bind(this));

    //如果滚动高度小于等于容器高度，意味着无法滚动，则自动加载一页
    if (parent.scrollHeight <= parent.clientHeight) {
      this.load();
    }
  }

  private handleScroll() {
    const y = this.el.scrollTop;
    this.scroll && this.scroll(y);

    //就算距离底部的距离
    const d = this.el.scrollHeight - this.el.clientHeight - y;

    //注意：当所有数据加载完成，在进入加载高度时会持续触发，需要在加载更多方法里通过总页数>当前页数来进行限制触发
    if (d <= this.loadHeight && this.allowLoad) {
      this.load();
      this.allowLoad = false;
    } else {
      this.allowLoad = true;
    }
  }
}

/** @description 模糊加载大图 */
export class ImageLoader {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.watchLoad();
  }

  /** @description 监听图片加载 */
  private watchLoad() {
    const imgElement = Array.from(
      this.container.querySelectorAll("img[data-src]"),
    ) as HTMLImageElement[];

    imgElement.forEach((item) => {
      const coverImg = new Image();
      const coverUrl = item.dataset.src;

      if (!coverUrl) return;

      const finishLoadBlur = () => {
        coverImg.src = coverUrl;

        const finishLoadBig = () => {
          item.src = coverUrl;
          item.removeAttribute("data-src");
          item.onload = () => {
            item.classList.remove("blur");
          };
        };

        coverImg.onload = finishLoadBig;
      };

      item.onload = finishLoadBlur;
      item.onerror = finishLoadBlur;
    });
  }
}

/** @description 同步加载图片 */
export const preloadImages = async (images: string[]) => {
  for (let i = 0; i < images.length; i++) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.src = images[i];
      img.onload = () => {
        resolve();
      };
      img.onerror = () => {
        resolve();
      };
    });
  }
};

/** @description 数组乱序 */
export const shuffleArray = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/** @description 弹幕生成器 */
export class BarragesMove {
  /** 弹幕容器 */
  private parent: HTMLElement;
  /** 弹幕数据 */
  private data: Barrage[];
  /** 点击回调函数 */
  private clickCallback: (v: Barrage, e: MouseEvent) => void;
  /** 弹幕结束回调 */
  private endCallback: () => void;
  /** 初始化 */
  private init: () => void;
  /** 弹幕间隔的位置 */
  private gaps = ["0.25em", "1.5em", "3em", "4.5em", "6em", "7.5em", "9em"];
  /** 已经使用过的弹幕间隔位置数组 */
  private usedGaps: string[] = [];
  /** 是否启用生成弹幕 */
  private enable: boolean = true;
  /** 即将生成定时器 */
  private readyTimer: NodeJS.Timeout | undefined;
  /** 生成计时器 */
  private generateTimer: NodeJS.Timeout | undefined;
  /** 自定义弹幕定时器 */
  private customTimer: NodeJS.Timeout | undefined;

  constructor(
    parent: HTMLElement,
    data: Barrage[],
    event: {
      /** 点击弹幕回调 */
      click: (v: Barrage, e: MouseEvent) => void;
      /** 所有弹幕发射结束回调 */
      finish: () => void;
    },
  ) {
    this.parent = parent;
    this.data = data;
    this.clickCallback = event.click;
    this.endCallback = event.finish;

    this.init = () => {
      clearTimeout(this.generateTimer);
      clearTimeout(this.readyTimer);
      clearInterval(this.customTimer);

      //离开当前窗口停止生成
      if (document.visibilityState == "hidden") {
        this.enable = false;
        return;
      }

      this.createLybBarrage(`冷弋白：弹幕已装填完毕，剩余${this.data.length}条`);

      this.readyTimer = setTimeout(() => {
        this.enable = true;
        this.generateBarrage();
      }, 5000);

      this.customTimer = setInterval(() => {
        this.createLybBarrage(`冷弋白：还剩${this.data.length}条弹幕`);
      }, 20000);
    };
    window.addEventListener("visibilitychange", this.init);
    this.init();
  }

  /** @description 开启定时器生成弹幕 */
  private generateBarrage() {
    if (!this.enable) return;

    //如果原数组为空，停止递归调用
    if (this.data.length === 0) {
      this.endCallback();
      return;
    }

    if (this.data.length < 5) {
      this.createLybBarrage("冷弋白：弹幕即将耗尽，准备装填弹幕");
    }

    //一次生成的弹幕数量
    const count = random(1, 3);

    //从原数组中截取随机个数的元素作为要生成的弹幕数据
    const barrages = this.data.slice(0, count);

    //生成弹幕
    barrages.forEach((item: Barrage) => {
      this.createBarrage(item);
    });

    //更新原数组，去掉已经生成的弹幕数据
    this.data = this.data.slice(count);

    //生成下次发送弹幕的时间间隔
    const time = random(2, 4, 1) * 1000;

    this.generateTimer = setTimeout(() => {
      this.generateBarrage();
    }, time);
  }

  /** @description 创建弹幕 */
  private createBarrage(data: Barrage) {
    const barrage = document.createElement("div") as HTMLElement;

    //弹幕运动时长
    const move_time = 10 * (data.text.length / 10);

    //获取未使用的弹幕间隔位置
    let availableGaps = this.gaps.filter((gap) => !this.usedGaps.includes(gap));

    if (availableGaps.length === 0) {
      //如果没有可用的弹幕间隔位置了，重新清空usedGaps数组
      this.usedGaps = [];
      availableGaps = this.gaps;
    }

    //随机选择一个弹幕间隔位置的索引
    const gapIndex = random(0, availableGaps.length - 1);
    //获取选中的弹幕间隔位置
    const gap = availableGaps[gapIndex];
    //将选中的弹幕间隔位置添加到已使用的数组中
    this.usedGaps.push(gap);

    barrage.style.top = gap;
    barrage.style.animationDuration =
      (move_time > 15 ? 15 : move_time < 7.5 ? 7.5 : move_time) + "s";
    barrage.classList.add("barrage-animate");
    barrage.innerHTML = data.text;
    barrage.setAttribute("data-text", data.text);
    if (data.gender === "女") {
      barrage.classList.add("nv");
    } else {
      barrage.classList.add("nan");
    }
    this.parent.appendChild(barrage);
    this.bindEvent(barrage, data);

    //计算延迟移除间隔的时间
    const removeTime = (data.text.length / 7.5) * 1000;
    setTimeout(() => {
      //移除已使用的弹幕间隔位置
      const index = this.usedGaps.indexOf(gap);
      if (index !== -1) {
        this.usedGaps.splice(index, 1);
      }
    }, removeTime);
  }

  /** @description 创建私有字幕 */
  private createLybBarrage(text: string) {
    const barrage = document.createElement("div") as HTMLElement;

    //弹幕运动时长
    const move_time = 10 * (text.length / 10);

    //获取未使用的弹幕间隔位置
    let availableGaps = this.gaps.filter((gap) => !this.usedGaps.includes(gap));

    if (availableGaps.length === 0) {
      //如果没有可用的弹幕间隔位置了，重新清空usedGaps数组
      this.usedGaps = [];
      availableGaps = this.gaps;
    }

    //随机选择一个弹幕间隔位置的索引
    const gapIndex = random(0, availableGaps.length - 1);
    //获取选中的弹幕间隔位置
    const gap = availableGaps[gapIndex];
    //将选中的弹幕间隔位置添加到已使用的数组中
    this.usedGaps.push(gap);

    barrage.style.top = gap;
    barrage.style.animationDuration =
      (move_time > 15 ? 15 : move_time < 7.5 ? 7.5 : move_time) + "s";
    barrage.classList.add("barrage-animate");
    barrage.innerHTML = text;
    barrage.setAttribute("data-text", text);
    barrage.classList.add("lyb");
    this.parent.appendChild(barrage);

    //计算延迟移除间隔的时间
    const removeTime = (text.length / 7.5) * 1000;
    setTimeout(() => {
      //移除已使用的弹幕间隔位置
      const index = this.usedGaps.indexOf(gap);
      if (index !== -1) {
        this.usedGaps.splice(index, 1);
      }
    }, removeTime);
  }

  /** @description 给弹幕绑定事件 */
  private bindEvent(barrage: HTMLElement, data: any) {
    barrage.addEventListener("click", (e: MouseEvent) => {
      this.clickCallback(data, e);
    });

    barrage.addEventListener("animationend", function () {
      this.remove();
    });
  }

  /** @description 销毁方法 */
  destruction() {
    clearTimeout(this.generateTimer);
    this.enable = false;
    window.removeEventListener("visibilitychange", this.init);
  }
}

/** @description 音频播放器 */
export class AudioPlayer {
  private audio: HTMLAudioElement = new Audio();
  private info?: (v: HTMLMediaElement) => void;

  constructor(v: { end: () => void; info?: (v: HTMLMediaElement) => void }) {
    const { end, info } = v;
    this.audio.addEventListener("pause", end);
    this.audio.addEventListener("ended", end);
    this.info = info;

    //允许音频可视化跨域
    this.audio.setAttribute("crossOrigin", "anonymous");
  }

  play(link: string) {
    this.stop();
    this.audio.src = link;
    this.audio.play().then(() => {
      if (this.info) {
        this.info(this.audio);
      }
    });
  }

  stop() {
    this.audio.pause();
  }
}
