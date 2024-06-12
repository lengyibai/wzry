import Decimal from "decimal.js";
import dayjs from "dayjs";
import _cloneDeep from "lodash/cloneDeep";
import _debounce from "lodash/debounce";
import _throttle from "lodash/throttle";
import { match as _pinyinMatch } from "pinyin-pro";

import type { ImageOptimizerOptions } from "./interface";

export { dayjs, _debounce, _cloneDeep, _throttle };

/** @description 判断是否为移动端 */
export const _isPhone = (() => /mobile|Android|iPhone/i.test(navigator.userAgent))();

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

/** @description 累加计算
 * @param data 需要累加的数组
 * @param key 累加的键名
 */
export const _accumulate = <T extends Record<string, any>>(data: T[], key: keyof T) => {
  return data.reduce((acc, item) => acc + item[key], 0);
};

/**
 * @description 精确的十进制计算
 * @param nums 数字数组
 * @param operators 运算符数组
 * @param point 精度，默认为2
 */
export const _decimal = (nums: number[], operators: ("+" | "-" | "*" | "/")[], point = 2) => {
  //检查数字数量与运算符数量是否匹配
  if (nums.length !== operators.length + 1) {
    throw new Error("数字数量与符号数量不匹配，符号数量＝数字数量-1");
  }

  //初始化结果为第一个数字
  let result = new Decimal(nums[0]);

  //定义计算函数对象，包含加减乘除四则运算
  const calc: Record<string, (a: Decimal, b: Decimal) => Decimal> = {
    "+": (a, b) => a.add(b),
    "-": (a, b) => a.sub(b),
    "*": (a, b) => a.mul(b),
    "/": (a, b) => {
      //检查除数是否为0
      if (b.eq(0)) {
        throw new Error("除数不能为0");
      }
      return a.div(b);
    },
  };

  //循环计算每个运算符对应的数字
  for (let i = 0; i < operators.length; i++) {
    const operand = new Decimal(nums[i + 1]); //获取下一个数字作为操作数
    const operator = operators[i]; //获取当前运算符
    result = calc[operator](result, operand); //使用对应的计算函数进行计算
  }

  return Number(result.toFixed(point));
};

/** @description 随机数
 * @param min 最小值
 * @param max 最大值
 * @param num 保留小数位数
 */
export const _random = (min: number, max: number, num = 0) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(num));
};

/** @description 小数百分比互转
 * @param str 小数或百分比
 * @param ret 保留小数位数
 */
export const _potEoPct = (str: string | number, ret = 4) => {
  if (typeof str === "string") {
    return Number(str.replace("%", "")) / 100;
  }
  return Number((str * 100).toFixed(ret));
};

/** @description requestAnimationFrame计时器
 * @param fn 回调函数
 * @param fre 频率毫秒
 */
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

/** @description 判断是否为数组
 * @param type 需要判断的数据
 */
export const _isArray = (data: any) => Object.prototype.toString.call(data) === "[object Array]";

/**
 * @description 正则搜索
 * @param data 需要搜索的数据
 * @param value 搜索的值
 * @param keys 搜索的键名
 * @param highlight 是否高亮
 */
export const _search = <T>(
  data: T[],
  value: string | string[],
  keys: string | string[],
  highlight = false,
): T[] => {
  const arr: T[] = [];

  // 根据给定的值和键名进行搜索
  const fn = (searchValue: string, key: string): void => {
    const reg = new RegExp(searchValue.toLowerCase(), "i"); // 创建正则表达式
    data.forEach((item: any) => {
      item[key] = item[key].toString(); // 确保属性为字符串

      if (_pinyinMatch(item[key], searchValue, { precision: "start" })) {
        // 匹配拼音或属性值
        if (highlight && searchValue) {
          item[key] = item[key].replace(
            reg,
            (match: string) => `<i style="color:var(--blue)">${match}</i>`,
          ); // 高亮匹配部分
        }
        arr.push(item);
      }
    });
  };

  if (Array.isArray(keys)) {
    keys.forEach((key: string) => fn(value as string, key)); // 遍历键名进行搜索
  } else if (Array.isArray(value)) {
    value.forEach((val: string) => {
      if (Array.isArray(keys)) {
        keys.forEach((key: string) => fn(val, key)); // 遍历值和键名进行搜索
      } else {
        fn(val, keys); // 单个键名和多个值进行搜索
      }
    });
  } else {
    fn(value, keys); // 单个值和单个键名进行搜索
  }

  return arr;
};

