import type { RouterSheel } from "../interface";
import { getPathsNames } from "../helper/getSheelPath";

import { static_paths } from "./staticRouter";

/** @description 用户路由 */
export const user: RouterSheel[] = [
  {
    title: "英雄",
    icon: "wzry-yingxiong",
    path: "/hero",
    name: "hero",
    redirect: "",
    component: "@/layout",
    children: [
      {
        path: "",
        name: "heroChild",
        component: "@/views/Hero",
      },
    ],
  },
  {
    title: "皮肤",
    icon: "wzry-pifu",
    path: "/skin",
    name: "skin",
    redirect: "",
    component: "@/layout",
    children: [
      {
        path: "",
        name: "skinChild",
        component: "@/views/Skin",
      },
    ],
  },
  {
    title: "图集",
    icon: "wzry-atlas",
    path: "/savor",
    name: "savor",
    redirect: "",
    component: "@/layout",
    children: [
      {
        path: "",
        name: "savorChild",
        component: "@/views/Savor",
      },
    ],
  },
  {
    title: "装备",
    icon: "wzry-zhuangbei",
    path: "/equip",
    name: "equip",
    redirect: "",
    component: "@/layout",
    children: [
      {
        path: "",
        name: "equipChild",
        component: "@/views/Equip",
      },
    ],
  },
  {
    title: "铭文",
    icon: "wzry-mingwen",
    path: "/epigraph",
    name: "epigraph",
    redirect: "",
    component: "@/layout",
    children: [
      {
        path: "",
        name: "epigraphChild",
        component: "@/views/Epigraph",
      },
    ],
  },
  {
    title: "夺宝",
    icon: "wzry-liwu",
    path: "/seize-treasures",
    name: "seizeTreasures",
    redirect: "",
    component: "@/layout",
    children: [
      {
        path: "",
        name: "seizeTreasuresChild",
        component: "@/views/SeizeTreasures",
      },
    ],
  },
];

/** @description 管理员路由 */
export const admin: RouterSheel[] = [
  ...user,
  {
    title: "系统管理",
    path: "/system",
    name: "system",
    redirect: "/system/add",
    component: "@/layout",
    icon: "wzry-xitongguanli",
    children: [
      {
        title: "本地数据管理",
        icon: "wzry-database",
        path: "/system/data",
        name: "data",
        component: "@/views/System/views/Data",
      },
    ],
  },
];

/** @description 动态路由path组 */
const dynamic_paths: string[] = getPathsNames(admin)[0];

/** @description 路由表里是否存在该路径 */
export const isExist = (path: string) => {
  return [...static_paths, ...dynamic_paths].some((item) => {
    return item.includes(path);
  });
};

/** @description 判断是否需要登录 */
export const isLogin = (path: string) => {
  return dynamic_paths.some((item) => {
    return item.includes(path);
  });
};
