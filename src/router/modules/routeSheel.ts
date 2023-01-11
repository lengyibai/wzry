import { RouterSheel } from "../interface";
import { static_paths } from "./staticRouter";
import getSheelPath from "../helper/getSheelPath";

/** @description: 用户路由 */
export const user: RouterSheel[] = [
  // {
  //   title: "主页",
  //   icon: "wzry-zhuye",
  //   path: "/home",
  //   name: "home",
  //   redirect: "",
  //   leftHidden: true,
  //   component: "@/layout",
  //   children: [
  //     {
  //       path: "",
  //       name: "homeChild",
  //       component: "@/views/Base/Home",
  //     },
  //   ],
  // },
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
    leftHidden: true,
    component: "@/layout",
    children: [
      {
        path: "",
        name: "epigraphChild",
        component: "@/views/Epigraph",
      },
    ],
  },
];

/** @description: 管理员路由 */
export const admin: RouterSheel[] = [
  ...user,
  {
    title: "系统管理",
    path: "/system",
    name: "system",
    redirect: "/System/add",
    leftHidden: true,
    component: "@/layout",
    icon: "wzry-xitongguanli",
    children: [
      {
        title: "添加",
        icon: "wzry-addcircle",
        path: "/System/add",
        name: "add",
        component: "@/views/System/childViews/Add",
      },
      {
        title: "编辑",
        icon: "wzry-bianji",
        path: "/System/edit",
        name: "edit",
        component: "@/views/System/childViews/Edit",
      },
      {
        title: "本地数据管理",
        icon: "wzry-database",
        path: "/System/data",
        name: "data",
        component: "@/views/System/childViews/Data",
      },
    ],
  },
];

/** @description: 动态路由path组 */
const dynamic_paths: string[] = getSheelPath(admin)[0];

/** @description: 路由表里是否存在该路径 */
export const isExist = (path: string) => [
  [...static_paths, ...dynamic_paths].indexOf(path) !== -1,
  dynamic_paths.indexOf(path) !== -1,
];