/** @description 排序
 * @param data 需要排序的数据
 * @param key 排序的键名
 * @param rev 是否降序
 */
export const _typeSort = <T>(data: any[], key: string, rev = true): T[] => {
  const num = typeof key === "boolean" ? (key ? 1 : -1) : rev ? 1 : -1;
  return data.sort(((a: any, b: any) => {
    if (typeof data[0] === "object") {
      if (typeof a[key] === "number") {
        return (a[key] - b[key]) * num;
      }
      if (typeof a[key] === "string") {
        return a[key].toString().localeCompare(b[key].toString()) * num;
      }
    }

    if (typeof a === "number") {
      return (a - b) * num;
    }

    if (typeof a === "string") {
      return a.toString().localeCompare(b.toString()) * num;
    }
  }) as () => any);
};

/** @description 保存为文件
 * @param data 需要保存的数据
 * @param name 文件名
 */
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

/** @description 图片压缩
 * @param obj 压缩参数
 */
export const _imageOptimizer = (obj: ImageOptimizerOptions) => {
  const canvas = document.createElement("canvas");
  canvas.classList.add("imageOptimizer");
  document.body.appendChild(canvas);

  const files = obj.el?.files?.[0] || obj.file;
  if (!files) return;

  const name = files.name;
  const extension = name.split(".").pop()!.toLowerCase();
  const ratio = obj.ratio || 1;
  const maxSize = obj.maxSize || 1024;
  const width = obj.width || 10000;
  const mimeType = files.type;

  function dataURLtoFile(dataURL: string, filename: string) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = window.atob(arr[1]);
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

        const dataUrl = canvas.toDataURL(mimeType, ratio);
        const newName = `${name.split(".")[0]}.${extension}`;
        const file = dataURLtoFile(dataUrl, newName);
        obj.success(formData(file), file, dataUrl);
        canvas.remove();
      };
      image.onerror = obj.fail as any;
    } else {
      const newName = `${name.split(".")[0]}.${extension}`;
      const file = dataURLtoFile(result, newName);
      obj.success(formData(file), file, result);
      canvas.remove();
    }
  };
  reader.onerror = obj.fail as any;
};

/** @description Promise定时器
 * @param delay 延迟时间
 * @param fn 延迟后执行的函数
 */
export const _promiseTimeout = (delay = 1, fn?: () => void) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      fn?.();
      resolve();
    }, delay);
  });
};

/** @description 判断表单指定属性名是否为空
 * @param obj 需要判断的对象
 * @param arr 需要判断的属性名数组
 * @returns 存在空属性名则返回空属性名数组，否则返回false
 */
export const _existEmpty = <T extends Record<string, any>>(obj: T, arr: (keyof T)[] = []) =>
  (arr.length > 0 ? arr : Object.keys(obj)).filter((key) => obj[key] === "").length > 0
    ? (arr.length > 0 ? arr : Object.keys(obj)).filter((key) => obj[key] === "")
    : false;

/** @description 计算文件大小
 * @param file 文件对象
 * @returns 文件大小KB
 */
export const _getFileSizeInKB = (file: any) => {
  const str = JSON.stringify(file, null, 2);
  const blob = new Blob([str]);
  const fileSizeInBytes = blob.size;
  const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
  return Number(fileSizeInKB);
};

/** @description 同步加载图片
 * @param images 图片数组
 */
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

/** @description 数组乱序
 * @param arr 需要乱序的数组
 */
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

/** @description 下载图片链接
 * @param link 图片链接
 * @param name 图片名称
 */
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

