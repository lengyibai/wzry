import type { HeroInfo, Params, RelationshipInfo, LineInfo } from "../interface";

import { $mouseTipText } from "@/config/modules/mouse-tip";
import { KVP_HERO } from "@/api";
import { useHaveHeroSkin } from "@/hooks/modules/useHaveHeroSkin";
import { KnapsackStore } from "@/store";
import { $mouseTip } from "@/utils/busTransfer";

/**
 * @description 给负责连接两个元素的线条设置线条
 * @param circle1 第一个元素
 * @param circle2 第二个元素
 * @param line 线条元素
 */
const connectCircle = (circle1: HTMLElement, circle2: HTMLElement, line: HTMLElement) => {
  //计算两个圆的中心坐标
  const rect1 = circle1.getBoundingClientRect();
  const rect2 = circle2.getBoundingClientRect();

  const x1 = rect1.width / 2;
  const y1 = rect1.height / 2;
  const x2 = rect2.left + rect2.width / 2 - rect1.left;
  const y2 = rect2.top + rect2.height / 2 - rect1.top;

  //计算线条的长度和角度
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) - circle2.offsetHeight / 2;
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  //设置线条的位置和角度
  setTimeout(() => {
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.top = `${y1}px`;
    line.style.left = `${x1}px`;
  });
};

export class RelationshipCircle {
  /** 在动画过度时禁止点击 */
  private isAnimating: boolean = true;
  /** 初次加载的入场动画是否已经结束 */
  private isFinishEnter: boolean = false;
  /** 监听函数组 */
  private watches: { id: number; fn: () => void }[] = [];
  /** 当前关系数量，包含主英雄，但主英雄移入中间后会-1 */
  private relationLength: number = 0;
  /** 父DOM */
  private parentElement: HTMLElement;
  /** 线条宽度 */
  private lineWidth: number = 0;
  /** 获取主英雄宽高，用于对其圆心位置进行计算 */
  private mainHeroWidth: number = 0;
  private mainHeroHeight: number = 0;
  /** 平均分配角度，主英雄也参与分配，但主英雄移入中间后会重新分配 */
  private angleIncrement: number = 0;
  /** 实例是否销毁 */
  private isDestroyed: boolean = false;
  /** 动画时长顺序配置 */
  private durations: Record<string, number> = {};
  /** 当前主英雄及关系信息DOM */
  private currentInfo: HeroInfo = {
    heroId: 0,
    avatar: "",
    heroName: "",
    heroEl: undefined,
    heroLineEl: undefined,
    relationships: [],
    relationshipsInfo: [],
    linesInfo: [],
  };
  /** 点击英雄后触发切换关系回调 */
  private clickFn!: (id: number) => void;
  /** 悬浮英雄后触发显示关系回调 */
  private hoverFn!: (hero: Game.Hero.RelationType) => void;

  constructor(config: Params) {
    const {
      parentElement,
      currentHeroId,
      relationships,
      lineWidth,
      clickFn,
      hoverFn,
      currentHeroName,
    } = config;
    this.parentElement = parentElement;
    this.lineWidth = lineWidth;
    this.clickFn = clickFn;
    this.hoverFn = hoverFn;
    this.relationLength = relationships.length;
    this.angleIncrement = 360 / this.relationLength;

    this.setDurations();
    this.startTracking();
    this.initCreate(relationships, currentHeroId, currentHeroName);
  }

  /** @description 动画时长配置 */
  private setDurations() {
    //通用单个动画时长
    const alone = 500;
    this.durations.alone = alone;

    //通用关系间隔时长总和
    const gap_duration = this.isFinishEnter ? alone : this.relationLength * 100 + alone;
    this.durations.gapDuration = gap_duration;

    //主英雄回归圆心动画，这个动画在播放关系归位动画时延迟执行
    this.durations.backCenter = gap_duration;

    //线条显示动画，这个动画在播放关系归位动画时与主英雄回归圆心动画同时延迟执行
    this.durations.lineRender = gap_duration;

    //重新分配角度动画，这个动画在播放入场动画时延迟执行
    this.durations.redistribution = gap_duration + alone;

    //文字显示动画，这个动画在播放入场动画时延迟执行，以及切换的时候延迟执行
    this.durations.textRender = !this.isFinishEnter ? gap_duration * 2 : gap_duration * 4;

    //文字位置更新动画，这个动画在播放重新分配角度动画时延迟执行，以及切换的时候延迟执行
    this.durations.textUpdate = !this.isFinishEnter ? gap_duration + alone : gap_duration * 4;
  }

