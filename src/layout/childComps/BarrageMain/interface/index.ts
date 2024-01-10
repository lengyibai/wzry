/** @description 点击的弹幕信息 */
export interface BarrageType extends Global.Barrage {
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