/** @description 配置合并，如果当前配置有但初始配置没有的属性
 * @param config 当前配置
 * @param initialConfig 初始配置
 */
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
 * @description 传入时间戳与当前时间判断是否为同一天或同一周
 * @param timestamp 毫秒时间戳
 * @param unit 判断单位 'day' 或 'week'
 * @returns 0-同一单位时间 1-新单位时间 -1时间戳大于当前时间
 */
export const _checkTimeStamp = (timestamp: number, unit: "day" | "week") => {
  const inputTime = dayjs(timestamp).startOf(unit);
  const currentTime = dayjs().startOf(unit);

  if (inputTime.isSame(currentTime)) {
    return 0; // 同一单位时间
  } else if (inputTime.isBefore(currentTime)) {
    return 1; // 新单位时间
  } else {
    return -1; // 时间戳大于当前时间
  }
};

/**
 * @description 等级百分比计算函数
 * @param exp 经验值
 * @param levels 每级所需经验的数组
 * @return 返回小数、当前经验值、当前等级区间的目标经验值
 */
export const _calcLevelPercentage = (exp: number, levels: number[]) => {
  //首先找到经验值所在的等级区间
  let level = 1;
  while (level < levels.length && exp >= levels[level]) {
    level++;
  }

  //计算等级百分比
  const levelExp = levels[level - 1];
  const nextLevelExp = levels[level];
  const percentage = (exp - levelExp) / (nextLevelExp - levelExp);

  //计算当前等级最大经验值
  const maxExp = nextLevelExp;

  //计算当前等级熟练度
  const index = level - 1;

  //如果经验值超过了最大经验值，则直接返回 100%、最大经验值和最大熟练度
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

/** @description 将[]包裹的文字设置高亮
 * @param text 需要替换的文本
 */
export const _setHighlight = (text: string) => {
  return text.replace(/\[([^\]]+)\]/g, '<span class="global_highlight-yellow-tip">$1</span>');
};

/** @description 技能高亮标签替换
 * @param text 需要替换的文本
 */
export const _setSkillHighlight = (text: string) => {
  return text
    .replace(/<cheng>([^<]+)<\/cheng>/g, '<span style="color: #d35400;">$1</span>')
    .replace(/<zi>([^<]+)<\/zi>/g, '<span style="color: #be2edd;">$1</span>')
    .replace(/<lv>([^<]+)<\/lv>/g, '<span style="color: #27ae60;">$1</span>')
    .replace(/<lan>([^<]+)<\/lan>/g, '<span style="color: #25ccf7;">$1</span>')
    .replace(/<huang>([^<]+)<\/huang>/g, '<span style="color: #f39c12;">$1</span>')
    .replace(/<hui>([^<]+)<\/hui>/g, '<span style="color: gray;">$1</span>');
};

/**
 * @description 递归判断父元素的类名是否包含指定类名
 * @param el 当前元素
 * @param className 指定类名
 */
export const _classNameInclude = (el: HTMLElement, className: string): HTMLElement | undefined => {
  if (el.className.indexOf(className) !== -1) return el;
  if (el.parentElement) return _classNameInclude(el.parentElement, className);
  return undefined;
};

/** @description 图片加载失败重新请求
 * @param url 图片地址
 * @param retries 重试次数
 */
export const _loadAndRetryImage = (url: string, retries = 3) => {
  const image = new Image();
  image.src = url;

  return new Promise<void>((resolve, reject) => {
    let attemptCount = 0;

    const onError = () => {
      attemptCount++;

      if (attemptCount < retries) {
        //如果还有重试次数，则清除错误事件监听器，更改源地址重新加载
        image.removeEventListener("error", onError);
        setTimeout(() => {
          //重新添加错误监听器
          image.src = url;
          image.addEventListener("error", onError);
        }, 1000);
      } else {
        //超过最大重试次数，拒绝Promise
        reject();
      }
    };

    image.addEventListener("load", () => {
      resolve();
    });
    image.addEventListener("error", onError);
  });
};