  /** @description 第一次创建 */
  initCreate(
    relationships: Game.Hero.RelationType[],
    currentHeroId: number,
    currentHeroName: string,
  ) {
    this.currentInfo.relationships = relationships;

    //为主英雄创建DOM，仅仅是为了获取精确的圆心位置，确定关系DOM位置，只会创建一次
    const currentHeroElement = document.createElement("div");
    currentHeroElement.className = "main-hero";
    this.parentElement.append(currentHeroElement);
    this.currentInfo.heroId = currentHeroId;
    this.currentInfo.heroName = currentHeroName;

    //获取主英雄宽高，用于对其圆心位置进行计算，获取后删除DOM
    this.mainHeroWidth = currentHeroElement.offsetWidth / 2;
    this.mainHeroHeight = currentHeroElement.offsetHeight / 2;
    currentHeroElement.remove();

    //设置关系列表
    this.createHeroElement(relationships);
    //设置线条列表
    this.createLineElement(relationships);
    //重新分配位置
    setTimeout(this.updatePositionInfo.bind(this), this.durations.redistribution);

    //循环线条监听位置
    this.currentInfo.linesInfo.forEach((lineInfo, index) => {
      const { heroId: id, lineEl } = lineInfo;

      //存储实时监听位置并更新连线的函数
      const clickHeroEl = this.currentInfo.relationshipsInfo[index].heroEl;
      this.watches.push({
        id,
        fn: () => connectCircle(this.currentInfo.heroEl!, clickHeroEl, lineEl),
      });
    });
  }

  private async mouseTip(hero_id: number) {
    const { hero_list } = KnapsackStore();
    const hero_name_kvp = await KVP_HERO.getHeroNameKvp();
    $mouseTip.show({
      disabled: !hero_list[hero_id],
      text: hero_list[hero_id]
        ? `点击查看${hero_name_kvp[hero_id]}的关系资料`
        : $mouseTipText("d7i9", { v: "英雄" }),
    });
  }

  /** @description 通过关系循环创建DOM及坐标等信息 */
  private createHeroElement(relationships: Game.Hero.RelationType[]) {
    //生成关系组DOM、坐标、角度、位置
    relationships.forEach((relationship, index) => {
      const { avatar, heroName, id: heroId, desc } = relationship;
      const { x, y, angle } = this.getPositionInfo(index);

      const heroEl = this.getHeroElement(relationship, x, y, index);
      this.parentElement.append(heroEl);

      this.currentInfo.relationshipsInfo.push({
        heroId,
        heroEl,
        angle,
        desc,
        avatar,
        heroName,
      });

      //如果当前创建的是主英雄，则设置主英雄回归中心的动画
      if (this.currentInfo.heroId === heroId) {
        setTimeout(() => {
          //获取主英雄索引号
          const currentHeroIndex = this.currentInfo.relationshipsInfo.findIndex((item) => {
            return item.heroId === this.currentInfo.heroId;
          });

          //将主英雄及其线条从关系组中移除，为了重新设置平均分配的角度，移除后不会受影响，因为已经在对象第一层存储
          this.currentInfo.relationshipsInfo.splice(currentHeroIndex, 1)[0];
          this.currentInfo.linesInfo.splice(currentHeroIndex, 1)[0];
          this.relationLength = this.currentInfo.relationshipsInfo.length;
          this.setDurations();

          const heroEl = this.currentInfo.heroEl!;
          heroEl.classList.add("main-hero");
          setTimeout(() => {
            //延迟移除，避免动画错误
            heroEl.classList.remove("hero-card");
          }, this.durations.alone);
        }, this.durations.backCenter);
      } else {
        heroEl.onmouseenter = () => {
          if (this.isAnimating) return;
          this.hoverHero(relationship.id);
          this.mouseTip(relationship.id);
        };
        heroEl.onmouseleave = $mouseTip.close;
      }
    });
  }

