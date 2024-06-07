import type { BarrageType } from "../interface";

import { $mouseTip } from "@/utils/busTransfer";
import { _random } from "@/utils/tool";
import { KVP_HERO } from "@/api";
import { _getImgLink, _getAudioLink } from "@/utils/concise";

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
  /** 弹幕上下间隔的位置 */
  private gaps = [
    "0em",
    "1.5em",
    "3em",
    "4.5em",
    "6em",
    "7.5em",
    "9em",
    "10.5em",
    "12em",
    "13.5em",
    "15em",
  ];
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
      clearInterval(this.customTimer);
      clearTimeout(this.readyTimer);

      //离开当前窗口停止生成
      if (document.visibilityState === "hidden") {
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
      clearTimeout(this.generateTimer);
      clearInterval(this.customTimer);
      this.endCallback();
      return;
    }

    //一次生成的弹幕数量
    const count = _random(1, 2);

    //从原数组中截取随机个数的元素作为要生成的弹幕数据
    const barrages = this.data.slice(0, count);

    //生成弹幕
    barrages.forEach((item: Global.Barrage) => {
      this.createBarrage(item);
    });

    //更新原数组，去掉已经生成的弹幕数据
    this.data = this.data.slice(count);

    //生成下次发送弹幕的时间间隔
    const time = _random(4, 6, 1) * 1000;
    this.generateTimer = setTimeout(() => {
      this.generateBarrage();
    }, time);
  }

  /** @description 创建弹幕 */
  private createBarrage(data: Global.Barrage) {
    const barrage = document.createElement("div") as HTMLElement;

    //获取未使用的弹幕间隔位置
    let availableGaps = this.gaps.filter((gap) => !this.usedGaps.includes(gap));
    //弹幕运动时长
    const move_time = 10 * (data.text.length / 10);

    if (availableGaps.length === 0) {
      //如果没有可用的弹幕间隔位置了，重新清空usedGaps数组
      this.usedGaps = [];
      availableGaps = this.gaps;
    }

    //随机选择一个弹幕间隔位置的索引
    const gapIndex = _random(0, availableGaps.length - 1);
    //获取选中的弹幕间隔位置
    const gap = availableGaps[gapIndex];
    //将选中的弹幕间隔位置添加到已使用的数组中
    this.usedGaps.push(gap);

    const speed = move_time > 20 ? 20 : move_time < 15 ? 15 : move_time;
    const brightness = 15 / speed / 2 + 0.5;

    barrage.style.top = gap;
    barrage.style.zIndex = (brightness * 100).toFixed(0);
    barrage.style.filter = `brightness(${brightness >= 1 ? 1 : brightness})`;
    barrage.style.transform = `translateX(100%) scale(${15 / speed})`;
    barrage.style.animationDuration = speed + "s";
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

    setTimeout(() => {
      //移除已使用的弹幕间隔位置
      const index = this.usedGaps.indexOf(gap);
      if (index !== -1) {
        this.usedGaps.splice(index, 1);
      }
    }, move_time * 1000);
  }

  /** @description 创建私有字幕 */
  private createLybBarrage(text: string) {
    const barrage = document.createElement("div") as HTMLElement;

    //获取未使用的弹幕间隔位置
    let availableGaps = this.gaps.filter((gap) => !this.usedGaps.includes(gap));
    //弹幕运动时长
    const move_time = 10 * (text.length / 10);

    if (availableGaps.length === 0) {
      //如果没有可用的弹幕间隔位置了，重新清空usedGaps数组
      this.usedGaps = [];
      availableGaps = this.gaps;
    }

    //随机选择一个弹幕间隔位置的索引
    const gapIndex = _random(0, availableGaps.length - 1);
    //获取选中的弹幕间隔位置
    const gap = availableGaps[gapIndex];
    //将选中的弹幕间隔位置添加到已使用的数组中
    this.usedGaps.push(gap);

    barrage.style.top = gap;
    barrage.style.zIndex = "101";
    barrage.style.transform = `translateX(100%)`;
    barrage.style.animationDuration = (move_time > 20 ? 20 : move_time < 15 ? 15 : move_time) + "s";
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
      text: "点击下面的图片可以查看大图，图中文件：src/components/business/Global/Control/components/K-HeroDetail/index.vue",
      avatar: _getImgLink("lyb"),
      link: _getAudioLink("ji"),
      link_big: _getImgLink("code_bg_big", "1", "jpg"),
      link_small: _getImgLink("code_bg_small", "1", "jpg"),
      link_blur: _getImgLink("code_bg_blur", "1", "jpg"),
    });

    setTimeout(() => {
      //移除已使用的弹幕间隔位置
      const index = this.usedGaps.indexOf(gap);
      if (index !== -1) {
        this.usedGaps.splice(index, 1);
      }
    }, move_time * 1000);
  }

  /** @description 给弹幕绑定事件 */
  private bindEvent(barrage: HTMLElement, data: BarrageType) {
    barrage.addEventListener("mouseenter", async () => {
      const hero_name_kvp = await KVP_HERO.getHeroNameKvp();
      $mouseTip.show({
        text: `点击查看${hero_name_kvp[data.heroId] || data.name}的弹幕卡片`,
      });
    });
    barrage.addEventListener("mouseleave", $mouseTip.close);
    barrage.addEventListener("click", (e: MouseEvent) => {
      this.clickCallback(data, e);
    });

    barrage.addEventListener("animationend", function () {
      this.remove();
    });
  }

  /** @description 填充完毕后，重新启用弹幕 */
  restart(data: Global.Barrage[]) {
    this.data = data;
    this.createLybBarrage(`冷弋白：弹幕已重新装填完毕，剩余${this.data.length}条`);
    setTimeout(() => {
      this.generateBarrage();
    }, 5000);
  }

  /** @description 销毁方法 */
  destruction() {
    clearTimeout(this.generateTimer);
    this.enable = false;
    window.removeEventListener("visibilitychange", this.init);
  }
}