/** @description 音频加载失败重新请求
 * @param url 音频地址
 * @param retries 重试次数
 */
export const _loadAndRetryAudio = (url: string, retries = 3) => {
  const audioElement = new Audio();

  audioElement.src = url;

  return new Promise<void>((resolve, reject) => {
    let attemptCount = 0;

    const onError = () => {
      attemptCount++;

      if (attemptCount < retries) {
        //如果还有重试次数，则清除错误事件监听器，更改源地址重新加载
        audioElement.removeEventListener("error", onError);
        setTimeout(() => {
          //重新添加错误监听器
          audioElement.src = url;
          audioElement.addEventListener("error", onError);
          audioElement.load(); //重新加载音频资源
        }, 1000);
      } else {
        //超过最大重试次数，拒绝Promise
        reject();
      }
    };

    audioElement.addEventListener("canplaythrough", () => {
      resolve();
    });
    audioElement.addEventListener("error", onError);

    //触发音频资源的加载
    audioElement.load();
  });
};

/** @description 将秒数格式化成["0","0","0","0","0","0",]
 * @param time 秒数
 * @param unit 输出单位
 */
export const _formatSeconds = (time: number, unit?: "SEC" | "MIN") => {
  //计算时、分、秒
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  //补零操作，确保两位数显示
  let h = hours.toString().padStart(2, "0");
  let m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");

  if (unit === "SEC") {
    h = "";
    m = "";
  }

  if (unit === "MIN") {
    h = "";
  }

  //返回格式化的字符串
  return [...`${h}${m}${s}`];
};

/** @description 将秒数格式化成中文
 * @param second 秒数
 */
export const _formatSecondsToChinese = (second: number) => {
  //计算小时、分钟和剩余秒数
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

/** @description 时间差计算
 * @param timestamp 时间戳
 * @returns 距离当前时间的时间差
 */
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

/** @description 获取第二天00:00:00的时间戳
 * @param timestamp 时间戳
 */
export const _getNewDayTimestamp = (timestamp: number) => {
  const date = dayjs(timestamp);
  const nextDayStart = date.add(1, "day").startOf("day");
  return nextDayStart.valueOf();
};

/** @description 将大于1000的数字使用k为单位
 * @param num 数字
 */
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

/** @description 请求失败重连
 * @param promiseFn 请求函数
 * @param maxRetries 最大重试次数
 * @param retryDelay 重试间隔时间
 * @param params 请求参数
 */
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

/**
 * @description 计算滚动进度
 * @param value 滚动坐标
 * @param milestones 每页滚动结束坐标
 * @returns 返回计算出的进度值，范围在0到100之间。
 */
export const _calculateProgress = (value: number, milestones: number[]) => {
  // 如果给定值小于等于0，则进度为0
  if (value <= 0) return 0;

  const max_progress = 100; // 进度的最大值
  const schedule_num = milestones.length - 1; // 坐标组的有效进度数量
  const step = max_progress / schedule_num; // 计算每个区间内的进度步长

  // 遍历每个坐标，确定给定值所在的进度区间
  for (let i = 1; i < schedule_num; i++) {
    //当前区间起点
    const start = milestones[i - 1];
    //当前区间终点
    const end = milestones[i];

    // 如果给定值小于下一个区间的起点，则计算并返回当前区间的进度
    if (value < end) {
      const range = end - start; // 计算当前区间的范围值
      const progressInRange = value - start; // 计算给定值在当前区间内的进度
      return (i - 1) * step + (progressInRange / range) * step; // 返回计算出的进度
    }
  }

  // 计算给定值在最后一个区间内的进度
  const start = milestones[schedule_num - 1];
  const end = milestones[schedule_num];
  const range = end - start;
  const progressInRange = value - start;
  return (schedule_num - 1) * step + (progressInRange / range) * step;
};

/** @description 将Blob标识符转换成Base64
 * @param blob Blob标识符
 */
export const _blobTextToBase64 = (blob: string): Promise<string> => {
  return new Promise((resolve) => {
    fetch(blob)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Blob URL");
        }
        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result!.toString());
        };
        reader.readAsDataURL(blob);
      });
  });
};