  /** @description 获取英雄关系DOM */
  private getHeroElement(
    relationship: Game.Hero.RelationType,
    x: number,
    y: number,
    index: number,
  ) {
    const { avatar, heroName, id: heroId } = relationship;

    //创建英雄关系DOM
    const heroEl = document.createElement("div");
    heroEl.className = "hero-card";
    heroEl.style.transitionDelay = `${index * 0.1}s`;
    heroEl.style.opacity = "0";

    //创建英雄关系头像
    const heroAvatarImage = document.createElement("img");
    heroEl.append(heroAvatarImage);
    heroAvatarImage.className = "head-img";
    heroAvatarImage.src = avatar;

    //设置坐标，此时有从初始位置到指定位置的动画
    setTimeout(() => {
      if (!this.isFinishEnter) {
        heroEl.style.top = `calc(50% + ${y / 16}rem)`;
        heroEl.style.left = `calc(50% + ${x / 16}rem)`;
      } else {
        heroEl.style.top = "50%";
        heroEl.style.left = "50%";
      }
      heroEl.style.opacity = "1";
      setTimeout(() => {
        heroEl.style.transitionDuration = "0.5s";
      });
    }, 100);

    //如果是主英雄则播放主英雄动画
    if (this.currentInfo.heroId === heroId) {
      this.currentInfo.heroEl = heroEl;
      this.currentInfo.avatar = avatar;
    }

    //如果不是主英雄则给关系英雄注册切换英雄的点击事件
    if (this.currentInfo.heroId !== heroId) {
      heroEl.onclick = () => {
        if (!useHaveHeroSkin(heroId)) return;

        //动画过程中禁止点击
        if (this.isAnimating) return;
        this.isAnimating = true;

        const {
          heroId: mainHeroId,
          heroEl: mainHeroEl,
          avatar: mainHeroImage,
          heroName: mainHeroName,
        } = this.currentInfo;

        //点击英雄后，删除自身事件，为主英雄设置点击事件
        this.regRemEvent(
          heroId,
          heroName,
          heroEl,
          avatar,
          mainHeroId,
          mainHeroName,
          mainHeroEl!,
          mainHeroImage,
        );
      };
    }

    return heroEl;
  }

  /** @description 通过分配的索引号，平均分配角度，获取关系的坐标、角度信息 */
  private getPositionInfo(index: number) {
    const angle = this.angleIncrement * index;
    const radians = (angle * Math.PI) / 180;
    const x = this.mainHeroWidth + this.lineWidth * Math.cos(radians) - 50;
    const y = this.mainHeroHeight + this.lineWidth * Math.sin(radians) - 50;
    return { x, y, angle };
  }

  /** @description 通过关系循环创建线条DOM及坐标等信息 */
  private createLineElement(relationships: Game.Hero.RelationType[]) {
    relationships.forEach((relationship) => {
      const { relation, heroName, id: heroId } = relationship;

      //存储主英雄线条DOM(这个线条初次进入时是没有内容，所以直接连接的圆心，也没有长度)
      const lineEl = this.getLineText(relation);
      if (heroId === this.currentInfo.heroId) {
        this.currentInfo.heroLineEl = lineEl;
      }

      this.currentInfo.linesInfo.push({
        lineEl,
        heroId,
        heroName,
        relation,
      });

      setTimeout(() => {
        this.currentInfo.heroEl!.appendChild(lineEl);
      }, this.durations.lineRender);
    });
  }

  /** @description 获取线条 */
  private getLineText(relation: string) {
    const line = document.createElement("div");
    line.className = "line";

    //创建文字
    const text = document.createElement("div");
    text.className = "text";
    text.style.opacity = "0";
    text.style.transitionDuration = this.durations.alone + "ms";
    text.innerText = relation;

    line.append(text);

    setTimeout(() => {
      text.style.opacity = "1";
      text.style.left = "50%";
    }, this.durations.textRender);

    return line;
  }

  /** @description 主英雄DOM移入中心点后，重新分配位置，只有在关系组存在主英雄时使用，只会调用一次 */
  private updatePositionInfo() {
    this.angleIncrement = 360 / this.relationLength;

    //重新分配位置，补全空缺
    this.currentInfo.relationshipsInfo.forEach((relationshipInfo, index) => {
      const { x, y, angle } = this.getPositionInfo(index);

      //更新英雄关系DOM的位置
      relationshipInfo.heroEl.style.transitionDuration = "0.5s";
      relationshipInfo.heroEl.style.transitionDelay = `${index * 0.1}s`;
      relationshipInfo.heroEl.style.top = `calc(50% + ${y / 16}rem)`;
      relationshipInfo.heroEl.style.left = `calc(50% + ${x / 16}rem)`;

      setTimeout(
        () => {
          this.updateLineTextAngle(this.currentInfo.linesInfo[index].lineEl, angle);
          relationshipInfo.heroEl.style.transitionDelay = `0s`;
        },
        this.currentInfo.relationshipsInfo.length * 100 + this.durations.alone + 100,
      );
    });

    const heros = this.currentInfo.relationshipsInfo.map((item) => item.heroId);
    heros.push(this.currentInfo.heroId);

    this.watches = this.watches.filter((item) => {
      return heros.includes(item.id);
    });

    setTimeout(() => {
      this.isAnimating = false;
      if (!this.isFinishEnter) {
        this.isFinishEnter = true;
        this.setDurations();

        const data = this.currentInfo.relationships.find((item) => {
          return item.id === this.currentInfo.relationshipsInfo[0].heroId;
        });
        this.hoverHero(data!.id);

        return;
      }

      this.hoverHero(this.currentInfo.relationshipsInfo[0].heroId);
    }, this.durations.textUpdate);
  }

