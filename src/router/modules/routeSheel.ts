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
    title: "背包",
    icon: "wzry-knapsack",
    path: "/knapsack",
    name: "knapsack",
    redirect: "",
    component: "@/layout",
    children: [
      {
        path: "",
        name: "knapsackChild",
        component: "@/views/Knapsack",
      },
    ],
  },
  {
    title: "乂宝",
    icon: "wzry-yibao",
    path: "/yibao",
    name: "yibao",
    redirect: "",
    component: "@/layout",
    children: [
      {
        path: "",
        name: "yibaoChild",
        component: "@/views/Yibao",
      },
    ],
  },
  {
    title: "夺宝",
    icon: "wzry-baoxiang",
    path: "/lottery",
    name: "lottery",
    redirect: "/lottery/hero",
    component: "@/layout",
    children: [
      {
        title: "英雄夺宝",
        icon: "wzry-yingxiong",
        path: "/lottery/hero",
        name: "heroLottery",
        component: "@/views/Lottery/Hero",
      },
      {
        title: "皮肤夺宝",
        icon: "wzry-pifu",
        path: "/lottery/skin",
        name: "skinLottery",
        component: "@/views/Lottery/Skin",
      },
    ],
  },
  {
    title: "商城",
    icon: "wzry-shop",
    path: "/shop",
    name: "shop",
    redirect: "/shop/debris",
    component: "@/layout",
    children: [
      {
        title: "道具商店",
        icon: "wzry-prop",
        path: "/shop/prop",
        name: "prop",
        component: "@/views/Shop/Prop",
      },
      {
        title: "碎片商店",
        icon: "wzry-debris",
        path: "/shop/debris",
        name: "debris",
        redirect: "/shop/debris/hero",
        children: [
          {
            title: "英雄",
            icon: "wzry-yingxiong",
            path: "/shop/debris/hero",
            name: "heroDebris",
            component: "@/views/Shop/Debris/Hero",
          },
          {
            title: "皮肤",
            icon: "wzry-pifu",
            path: "/shop/debris/skin",
            name: "skinDebris",
            component: "@/views/Shop/Debris/Skin",
          },
        ],
      },
      {
        title: "水晶商店",
        icon: "wzry-crystal",
        path: "/shop/crystal",
        name: "crystal",
        redirect: "/shop/crystal/king",
        children: [
          {
            title: "王者水晶",
            icon: "wzry-king",
            path: "/shop/crystal/king",
            name: "kingCrystal",
            component: "@/views/Shop/Crystal/King",
          },
          {
            title: "荣耀水晶",
            icon: "wzry-honor",
            path: "/shop/crystal/honor",
            name: "honorCrystal",
            component: "@/views/Shop/Crystal/Honor",
          },
        ],
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
    redirect: "/system/data",
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

/** @description 路由表里是否存在当前路由地址*/
export const isExist = (path: string) => {
  return [...static_paths, ...dynamic_paths].some((item) => {
    return item.includes(path);
  });
};

/** @description 判断当前路由地址是否需要登录 */
export const isLogin = (path: string) => {
  return dynamic_paths.some((item) => {
    return item.includes(path);
  });
};
