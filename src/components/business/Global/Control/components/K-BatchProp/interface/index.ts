import type { GamePropValue } from "@/config/interface";

/** @description 道具商品信息 */
export interface BatchProp {
  /** 道具信息 */
  prop: GamePropValue;
}

/** @description 概率信息 */
export type ChanceInfo = Partial<
  Record<
    Game.PropKey,
    {
      count: number;
      num: number;
      key: Game.PropKey;
    }
  >
>;