  /**
   * @description 点击英雄后，删除自身事件，将主英雄设置点击事件
   * @param clickHeroId 被点击的英雄ID
   * @param clickHeroName 被点击的英雄名称
   * @param clickHeroEl 被点击的英雄DOM
   * @param clickHeroImage 被点击的英雄头像
   * @param mainHeroId 主英雄ID
   * @param mainHeroName 主英雄名称
   * @param mainHeroEl 主英雄DOM
   * @param mainHeroImage 主英雄头像
   */
  private regRemEvent = (
    clickHeroId: number,
    clickHeroName: string,
    clickHeroEl: HTMLElement,
    clickHeroImage: string,
    mainHeroId: number,
    mainHeroName: string,
    mainHeroEl: HTMLElement,
    mainHeroImage: string,
  ) => {
    clickHeroEl.onclick = null;
    clickHeroEl.onmouseenter = null;

    this.swapHero(
      clickHeroId,
      clickHeroName,
      clickHeroEl,
      clickHeroImage,
      mainHeroId,
      mainHeroName,
      mainHeroEl,
      mainHeroImage,
    );

    mainHeroEl.onclick = () => {
      if (this.isAnimating) return;
      this.isAnimating = true;
      const { heroId, heroName, heroEl, avatar } = this.currentInfo;

      this.regRemEvent(
        mainHeroId,
        mainHeroName,
        mainHeroEl,
        mainHeroImage,
        heroId,
        heroName,
        heroEl!,
        avatar,
      );
    };
  };

  /**
   * @description 将点击的英雄与主英雄交换位置
   * @param clickHeroId 被点击的英雄ID
   * @param clickHeroName 被点击的英雄名称
   * @param clickHeroEl 被点击的英雄DOM
   * @param clickHeroImage 被点击的英雄头像
   * @param mainHeroId 主英雄ID
   * @param mainHeroName 主英雄名称
   * @param mainHeroEl 主英雄DOM
   * @param mainHeroImg 主英雄头像
   */
  private swapHero(
    clickHeroId: number,
    clickHeroName: string,
    clickHeroEl: HTMLElement,
    clickHeroImg: string,
    mainHeroId: number,
    mainHeroName: string,
    mainHeroEl: HTMLElement,
    mainHeroImg: string,
  ) {
    //将点击的英雄设置为主英雄
    clickHeroEl.classList.add("main-hero");
    //原主英雄与被点击的英雄交换坐标
    mainHeroEl.style.left = clickHeroEl.style.left;
    mainHeroEl.style.top = clickHeroEl.style.top;

    //让主英雄和被点击的英雄能够同时移动
    setTimeout(() => {
      //将主英雄设置为普通英雄
      mainHeroEl.classList.add("hero-card");
      mainHeroEl.classList.remove("main-hero");
    });

    //将主英雄DOM的线条获取后加入到新的DOM
    const linesInfo = Array.from(mainHeroEl.querySelectorAll(".line")) as HTMLElement[];
    linesInfo!.forEach((lineEl: HTMLElement) => {
      lineEl.style.display = "none";
      setTimeout(() => {
        clickHeroEl!.appendChild(lineEl);
        lineEl.style.display = "flex";
      }, 16.7);
    });

    //将原关系英雄的线条信息替换成主英雄信息
    const line_index = this.currentInfo.linesInfo.findIndex((item) => {
      return item.heroId === clickHeroId;
    });
    this.currentInfo.heroLineEl!.style.opacity = "1";
    const clickHeroLineEl = this.currentInfo.linesInfo[line_index].lineEl;
    this.currentInfo.linesInfo[line_index].heroId = mainHeroId;
    this.currentInfo.linesInfo[line_index].heroName = mainHeroName;
    this.currentInfo.linesInfo[line_index].lineEl = this.currentInfo.heroLineEl!;
    this.currentInfo.linesInfo[line_index].relation = "切换后替换获取";
    this.currentInfo.heroLineEl = clickHeroLineEl;
    this.currentInfo.heroLineEl.style.opacity = "0";

    //将原关系英雄的信息替换成主英雄信息
    const currentHeroIndex = this.currentInfo.relationshipsInfo.findIndex((item) => {
      return item.heroId === clickHeroId;
    });
    this.currentInfo.relationshipsInfo[currentHeroIndex] = {
      heroId: mainHeroId,
      heroName: mainHeroName,
      heroEl: mainHeroEl,
      avatar: mainHeroImg,
      desc: "",
      angle: 0,
    };

    //将被点击的英雄信息替换主英雄信息
    this.currentInfo.heroId = clickHeroId;
    this.currentInfo.heroName = clickHeroName;
    this.currentInfo.avatar = clickHeroImg;
    this.currentInfo.heroEl = clickHeroEl;
    //普通英雄移动到中间后才删除原类名及切换英雄
    setTimeout(() => {
      this.clickFn(clickHeroId);
      clickHeroEl.classList.remove("hero-card");
    }, 500);
  }

