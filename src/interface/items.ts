/* 装备效果 */
export interface EquipEffect {
  name: string; //名称
  num: number; // +增益量
}

/* 动机信息 */
export interface EquipMotivation {
  type: string; //主/被动
  name: string; //名称
  desc: string; //描述
  time: string; //冷却时间
}

/* 装备信息 */
export interface Equip {
  id: number; //标识符
  level: number; //等级
  price: number; //价格
  type: string; //类型
  name: string; //名称
  icon: string; //图标
  note: string; //备注
  desc: string; //简述
  effect: EquipEffect[]; //效果
  motivation: EquipMotivation[]; //动机
}

/* 铭文效果 */
export interface EpigraphEffect {
  type: string; //效果类型
  num: string; // +增益值
}

/* 铭文信息 */
export interface Epigraph {
  name: string; //名称
  type: string; //类型
  img: string; //图标
  effect: EpigraphEffect[]; //效果
}
