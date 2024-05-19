/** @description 道具商品信息 */
export interface BuyProp {
  /** 道具Key */
  key: Game.PropKey;
  /** 货币类型 */
  type: "GOLD" | "DIAMOND";
  /** 道具价格 */
  price: number;
  /** 道具数量 */
  num: number;
}