  /** @description 更新线条文字的角度 */
  private updateLineTextAngle(line: HTMLElement, angle: number) {
    const text = line.querySelector(".text") as HTMLElement;

    text.style.writingMode = "initial";
    if ((angle >= 315 && angle <= 360) || (angle >= 0 && angle < 45)) {
      text.style.transform = "translateX(-25%) translateY(-50%)";
    } else if (angle >= 45 && angle < 135) {
      text.style.writingMode = "vertical-lr";
      text.style.transform = "rotate(270deg) translateX(-50%) translateY(0.9375rem)";
    } else if (angle >= 135 && angle < 225) {
      text.style.transform = `rotateX(180deg) rotateY(180deg) translateX(25%) translateY(-50%)`;
    } else if (angle >= 225 && angle < 315) {
      text.style.writingMode = "vertical-lr";
      text.style.transform = `rotate(90deg) translateX(-50%)  translateY(-0.9375rem)`;
    }
  }

  /** @description 切换关系 */
  toggleRelations(relationships: Game.Hero.RelationType[]) {
    this.currentInfo.relationships = relationships;
    this.relationLength = relationships.length;
    this.angleIncrement = 360 / this.relationLength;
    this.setDurations();

    //临时可复用的英雄关系DOM和线条DOM
    const currentRelations: RelationshipInfo[] = [];
    const currentLines: LineInfo[] = [];

    //筛出所有可复用
    relationships.forEach((relationship) => {
      const { id: heroId, heroName, avatar, desc, relation } = relationship;
      //筛选可复用的关系DOM
      const currentRelationship = this.currentInfo.relationshipsInfo.find((currentRelation) => {
        return relationship.id === currentRelation.heroId;
      });
      //如果可复用，则将英雄信息覆盖
      if (currentRelationship) {
        //生成DOM并移动到中间的过程禁用动画，只有在更新位置时设置动画
        currentRelationship.heroEl.style.transitionDuration = "0s";
        currentRelationship.heroName = heroName;
        currentRelationship.avatar = avatar;
        currentRelationship.heroId = heroId;
        currentRelationship.desc = desc;
        currentRelations.push(currentRelationship);

        currentRelationship.heroEl.onmouseenter = () => {
          if (this.isAnimating) return;
          this.hoverHero(relationship.id);
          this.mouseTip(relationship.id);
        };
        currentRelationship.heroEl.onmouseleave = $mouseTip.close;
      } else {
        //创建新的英雄关系DOM添加到页面并存储
        const { x, y, angle } = this.getPositionInfo(0);
        const heroEl = this.getHeroElement(relationship, x, y, 0);
        this.parentElement.append(heroEl);

        //生成DOM并移动到中间的过程禁用动画，只有在更新位置时设置动画
        heroEl.style.transitionDuration = "0s";
        currentRelations.push({
          heroId,
          heroEl,
          angle,
          desc,
          avatar,
          heroName,
        });

        //创建新的英雄关系线条添加到页面并存储
        const lineEl = this.getLineText(relation);
        //存储主英雄线条(这个线条初次进入时是没有内容，所以直接连接的圆心，也没有长度)
        if (heroId === this.currentInfo.heroId) {
          this.currentInfo.heroLineEl = lineEl;
        } else {
          heroEl.onmouseenter = () => {
            if (this.isAnimating) return;
            this.hoverHero(relationship.id);
            this.mouseTip(relationship.id);
          };
          heroEl.onmouseleave = $mouseTip.close;
        }
        currentLines.push({
          lineEl,
          heroId,
          heroName,
          relation,
        });

        //延迟添加线条，避免线条有一帧出现在初始位置
        setTimeout(() => {
          this.currentInfo.heroEl!.appendChild(lineEl);
          //存储实时监听位置并更新连线的函数
          const _this = this;
          this.watches.push({
            id: heroId,
            fn() {
              connectCircle(_this.currentInfo.heroEl!, heroEl, lineEl);
            },
          });
        }, this.durations.alone);
      }

      //筛选可复用的线条DOM
      const currentLine = this.currentInfo.linesInfo.find((lineElement) => {
        return relationship.id === lineElement.heroId;
      });
      if (currentLine) {
        //顺便替换掉线条上的文字以及线条信息里的关系
        currentLine.relation = relationship.relation;
        currentLine.lineEl.querySelector(".text")!.innerHTML = relationship.relation;
        currentLines.push(currentLine);
      }
    });

    //将当前英雄关系列表与筛选出来的可复用的英雄关系列表进行比对，提取出不存在的关系DOM
    const removeHeroEls: HTMLElement[] = [];
    this.currentInfo.relationshipsInfo.forEach((currentRelation) => {
      const hero = currentRelations.find((relation) => {
        return currentRelation.heroId === relation.heroId;
      });
      if (!hero) {
        removeHeroEls.push(currentRelation.heroEl);
      }
    });
    //删除不存在的关系DOM，关系英雄全部移动到中间后删除
    const durations = removeHeroEls.length * 100 + this.durations.alone;
    removeHeroEls.forEach((heroEl, index) => {
      heroEl.style.transitionDelay = `${index * 0.1}s`;
      heroEl.classList.add("center");
      setTimeout(() => {
        heroEl.remove();
      }, durations);
    });

    //将当前线条关系列表与筛选出来的可复用的线条关系列表进行比对，如果当前线条关系不在可复用列表里则，删除DOM
    this.currentInfo.linesInfo.forEach((currentLine, index) => {
      const line = currentLines.find((line) => {
        return line.heroId === currentLine.heroId;
      });
      if (!line) {
        //关系元素移动到中间的过程中国，线条上的文字也要隐藏
        const textEl = currentLine.lineEl.querySelector(".text") as HTMLElement;
        textEl.style.transition = `all 0.25s ${index * 0.1}s`;
        textEl.style.opacity = "0";
        setTimeout(() => {
          currentLine.lineEl.remove();
        }, durations);
      }
    });

    //将可复用的关系数据表和线条数据表替换掉当前
    this.currentInfo.relationshipsInfo = currentRelations;
    this.currentInfo.linesInfo = currentLines;

    setTimeout(this.updatePositionInfo.bind(this), durations + 250);
  }

