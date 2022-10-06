/**
 * noVerify 不需要登录验证
 */
import Layout from '@/layout/index.vue';

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/:error*',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/Base/NotFound/index.vue'),
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      noVerify: true,
      hidden: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/Base/Login/index.vue'),
  },
  {
    path: '/home',
    component: Layout,
    redirect: '',
    meta: {
      title: '主页',
      icon: 'HOME',
    },
    children: [
      {
        path: '',
        meta: {
          title: '主页',
          icon: 'HOME',
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Base/Home/index.vue'),
      },
    ],
    leftHidden: true,
  },
  {
    path: '/hero',
    component: Layout,
    redirect: '',
    meta: {
      title: '英雄',
      icon: 'HERO',
    },
    children: [
      {
        path: '',
        meta: {
          title: '英雄',
          icon: 'HERO',
        },
        component: () => import(/* webpackChunkName: "profession" */ '@/views/Hero/index.vue'),
      },
    ],
  },
  {
    path: '/equip',
    component: Layout,
    redirect: '',
    meta: {
      title: '装备',
      icon: 'EQUIP',
    },
    children: [
      {
        path: '',
        meta: {
          title: '装备',
          icon: 'EQUIP',
        },
        component: () => import(/* webpackChunkName: "category" */ '@/views/Equip/index.vue'),
      },
    ],
  },
  {
    path: '/epigraph',
    component: Layout,
    redirect: '',
    meta: {
      title: '铭文',
      icon: 'EPIGRAPH',
    },
    children: [
      {
        path: '',
        meta: {
          title: '铭文',
          icon: 'EPIGRAPH',
        },
        component: () => import(/* webpackChunkName: "epigraph" */ '@/views/Epigraph/index.vue'),
      },
    ],
    leftHidden: true,
  },
  {
    path: '/System',
    component: Layout,
    redirect: '/System/add',
    meta: {
      title: '系统管理',
      icon: 'SYSTEM',
    },
    children: [
      {
        path: '/System/add',
        component: () => import(/* webpackChunkName: "system/add" */ '@/views/System/childViews/Add/index.vue'),
        meta: {
          title: '添加',
          icon: 'ADD',
        },
      },
      {
        path: '/System/edit',
        component: () => import(/* webpackChunkName: "system/skin" */ '@/views/System/childViews/Edit/index.vue'),
        meta: {
          title: '编辑',
          icon: 'EDIT',
        },
      },
      {
        path: '/System/delete',
        component: () => import(/* webpackChunkName: "system/equip" */ '@/views/System/childViews/Delete/index.vue'),
        meta: {
          title: '删除',
          icon: 'DELETE',
        },
      },
    ],
    leftHidden: true,
  },
];
