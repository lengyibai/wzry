// @ts-nocheck
import pinyin from './pinyin'
//随机数
export function $random(min, max, num = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(num));
}

//小数百分比互转
export function $potEoPct(str, ret = 4) {
  if (typeof str === "string") {
    return str.replace("%", "") / 100;
  }
  return Number((str * 100).toFixed(ret));
}

//全局替换指定字符串
export function $repStr(str, match, rep = "") {
  return str.replace(new RegExp(match, "g"), rep);
}

// 时间格式化
export function $fmtTime(date, fmt = "YYYY-MM-DD hh:mm:ss") {
  date = new Date(date);
  let ret;
  const week = ["日", "一", "二", "三", "四", "五", "六"];
  const opt = {
    "Y+": date.getFullYear().toString(),
    "M+": (date.getMonth() + 1).toString(),
    "D+": date.getDate().toString(),
    "h+": date.getHours().toString(),
    "m+": date.getMinutes().toString(),
    "s+": date.getSeconds().toString(),
    w: week[date.getDay()],
    n: new Date(date).valueOf(),
  };
  for (const k in opt) {
    ret = new RegExp(`(${ k })`).exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
  }
  return fmt;
}

//根据时间段问候
export function $timeGreet(greet = {}) {
  const { a = "午夜好", b = "早上好", c = "上午好", d = "中午好", e = "下午好", f = "晚上好" } = greet;
  const now = new Date().getHours();
  return now < 4 ? a : now < 10 ? b : now < 12 ? c : now < 14 ? d : now < 18 ? e : f;
}

//记录已过去时间或倒计时
export function $getCountTime(time = "2022-04-01 10:45:00") {
  const now = new Date(time).getTime();
  const future = new Date().getTime();
  const times = future - now > 0 ? Math.floor((future - now) / 1000) : Math.floor((now - future) / 1000);
  const time_arr = [
    { y: times / 60 / 60 / 24 / 30 / 12 },
    { mon: (times / 60 / 60 / 24 / 30) % 12 },
    { d: (times / 60 / 60 / 24) % 30 },
    { h: (times / 60 / 60) % 24 },
    { min: (times / 60) % 60 },
    { s: times % 60 },
  ];
  const timeObj = {};
  time_arr.forEach((item) => {
    const arr = Object.entries(item)[0];
    const key = arr[0];
    const value = arr[1];
    item[key] = Math.floor(value).toString().padStart(2, "0");
    Object.assign(timeObj, item);
  });
  return timeObj;
}

// requestAnimationFrame计时器
export function $frameInterval(fn, fre = 0) {
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
}
// 判断是否为数组
export function $isArray(type) {
  return Object.prototype.toString.call(type) === "[object Array]";
}

export const $pinyin = (str) => {
  if (typeof str !== "string") return str;
  let result = "";
  let abbreviation = "";
  const reg = /[a-zA-Z0-9]/;
  for (const val of str) {
    let name = "";
    for (const key in pinyin) {
      if (pinyin[key].includes(val)) {
        name = key;
        abbreviation += name[0].toLowerCase();
        break;
      }
    }
    result += reg.test(val) ? val : name;
  }
  return [result.toLowerCase(), abbreviation];
};

