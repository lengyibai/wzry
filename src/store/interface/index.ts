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
    hero_info: Hero.Data;
  }
}

/** @description: 英雄信息 */
export namespace HeroAttrStore {
  export interface State {
    skinType: Hero.SkinType[];
  }
}

/** @description: 装备 */
export namespace EquipStore {
  export interface State {
    active_id: number;
    type: string;
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
