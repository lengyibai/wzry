export interface Effect {
  name: string,
  num: number
}
export interface Equip {
  id: number;
  type: string;
  level: number;
  name: string;
  price: number;
  icon: string;
  effect: Effect[];
}