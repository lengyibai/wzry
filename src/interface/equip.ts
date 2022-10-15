export interface Effect {
  name: string;
  num: number;
}

export interface Motivation {
  type: string;
  name: string;
  desc: string;
  time: string;
}
export interface Equip {
  id: number;
  level: number;
  price: number;
  type: string;
  name: string;
  icon: string;
  note: string;
  desc: string;
  effect: Effect[];
  motivation: Motivation[];
}
