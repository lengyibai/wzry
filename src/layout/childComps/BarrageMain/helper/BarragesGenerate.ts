import { getAudioLink, getImgLink } from "@/utils/modules/concise";
import { random } from "@/utils/modules/tool";

interface BarrageType extends Global.Barrage {
  /** 作者 */
  name?: string;
  /** 描述 */
  desc?: string;
  /** 是否为私有弹幕 */
  self?: boolean;
  /** 头像 */
  avatar?: string;
  /** 壁纸大图 */
  link_big?: string;
  /** 壁纸小图 */
  link_small?: string;
  /** 壁纸模糊图 */
  link_blur?: string;
}

/** @description 弹幕生成器 */
export class BarragesGenerate {
  /** 弹幕容器 */
  private parent: HTMLElement;
  /** 弹幕数据 */
  private data: Global.Barrage[];
  /** 点击回调函数 */
  private clickCallback: (v: Global.Barrage, e: MouseEvent) => void;
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
    data: Global.Barrage[],
    event: {
      /** 点击弹幕回调 */
      click: (v: BarrageType, e: MouseEvent) => void;
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
    barrages.forEach((item: Global.Barrage) => {
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
  private createBarrage(data: Global.Barrage) {
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
    this.bindEvent(barrage, {
      self: true,
      heroId: 0,
      skinName: "",
      gender: "男",
      name: "冷弋白",
      desc: "独立开发者",
      text: "这个弹幕就让你看看我拍的这个项目的代码壁纸，点击下面的图片可以查看大图，这个大图有4MB，等待时间可能会久一点，图中文件：src/views/Hero/childViews/HeroDetail/index.vue",
      avatar: getImgLink("lyb"),
      link: getAudioLink("ji"),
      link_big: getImgLink("code_bg_big", "jpg"),
      link_small: getImgLink("code_bg_small", "jpg"),
      link_blur: getImgLink("code_bg_blur", "jpg"),
    });

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
  private bindEvent(barrage: HTMLElement, data: BarrageType) {
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
