import { RouterSheel } from "@/router/interface";
export const user: RouterSheel[] = [
  {
    title: "主页",
    icon: "wzry-zhuye",
    path: "/home",
    name: "home",
    redirect: "",
    leftHidden: true,
    component: "@/layout",
    children: [
      {
        path: "",
        name: "homeChild",
        component: "@/views/Base/Home",
      },
    ],
  },
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
        title: "删除",
        icon: "wzry-lajitong",
        path: "/System/delete",
        name: "delete",
        component: "@/views/System/childViews/Delete",
      },
    ],
  },
];

export const errorRoute = {
  path: "/:error*",
  name: "error",
  redirect: "/404",
};
