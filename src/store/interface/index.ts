/** @description 滚动结束后触发函数组 */
export type SkinToggleFn = (hero_id: number, skin_name: string) => void;

/** @description 皮肤切换后触发函数组 */
export type ScrollFn = { name: string; fn: (pageName: string) => void }[];

/** @description 当前悬浮显示的关系信息 */
export interface RelationInfoType extends Game.Hero.RelationType {
  /** 对应关系英雄的回复 */
  reply: string;
  /** 对应关系 */
  replyRelation: string;
  /** 对应关系的性别 */
  replyGender: string;
}

/** 装备Dom元素信息 */
export type EquipElement = {
  /** 装备名称 */
  name: string;
  /** 装备Dom元素 */
  el: HTMLElement | undefined;
  /** 装备id */
  id: number;
};