/** @description 将Base64转成JSON并转成对象，前提是Base64源数据为对象 */
export const _base64ToObject = (base64: string) => {
  const base64Data = base64.replace(/^data:text\/plain;base64,/, "");
  const arrayBuffer = Uint8Array.from(window.atob(base64Data), (c) => c.charCodeAt(0)).buffer;
  const decoder = new TextDecoder("utf-8");
  const jsonString = decoder.decode(arrayBuffer);
  return JSON.parse(jsonString);
};

/**
 * @description 将base64图片转成File文件类型
 * @param base64Data base64数据
 * @param filename 带后缀名的文件
 */
export const _base64toFile = (base64Data: string, filename: string) => {
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
  };
  const ext = filename!.split(".").pop()!.toLowerCase();
  const mimeType = mimeTypes[ext];
  if (!mimeType) throw new Error("Unsupported file type");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, data] = base64Data.split(";base64,");
  const byteCharacters = window.atob(data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};

/** @description 计算两点角度
 * @param coord1 起点坐标
 * @param coord2 终点坐标
 */
export const _getCoordsAngle = (
  coord1: { x: number; y: number },
  coord2: { x: number; y: number },
) => {
  // 计算相对于第一个坐标的水平和垂直距离
  const deltaX = coord2.x - coord1.x;
  const deltaY = coord2.y - coord1.y;

  // 使用反三角函数计算角度（以弧度为单位）
  const angleRad = Math.atan2(deltaY, deltaX);

  // 将弧度转换为角度
  let angleDeg = angleRad * (180 / Math.PI);

  // 将角度转换为顺时针方向为正方向的角度
  angleDeg = -angleDeg + 90;

  // 调整角度使得右边成为 360 度的位置变为 0 度
  if (angleDeg < 0) {
    angleDeg += 360;
  }

  return angleDeg;
};

/** @description 计算两点距离
 * @param coord1 起点坐标
 * @param coord2 终点坐标
 */
export const _getCoordsDistance = (
  coord1: { x: number; y: number },
  coord2: { x: number; y: number },
) => {
  // 计算两个坐标之间的水平和垂直距离
  const deltaX = coord2.x - coord1.x;
  const deltaY = coord2.y - coord1.y;

  // 使用勾股定理计算两点之间的距离
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  return distance;
};

/**
 * @description 调用一次，靠近一次目标坐标，同时保持指定的阈值
 * @param currentCoord 元素当前坐标 { x, y }
 * @param targetCoord 元素目标坐标 { x, y }
 * @param threshold 在该阈值内不需要移动距离
 * @param px 每次移动像素
 * @param onFinish 移动完成后的回调函数
 * @returns 调整操作完成后的坐标 { x, y }
 */
export const _adjustCoordinates = (
  currentCoord: { x: number; y: number },
  targetCoord: { x: number; y: number },
  threshold: number,
  px: number,
  onFinish: () => void,
) => {
  // 计算当前坐标与目标坐标的整体距离
  const distance = Math.sqrt(
    Math.pow(targetCoord.x - currentCoord.x, 2) + Math.pow(targetCoord.y - currentCoord.y, 2),
  );

  // 如果整体距离大于临界值，则进行调整
  if (distance > threshold) {
    // 计算移动方向
    const dx = targetCoord.x - currentCoord.x;
    const dy = targetCoord.y - currentCoord.y;

    // 计算单位移动距离
    const unitX = (dx / distance) * 10;
    const unitY = (dy / distance) * 10;

    // 移动当前坐标
    currentCoord.x += unitX * px;
    currentCoord.y += unitY * px;
  } else {
    onFinish();
  }

  return currentCoord;
};

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
    return new Promise<HTMLAudioElement>((resolve) => {
      this.stop();
      this.audio.volume = this.volume;
      this.audio.src = link;
      this.audio.onloadeddata = async () => {
        await this.audio.play();
        resolve(this.audio);
      };
    });
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

    //计算距离底部的距离
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