//正则搜索
export const $search = (data, value, keys) => {
  // 创建用于存储搜索结果的数组
  let arr = [];
  // 定义搜索函数，这个函数接收两个参数：搜索值和搜索键
  const fn = (item, key) => {
    // 使用正则表达式构造忽略大小写的搜索模式
    const reg = new RegExp(item.toString().toLowerCase(), "i");
    // 将过滤后的搜索结果添加到结果数组中
    arr.push(
      ...data.filter((item) => {
        let test = "";
        // 如果搜索的数据项的类型是数字，则直接搜索数据项
        if (typeof item[key] === "number") {
          test = item[key];
          return reg.test(test);
        }
        // 如果搜索的数据项的类型是字符串，则搜索数据项和拼音
        if (typeof item[key] === "string") {
          test = $pinyin(item[key]);
          return reg.test(test) || reg.test(item[key]);
        }
      })
    );
  };

  // 检查搜索值是否是数组
  if (Array.isArray(value)) {
    // 如果value为数组，则遍历数组的每个值并进行搜索
    value.forEach((val) => {
      // 遍历value中的每个值
      if (Array.isArray(keys)) {
        // 如果keys是数组，则遍历每个搜索键并进行搜索
        keys.map((key) => fn(val || "", key));
      } else {
        // 如果keys不是数组，则直接使用这个搜索键进行搜索
        fn(val || "", keys);
      }
    });
  } else {
    // 如果value不是数组，则直接对这个值进行搜索
    if (Array.isArray(keys)) {
      // 如果keys是数组，则遍历每个搜索键并进行搜索
      keys.map((key) => fn(value || "", key));
    } else {
      // 如果keys不是数组，则直接使用这个搜索键进行搜索
      fn(value || "", keys);
    }
  }

  // 返回搜索结果数组
  return arr;
};