  /** @description 悬浮某个英雄设置样式 */
  private hoverHero(heroId: number) {
    if (this.isAnimating || this.isDestroyed) return;

    const hero = this.currentInfo.relationships.find((item) => {
      return item.id === heroId;
    })!;

    this.currentInfo.relationshipsInfo.forEach((currentRelation) => {
      currentRelation.heroEl.style.filter = "saturate(0.5) brightness(0.5)";
    });
    this.currentInfo.linesInfo.forEach((currentLine) => {
      currentLine.lineEl.style.filter = "saturate(0.5) brightness(0.5)";
      currentLine.lineEl.classList.remove("active");
    });
    const heroEl = this.currentInfo.relationshipsInfo.find((currentRelation) => {
      return currentRelation.heroId === hero.id;
    })!.heroEl;
    const lineEl = this.currentInfo.linesInfo.find((currentLine) => {
      return currentLine.heroId === hero.id;
    })!.lineEl;

    heroEl.style.filter = "saturate(1) brightness(1)";
    lineEl.style.filter = "saturate(1) brightness(1)";
    lineEl.classList.add("active");

    this.hoverFn(hero);
  }

  /** @description 开启追踪 */
  private startTracking() {
    const updateLine = () => {
      this.watches.forEach((watch) => {
        watch.fn();
      });
      requestAnimationFrame(updateLine);
    };
    updateLine();
  }

  /** @description 销毁 */
  destruction() {
    this.isDestroyed = true;
  }
}
