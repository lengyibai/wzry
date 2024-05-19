/** @description 自选的英雄信息 */
export interface HeroSkinOptionalInfo {
  /** 英雄/皮肤id */
  id: number;
  /** 英雄名 */
  hero_name: string;
  /** 皮肤名 */
  skin_name?: string;
  /** 皮肤类型 */
  skin_type?: number;
  /** 英雄/皮肤头像 */
  avatar: string;
  /** 英雄/皮肤职业 */
  profession: Game.Hero.Profession[];
  /** 价格 */
  debris?: string;
  /** 类型 */
  type?: number;
}

/** @description 自选模式：英雄、皮肤、伴生皮肤、限定皮肤 */
export type OptionalMode = "HERO" | "BRAVE" | "EPIC" | "LEGEND" | "INITIAL" | "LIMIT";