// 防抖（默认延迟执行）
export const $debounce = (() => {
  let timer: Timeout = 0;
  return (callback: () => void, wait = 800) => {
    timer && clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
})();

/* 清除无意义值 */
export function $removeEmptyField<T>(data, excludes = ["", null, undefined]) {
  let newObj = {};
  if (typeof data === "string") {
    data = JSON.parse(data);
  }
  if (data instanceof Array) {
    newObj = [];
  }
  if (data instanceof Object) {
    for (const attr in data) {
      if (!excludes.includes(data[attr])) {
        if (data[attr] instanceof Object) {
          if (JSON.stringify(data[attr]) === "{}" || JSON.stringify(data[attr]) === "[]") {
            continue;
          }
          newObj[attr] = $removeEmptyField(data[attr]);
        } else if (
          typeof data[attr] === "string" &&
          ((data[attr].indexOf("{") > -1 && data[attr].indexOf("}") > -1) ||
            (data[attr].indexOf("[") > -1 && data[attr].indexOf("]") > -1))
        ) {
          try {
            const attrObj = JSON.parse(data[attr]);
            if (attrObj instanceof Object) {
              newObj[attr] = $removeEmptyField(attrObj);
            }
          } catch (e) {
            newObj[attr] = data[attr];
          }
        } else {
          newObj[attr] = data[attr];
        }
      }
    }
  }
  return newObj as T;
}

/* 对象深度去重 */
export function $objDelRep(arr, key) {
  let data = arr;
  let obj = {};
  data = data.reduce((a, b) => {
    obj[b[key]] ? "" : (obj[b[key]] = true && a.push(b));
    return a;
  }, []);
  return data;
}

/* 深拷贝 */
export function $deepCopy<T>(e): T {
  const t = new WeakMap(),
    r = (e) => {
      const t = Object.prototype.toString.call(e);
      return /^\[object (.*)\]$/.exec(t)[1];
    },
    n = (e) => "Array" === r(e),
    c = (e) => null !== e && ("object" == typeof e || "function" == typeof e),
    o = (e) => {
      const t = r(e);
      return ["Boolean", "Number", "String", "Symbol", "BigInt", "Date", "Map", "Set", "RegExp"].includes(t);
    },
    s = (e) => {
      const t = r(e),
        n = e.constructor,
        c = e.valueOf();
      switch (t) {
        case "Boolean":
        case "Number":
        case "String":
        case "Symbol":
        case "BigInt":
          return Object(c);
        case "Date":
          return new n(c);
        case "RegExp": {
          const { source: t, flags: r, lastIndex: n } = e,
            c = new RegExp(t, r);
          return (c.lastIndex = n), c;
        }
        case "Map": {
          const t = new n();
          return (
            e.forEach((e, r) => {
              t.set(r, u(e));
            }),
            t
          );
        }
        case "Set": {
          const t = new n();
          return (
            e.forEach((e) => {
              t.add(u(e));
            }),
            t
          );
        }
        default:
          return;
      }
    },
    a = (e) => {
      if (void 0 === e.constructor) return Object.create(null);
      if ("function" == typeof e.constructor && (e !== e.constructor || e !== Object.prototype)) {
        const t = Object.getPrototypeOf(e);
        return Object.create(t);
      }
      return {};
    },
    u = (e) => {
      if ("function" == typeof e || !c(e)) return e;
      if (t.has(e)) return t.get(e);
      if (o(e)) return s(e);
      const r = n(e) ? [] : a(e);
      return (
        t.set(e, r),
        Reflect.ownKeys(e).forEach((t) => {
          e.propertyIsEnumerable(t) && (r[t] = u(e[t]));
        }),
        r
      );
    };
  return u(e);
}

/* 对象深度合并 */
export function $deepMearge(obj, target = {}) {
  for (let key in target) {
    let isA = Object.prototype.toString.call(obj[key]) === "[object Object]",
      isB = Object.prototype.toString.call(target[key]) === "[object Object]";
    if (isA && isB) {
      obj[key] = $deepMearge(obj[key], target[key]);
    } else if (Array.isArray(obj[key]) && Array.isArray(target[key])) {
      obj[key] = Array.from(new Set(obj[key].concat(target[key])));
    } else {
      obj[key] = target[key];
    }
  }
  return obj;
}

/* 获取浏览器版本 */
export function $chromeV() {
  let v = "";
  navigator.userAgent.split(" ").forEach((item) => {
    /chrome/i.test(item) && (v = item);
  });
  return Number(v.split("/")[1].split(".")[0]);
}

/* 排序 */
export function $typeSort(data, key, rev = true) {
  const num = typeof key == "boolean" ? (key ? 1 : -1) : rev ? 1 : -1;
  return data.sort((a, b) => {
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
  });
}

/* 保存为文件 */
export function $savefiles(data, name) {
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  save_link.click();
}


/* 查看图片 */
const svg = {
  CLOSE: `<svg t="1662135922951" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2662"><path d="M1022.583467 127.803733 894.779733 0 511.291733 383.4624 127.8464 0 0 127.803733 383.496533 511.274667 0 894.737067 127.8464 1022.5408 511.291733 639.0784 894.779733 1022.5408 1022.583467 894.737067 639.138133 511.274667Z" p-id="2663" fill="#ffffff"></path></svg>`,
  CLOCKWISE: `<svg t="1662135824052" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1399"><path d="M482.773333 66.517333l148.181334 151.168a21.333333 21.333333 0 0 1 0 29.866667l-147.84 150.826667a21.333333 21.333333 0 0 1-28.16 2.090666l-2.346667-2.090666-27.050667-27.605334a21.333333 21.333333 0 0 1 0-29.866666l69.888-71.338667a304.64 304.64 0 1 0 318.421334 352.682667l1.024-6.826667c0.170667-1.408 0.426667-3.285333 0.64-5.632a21.333333 21.333333 0 0 1 22.314666-19.114667l42.666667 2.261334a21.333333 21.333333 0 0 1 20.224 22.4l-0.085333 1.024-1.194667 10.496A389.973333 389.973333 0 1 1 484.821333 184.746667l-59.306666-60.458667a21.333333 21.333333 0 0 1 0-29.866667l27.093333-27.605333a21.333333 21.333333 0 0 1 30.165333-0.298667z" p-id="1400" fill="#ffffff"></path></svg>`,
  COUNTER: `<svg t="1662135840330" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1590"><path d="M541.226667 66.517333L393.045333 217.685333a21.333333 21.333333 0 0 0 0 29.866667l147.84 150.826667a21.333333 21.333333 0 0 0 28.16 2.090666l2.346667-2.090666 27.050667-27.605334a21.333333 21.333333 0 0 0 0-29.866666l-69.888-71.338667a304.64 304.64 0 1 1-318.421334 352.682667l-1.024-6.826667a176.554667 176.554667 0 0 1-0.64-5.632 21.333333 21.333333 0 0 0-22.314666-19.114667l-42.666667 2.261334a21.333333 21.333333 0 0 0-20.224 22.4l0.085333 1.024 1.194667 10.496A389.973333 389.973333 0 1 0 539.178667 184.746667l59.306666-60.458667a21.333333 21.333333 0 0 0 0-29.866667l-27.093333-27.605333a21.333333 21.333333 0 0 0-30.165333-0.298667z" p-id="1591" fill="#ffffff"></path></svg>`,
};
export class ViewImg {
  x = 0;
  y = 0;
  size = 1;
  rotate = 0;
  status = 0;
  transform = "";
  origin = [0, 0];
  position = [0, 0];
  link: string;
  pic: HTMLElement;
  tool: HTMLElement;
  mask: HTMLElement;
  counter: HTMLElement;
  closeBtn: HTMLElement;
  clonedBox: HTMLElement;
  clockwise: HTMLElement;
  constructor(link) {
    this.link = link;
    document.body.style.overflow = "hidden";
    this.createdMask();
    this.createPic();
    this.createBtn();
    this.createCloseBtn();
    this.initImg();
    this.addEventListener();
  }
  createdMask() {
    this.mask = document.createElement("div");
    this.mask.style.cssText = ` display: none; position: fixed; inset: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.75); transition: all 0.25s; opacity: 0; z-index: 999; `;
    document.body.appendChild(this.mask);
  }
  createPic() {
    this.pic = document.createElement("div");
    this.pic.style.cssText = ` position: fixed; inset: 0; width: 100%; height: 100%; transition: all 0.25s; z-index: 1000; display: none; transform: scale(0.75); opacity: 0; `;
    document.body.appendChild(this.pic);
  }
  createBtn() {
    this.tool = document.createElement("div");
    this.clockwise = document.createElement("div");
    this.counter = document.createElement("div");
    this.tool.style.cssText = ` position: fixed; display: none; justify-content: space-between; width: 110px; left: 50%; bottom: 30px; transform: translateX(-50%); background-color: #606266; border-radius: 50px; z-index: 1001; padding: 10px 23px; opacity: 0; transition: all 0.25s; `;
    const base = `width: 23px; height: 23px; `;
    this.clockwise.style.cssText = base;
    this.counter.style.cssText = base;
    this.clockwise.innerHTML = svg.CLOCKWISE;
    this.counter.innerHTML = svg.COUNTER;
    this.tool.appendChild(this.counter);
    this.tool.appendChild(this.clockwise);
    document.body.appendChild(this.tool);
    this.clockwise.addEventListener("click", (e) => {
      e.stopPropagation();
      this.setPosition("clockwise");
    });
    this.counter.addEventListener("click", (e) => {
      e.stopPropagation();
      this.setPosition("counter");
    });
  }
  createCloseBtn() {
    this.closeBtn = document.createElement("div");
    this.closeBtn.innerHTML = svg.CLOSE;
    this.closeBtn.style.cssText = ` position: fixed; display: none; top: 60px; right: 60px; width: 40px; height: 40px; z-index: 1001; padding: 11px; background-color: #606266; transition: all 0.25s; opacity: 0; border-radius: 50%; `;
    document.body.appendChild(this.closeBtn);
  }
  initImg() {
    this.clonedBox = document.createElement('img');
    this.clonedBox.src = this.link;
    this.clonedBox.style.cssText = ` position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 100%; max-height: 100%; object-fit: contain; transition: all 0.25s; `;
    this.pic.appendChild(this.clonedBox);
    this.pic.style.display = "block";
    this.mask.style.display = "block";
    this.tool.style.display = "flex";
    this.closeBtn.style.display = "block";
    this.clonedBox.onload = ()=>{
      this.mask.style.opacity = "1";
      this.pic.style.opacity = "1";
      this.pic.style.transform = "scale(1)";
      this.tool.style.opacity = "1";
      this.closeBtn.style.opacity = "1";
      this.origin = [this.clonedBox.offsetWidth / 2, this.clonedBox.offsetHeight / 2];
    }
  }
  setPosition(name) {
    const obj = {
      clockwise() {
        this.rotate += 90;
        this.status++;
      },
      counter() {
        this.rotate -= 90;
        this.status--;
      },
    };
    obj[name].call(this);
    this.setStyle();
  }
  setStyle() {
    this.clonedBox.style.transform = `translate(calc(-50% + ${this.x}px), calc(-50% + ${this.y}px)) rotate(${this.rotate}deg) scale(${this.size})`;
    this.clonedBox.style.transformOrigin = `${this.origin[0]}px ${this.origin[1]}px`;
  }
  addEventListener() {
    this.pic.addEventListener("mousewheel", this.wheel.bind(this));
    this.clonedBox.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.closeBtn.addEventListener("click", this.close.bind(this));
    this.pic.addEventListener("click", this.close.bind(this));
    const _this = this;
    let startX = 0;
    let startY = 0;
    let moveX = 0;
    let moveY = 0;
    let originX = 0;
    let originY = 0;
    function fn(e) {
      const status = _this.status;
      if (status % 4 === 0) {
        _this.x = moveX + (e.pageX - startX) / _this.size;
        _this.y = moveY + (e.pageY - startY) / _this.size;
        _this.origin[0] = originX - (e.pageX - startX) / _this.size;
        _this.origin[1] = originY - (e.pageY - startY) / _this.size;
      }
      if (status % 4 === 1 || status % 4 === -3) {
        _this.x = moveX + (e.pageY - startY) / _this.size;
        _this.y = moveY - (e.pageX - startX) / _this.size;
        _this.origin[0] = originX - (e.pageY - startY) / _this.size;
        _this.origin[1] = originY + (e.pageX - startX) / _this.size;
      }
      if (status % 4 === 2 || status % 4 === -2) {
        _this.x = moveX - (e.pageX - startX) / _this.size;
        _this.y = moveY - (e.pageY - startY) / _this.size;
        _this.origin[0] = originX + (e.pageX - startX) / _this.size;
        _this.origin[1] = originY + (e.pageY - startY) / _this.size;
      }
      if (status % 4 === 3 || status % 4 === -1) {
        _this.x = moveX - (e.pageY - startY) / _this.size;
        _this.y = moveY + (e.pageX - startX) / _this.size;
        _this.origin[0] = originX + (e.pageY - startY) / _this.size;
        _this.origin[1] = originY - (e.pageX - startX) / _this.size;
      }
      _this.setStyle();
    }
    this.clonedBox.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startX = e.pageX;
      startY = e.pageY;
      moveX = this.x;
      moveY = this.y;
      originX = this.origin[0];
      originY = this.origin[1];
      this.clonedBox.style.transition = "all 0s";
      this.clonedBox.addEventListener("mousemove", fn);
    });
    this.clonedBox.addEventListener("mouseup", () => {
      this.clonedBox.style.transition = "all 0.25s";
      this.clonedBox.removeEventListener("mousemove", fn);
    });
  }
  wheel(e) {
    if (e.deltaY > 0) {
      this.size /= 1.25;
      if (this.size < 0.1) this.size = 0.1;
    } else {
      this.size *= 1.25;
    }
    this.setStyle();
  }
  close() {
    document.body.style.overflow = "auto";
    this.pic.removeEventListener("mousewheel", this.wheel.bind(this));
    this.mask.style.opacity = "0";
    this.tool.style.opacity = "0";
    this.closeBtn.style.opacity = "0";
    this.pic.style.opacity = "0";
    this.pic.style.transform = "scale(0.75)";
    setTimeout(() => {
      this.mask.style.display = "none";
      this.tool.style.display = "none";
      this.pic.style.display = "none";
      this.pic.innerHTML = "";
      this.closeBtn.style.display = "none";
    }, 250);
  }
}
