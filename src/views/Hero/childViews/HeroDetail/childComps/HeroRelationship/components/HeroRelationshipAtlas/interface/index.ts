export interface HeroInfo {
  /** 主英雄的ID */
  heroId: number;
  /** 主英雄头像 */
  avatar: string;
  /** 主英雄的DOM */
  heroEl?: HTMLElement;
  /** 主英雄的线条DOM */
  heroLineEl?: HTMLElement;
  /** 主英雄名称 */
  heroName: string;
  /** 基础关系列表 */
  relationships: Game.Hero.RelationType[];
  /** 主英雄的关系信息组，包含主英雄，但是当主英雄移动到中间后会被移除 */
  relationshipsInfo: RelationshipInfo[];
  /** 线条元素 */
  linesInfo: LineInfo[];
}

export interface RelationshipInfo {
  /** 英雄ID */
  heroId: number;
  /** 英雄DOM */
  heroEl: HTMLElement;
  /** 英雄头像 */
  avatar: string;
  /** 角度用于创建线条时设置线条角度 */
  angle: number;
  /** 关系介绍 */
  desc: string;
  /** 英雄名 */
  heroName: string;
}

/** @description 线条类型 */
export interface LineInfo {
  /** 线条元素 */
  lineEl: HTMLElement;
  /** 所属英雄 */
  heroId: number;
  /** 所属英雄名 */
  heroName: string;
  /** 线条上的关系 */
  relation: string;
}

export interface Params {
  /** 父元素 */
  parentElement: HTMLElement;
  /** 当前英雄ID */
  currentHeroId: number;
  /** 当前英雄名 */
  currentHeroName: string;
  /** 关系数组 */
  relationships: Game.Hero.RelationType[];
  /** 线条宽度 */
  lineWidth: number;
  /** 切换英雄关系回调函数 */
  clickFn: (id: number) => void;
  /** 悬浮英雄关系回调函数 */
  hoverFn: (hero: Game.Hero.RelationType) => void;
}
