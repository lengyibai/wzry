/** @description 升级的英雄信息 */
export interface HeroUpgradeInfo {
  /** 英雄id */
  id: number;
  /** 英雄名字 */
  name: string;
  /** 英雄头像 */
  avatar: string;
  /** 英雄封面 */
  cover: string;
  /** 英雄模糊封面 */
  coverBlur: string;
  /** 英雄等级 */
  exp: number;
  /** 英雄职业 */
  profession: Game.Hero.Profession[];
}
