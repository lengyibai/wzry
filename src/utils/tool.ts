import dayjs from "dayjs";
import Decimal from "decimal.js";

import type { ImageOptimizerOptions } from "./interface";

import { PINYIN } from "@/config/modules/pinyin";

/** @description 判断是否为移动端 */
export const _isPhone = (() => /mobile/i.test(navigator.userAgent))();

/** @description 获取浏览器版本 */
export const _browserV = (() => {
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

/** @description 根据时间段问候 */
export const _timeGreet = (() => {
  const a = "午夜好",
    b = "早上好",
    c = "上午好",
    d = "中午好",
    e = "下午好",
    f = "晚上好";

  const now = new Date().getHours();
  return now < 4 ? a : now < 10 ? b : now < 12 ? c : now < 14 ? d : now < 18 ? e : f;
})();

/** @description 是否为对象 */
export const _isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

/** @description 累加计算 */
export const _accumulate = <T extends Record<string, any>>(data: T[], key: keyof T) => {
  return data.reduce((acc, item) => acc + item[key], 0);
};

/** @description 精确的十进制计算 */
export const _decimal = (num1: number, num2: number, type: "+" | "-" | "*" | "/", point = 2) => {
  const a = new Decimal(num1);
  const b = new Decimal(num2);
  const calc = {
    "+": () => a.add(b),
    "-": () => a.sub(b),
    "*": () => a.mul(b),
    "/": () => a.div(b),
  } as const;
  return Number(calc[type]().toFixed(point));
};

/** @description 随机数 */
export const _random = (min: number, max: number, num = 0) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(num));
};

/** @description 小数百分比互转 */
export const _potEoPct = (str: string | number, ret = 4) => {
  if (typeof str === "string") {
    return Number(str.replace("%", "")) / 100;
  }
  return Number((str * 100).toFixed(ret));
};

