import { RouteRecordName, RouteRecordRaw } from "vue-router";
import { ResultData } from "@/api/interface/result";
/* 消息类型 */
export type msgType = "info" | "warning" | "error";

/** @description: 全局 */
export namespace GlobalSwitch {
  export interface State {
    $clickAudio: (name?: string) => void;
    $loading: Loading;
    $tip: (text: string, type?: msgType) => void;
  }
  interface Loading {
    show: (text?: string) => void;
    close: () => Promise<void>;
  }
}

/** @description: 用户 */
export namespace AuthStore {
  export interface State {
    timer: Interval | number;
    userStatus: boolean;
    userInfo: ResultData.User;
  }
}

/** @description: 路由 */
export namespace RoutesStore {
  export interface State {
    routes: RouteRecordRaw[];
    asyncRoutesName: RouteRecordName[];
  }
}

/** @description: 英雄 */
export namespace HeroStore {
  export interface State {
    profession: string;
    hero_list: Hero.Data[];
    filter_list: Hero.Data[];
  }
}
/** @description: 皮肤 */
export namespace SkinStore {
  export interface State {
    profession: string;
    skin_list: Hero.Skin[];
    filter_list: Hero.Skin[];
    type_logo: {
      id: number;
      name: string;
      link: string;
    }[];
  }
}

/** @description: 英雄信息 */
export namespace HeroDetailStore {
  export interface State {
    scroll_index: number;
    skill_index: number;
    ScollFns: Array<(index: number) => void>;
    SkinToggleFns: Array<(hero_name: string, skin_name: string) => void>;
    hero_info: Hero.Data;
    voice: Hero.Voice[];
    skillSelectFn: (index: number) => void;
  }
}

/** @description: 装备 */
export namespace EquipStore {
  export interface State {
    active_id: number;
    vertical_line: { top?: string; height?: string }[];
    active_array: string[];
    equipSelectFn: (() => void)[];
    synthetic_id: Equip.Synthetic[][];
    synthetic_element: { id: number; to?: number[] }[][];
    type: string;
    equip_element: { name: string; el: HTMLElement | undefined; id: number }[];
    synthetic: Equip.Synthetic;
    type_list: {
      [propName: string]: Equip.Data[][];
    };
    equip_list: Equip.Data[];
    equip_list_column: Equip.Data[][];
  }
}

/** @description: 铭文 */
export namespace EpigraphStore {
  export interface State {
    type: string;
    epigraph_list: Epigraph.Data[];
    filter_list: Epigraph.Data[];
  }
}
