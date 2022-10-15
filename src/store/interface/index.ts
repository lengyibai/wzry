import { Equip } from '@/interface/items';
import { Epigraph } from '@/interface/items';
import { Hero } from '@/interface/hero';
export interface Loading {
  show: (text: string) => void;
  close: () => Promise<void>;
}

export interface GlobalSwitch {
  $clickAudio: (name: string) => void;
  $loading: Loading;
  $tip: (text: string, type?: string) => void;
}

export interface EquipState {
  active_id: number;
  type: string;
  type_list: {
    [propName: string]: Equip[][];
  };
  equip_list: Equip[];
  equip_list_column: Equip[][];
}

export interface UserInfo {
  id: number;
  password: string;
  name: string;
  headImg: string;
}

export interface AuthState {
  wzryToken: string | null;
  userStatus: boolean;
  userInfo: UserInfo;
  smooth: boolean;
}

export interface EpigraphState {
  type: string;
  epigraph_list: Epigraph[];
  filter_list: Epigraph[];
}

export interface HeroState {
  profession: string;
  hero_list: Hero[];
  filter_list: Hero[];
  hero_info: Hero;
}