/** @description requestAnimationFrame计时器 */
export const _frameInterval = (fn: () => void, fre = 0) => {
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
export const _isArray = (type: any) => Object.prototype.toString.call(type) === "[object Array]";

/** @description 中文转拼音 */
export const _pinyin = (str: string) => {
  if (typeof str !== "string") return str;
  let result = "";
  let abbreviation = "";
  const reg = /[a-zA-Z0-9]/;
  for (const val of str) {
    let name = "";
    for (const key in PINYIN) {
      if (PINYIN[key].includes(val)) {
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
export const _search = <T>(
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
        const pin_yin: string[] = _pinyin(item[key]);
        if (pin_yin.some((py) => reg.test(py) || reg.test(item[key]))) {
          if (highlight && value !== "") {
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

/** @description 排序 */
export const _typeSort = <T>(data: any[], key: string, rev = true): T[] => {
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
export const _saveFiles = (data: any, name: string): void => {
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

/** @description 图片压缩 */
export const _imageOptimizer = (obj: ImageOptimizerOptions) => {
  const canvas = document.createElement("canvas");
  canvas.classList.add("imageOptimizer");
  document.body.appendChild(canvas);

  const files = obj.el?.files?.[0] || obj.file;
  if (!files) return;

  const name = files.name;
  const ratio = obj.ratio || 1;
  const maxSize = obj.maxSize || 1024;
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

    if (e.total / 1024 > maxSize) {
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
export const _promiseTimeout = (fn: () => void, delay = 0) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, delay);
  });
};

/** @description 判断表单指定属性名是否为空 */
export const _existEmpty = <T extends Record<string, any>>(obj: T, arr: (keyof T)[] = []) =>
  (arr.length > 0 ? arr : Object.keys(obj)).filter((key) => obj[key] === "").length > 0
    ? (arr.length > 0 ? arr : Object.keys(obj)).filter((key) => obj[key] === "")
    : false;

/** @description 计算文件大小 */
export const _getFileSizeInKB = (file: any) => {
  const str = JSON.stringify(file, null, 2);
  const blob = new Blob([str]);
  const fileSizeInBytes = blob.size;
  const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
  return Number(fileSizeInKB);
};

/** @description 同步加载图片 */
export const _preloadImages = async (images: string[]) => {
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
export const _shuffleArray = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/** @description 网站标题小提示 */
export const _titleTip = () => {
  let document_title = "";
  let timer: NodeJS.Timeout;
  window.addEventListener("visibilitychange", () => {
    clearTimeout(timer);

    if (document.hidden) {
      if (document.title !== "o(*≧▽≦)ツ欢迎回来！") {
        document_title = document.title;
      }
      document.title = "ヽ(≧∀≦)ﾉ来和妲己玩耍吧！";
      return;
    }

    document.title = "o(*≧▽≦)ツ欢迎回来！";

    timer = setTimeout(() => {
      document.title = document_title;
    }, 1000);
  });
};

/** @description 下载图片链接 */
export const _downloadImage = (link: string, name: string) => {
  fetch(link)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = name;
      a.click();
    });
};

/** @description 配置合并，如果当前配置有但初始配置没有的属性，则会删除该属性，反之添加 */
export const _mergeConfig = <T>(config: T, initialConfig: T) => {
  //第一次循环是为了补充缺少的配置项
  for (const key in initialConfig) {
    //如果在当前配置中有该配置项
    if (config[key] !== undefined) {
      //如果该配置项为对象
      if (_isObject(initialConfig[key])) {
        _mergeConfig(config[key], initialConfig[key]);
      }
    }
    //否则添加该配置项
    else {
      config[key] = initialConfig[key];
    }
  }

  return config;
};

/**
 * @description 传入时间戳与当前时间判断
 * @param timestamp 毫秒时间戳
 * @returns 0-同一天 1-新的一天 -1时间戳大于当前时间
 */
export const _checkTimeStamp = (timestamp: number) => {
  const inputDay = dayjs(timestamp).startOf("day");
  const currentDay = dayjs().startOf("day");

  // 比较两个日期
  if (inputDay.isSame(currentDay)) {
    return 0; //同一天
  } else if (inputDay.isBefore(currentDay)) {
    return 1; //时间戳为前一天
  } else {
    return -1; //时间戳大于当前时间
  }
};

/**
 * @description 等级百分比计算函数
 * @param exp 经验值
 * @param levels 每级所需经验的数组
 * @return 返回小数、当前经验值、当前等级区间的目标经验值
 */
export const _calcLevelPercentage = (exp: number, levels: number[]) => {
  // 首先找到经验值所在的等级区间
  let level = 1;
  while (level < levels.length && exp >= levels[level]) {
    level++;
  }

  // 计算等级百分比
  const levelExp = levels[level - 1];
  const nextLevelExp = levels[level];
  const percentage = (exp - levelExp) / (nextLevelExp - levelExp);

  // 计算当前等级最大经验值
  const maxExp = nextLevelExp;

  // 计算当前等级熟练度
  const index = level - 1;

  // 如果经验值超过了最大经验值，则直接返回 100%、最大经验值和最大熟练度
  if (exp >= levels[levels.length - 1]) {
    return {
      percentage: 1,
      exp,
      maxExp: levels[levels.length - 1],
      index: levels.length - 1,
    };
  }

  return { percentage, exp, maxExp, index };
};

/** @description 将[]包裹的文字设置高亮 */
export const _setHighlight = (text: string) => {
  return text.replace(/\[([^\]]+)\]/g, '<span class="global_highlight-yellow-tip">$1</span>');
};

/* 递归判断父元素的类名是否包含指定类名 */
export const _classNameInclude = (el: HTMLElement, className: string): HTMLElement | undefined => {
  if (el.className.indexOf(className) !== -1) return el;
  if (el.parentElement) return _classNameInclude(el.parentElement, className);
  return undefined;
};

/** @description 图片加载失败重新请求 */
export const _loadAndRetryImage = (url: string, retries = 3) => {
  const image = new Image();
  image.src = url;

  return new Promise<void>((resolve, reject) => {
    let attemptCount = 0;

    const onError = () => {
      attemptCount++;

      if (attemptCount < retries) {
        // 如果还有重试次数，则清除错误事件监听器，更改源地址重新加载
        image.removeEventListener("error", onError);
        setTimeout(() => {
          // 重新添加错误监听器
          image.src = url;
          image.addEventListener("error", onError);
        }, 1000);
      } else {
        // 超过最大重试次数，拒绝Promise
        reject();
      }
    };

    image.addEventListener("load", () => {
      resolve();
    });
    image.addEventListener("error", onError);
  });
};

/** @description 音频加载失败重新请求 */
export const _loadAndRetryAudio = (url: string, retries = 3) => {
  const audioElement = new Audio();

  audioElement.src = url;

  return new Promise<void>((resolve, reject) => {
    let attemptCount = 0;

    const onError = () => {
      attemptCount++;

      if (attemptCount < retries) {
        // 如果还有重试次数，则清除错误事件监听器，更改源地址重新加载
        audioElement.removeEventListener("error", onError);
        setTimeout(() => {
          // 重新添加错误监听器
          audioElement.src = url;
          audioElement.addEventListener("error", onError);
          audioElement.load(); // 重新加载音频资源
        }, 1000);
      } else {
        // 超过最大重试次数，拒绝Promise
        reject();
      }
    };

    audioElement.addEventListener("canplaythrough", () => {
      resolve();
    });
    audioElement.addEventListener("error", onError);

    // 触发音频资源的加载
    audioElement.load();
  });
};

/** @description 将秒数格式化成["0","0","0","0","0","0",] */
export const _formatSeconds = (time: number) => {
  // 计算时、分、秒
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // 补零操作，确保两位数显示
  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");

  // 返回格式化的字符串
  return [...`${h}${m}${s}`];
};

/** @description 将秒数格式化成中文 */
export const _formatSecondsToChinese = (second: number) => {
  // 计算小时、分钟和剩余秒数
  const hour = Math.floor(second / 3600);
  const minute = Math.floor((second % 3600) / 60);
  const remainingSecond = second % 60;
  const timeParts = [];

  if (hour > 0) {
    timeParts.push(`${hour}小时`);
  }

  if (minute > 0) {
    timeParts.push(`${minute}分`);
  }

  if (!hour && !minute) {
    return `${remainingSecond}秒`;
  }

  if (remainingSecond > 0) {
    timeParts.push(`${remainingSecond}秒`);
  }

  return timeParts.join("");
};

/** @description 时间差计算 */
export const _getTimeAgo = (timestamp: number) => {
  const timeUnits = [
    { unit: "年", milliseconds: 365 * 24 * 60 * 60 * 1000 },
    { unit: "月", milliseconds: 30 * 24 * 60 * 60 * 1000 },
    { unit: "周", milliseconds: 7 * 24 * 60 * 60 * 1000 },
    { unit: "天", milliseconds: 24 * 60 * 60 * 1000 },
    { unit: "小时", milliseconds: 60 * 60 * 1000 },
    { unit: "分钟", milliseconds: 60 * 1000 },
  ];

  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  for (const { unit, milliseconds } of timeUnits) {
    if (timeDifference >= milliseconds) {
      const count = Math.floor(timeDifference / milliseconds);
      return `${count} ${unit}前`;
    }
  }

  return "刚刚";
};

/** @description 获取第二天00:00:00的时间戳 */
export const _getNewDayTimestamp = (timestamp: number) => {
  const date = dayjs(timestamp);
  const nextDayStart = date.add(1, "day").startOf("day");
  return nextDayStart.valueOf();
};

/** @description 将大于1000的数字使用k为单位 */
export const _formatKilobitNumber = (num: number) => {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}w`;
  } else if (num >= 10000) {
    return `${Math.floor(num / 1000) / 10}w`;
  } else if (num >= 1000) {
    return `${Math.floor(num / 100) / 10}k`;
  } else {
    return num.toString();
  }
};

/** @description 请求失败重连 */
export const _retryRequest = <T>({
  promiseFn,
  maxRetries = 3,
  retryDelay = 2000,
  params = undefined,
}: {
  promiseFn: (params?: any) => Promise<T>;
  params?: any;
  maxRetries?: number;
  retryDelay?: number;
  onRetry?: () => void;
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    let count = 0;
    const makeRequest = () => {
      promiseFn(params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          count++;
          if (count >= maxRetries) {
            reject(err);
            return;
          }
          setTimeout(makeRequest, retryDelay);
        });
    };

    makeRequest();
  });
};

/** @description 视差动画 */
export class _Parallax {
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

/** @description 音频可视化 */
export class _AudioVisual {
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

/** @description 音频播放器 */
export class _AudioPlayer {
  private audio: HTMLAudioElement = new Audio();
  private volume: number = 1;

  constructor(v?: { end?: () => void; volume?: number }) {
    const { end, volume = 1 } = v || {};
    if (end) {
      this.audio.addEventListener("pause", end);
      this.audio.addEventListener("ended", end);
    }
    this.volume = volume;

    //允许音频可视化跨域
    this.audio.setAttribute("crossOrigin", "anonymous");
  }

  async play(link: string) {
    this.stop();
    this.audio.volume = this.volume;
    this.audio.src = link;
    await this.audio.play();
    return this.audio;
  }

  stop() {
    this.audio.pause();
  }
}

/** @description 触底加载 */
export class _LoadMore {
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
