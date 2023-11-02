# 王者荣耀图鉴

## 前言

> 因失业开发此项目，与同行一起交流与学习，无实际用途
>
> 但也可用于游戏玩家获取一些比较感兴趣皮肤排名和筛选
>
> 如英雄性别筛选、身高排名、皮肤数量排名等

## 技术栈

> [Vue3](https://cn.vuejs.org)、[Typescript](https://www.tslang.cn/index.html)、[Vite4](https://vitejs.cn)、[Pinia2](https://pinia.vuejs.org)、[Vue-Router4](https://router.vuejs.org/zh)、[Axios](https://www.axios-http.cn)、[Less](https://less.bootcss.com)

## 第三方依赖

> 事件总线[mitt](https://github.com/developit/mitt)、富文本编辑器[wangeditor](https://www.wangeditor.com)、时间库[Day.js](https://dayjs.fenxianglu.cn)、多语言[vue-i18n](https://vue-i18n.intlify.dev)

## 项目内截图

![0](https://lyb.cbb.plus//wzry-material/html/0.png)![0](https://lyb.cbb.plus//wzry-material/html/1.png)![0](https://lyb.cbb.plus//wzry-material/html/2.png)![0](https://lyb.cbb.plus//wzry-material/html/3.png)![0](https://lyb.cbb.plus//wzry-material/html/4.png)![0](https://lyb.cbb.plus//wzry-material/html/5.png)![0](https://lyb.cbb.plus//wzry-material/html/6.png)![0](https://lyb.cbb.plus//wzry-material/html/7.png)![0](https://lyb.cbb.plus//wzry-material/html/8.png)

## 素材来源

> 英雄头像、技能图标、图片素材——[王者荣耀官网](https://pvp.qq.com)
>
> 英雄语音——[王者世界观体验站](https://pvp.qq.com/ip)
>
> 游戏音乐——网易云音乐
>
> 点击音效——游戏内录制视频、提取音频、截取音频
>
> 英雄封面——对`100`多个英雄的海报进行裁剪获取
>
> 技能信息——游戏内对每个英雄的详情页进行截图、识字、富文本编辑器对关键文字的设置颜色
>
> 英雄信息——手敲，并整合所有类型
>
> 游戏装备——游戏内截图、抠图、AI修复

## 项目介绍

> 此项目无数据库，无后端参与，一切数据存储于`json`文件中，将`json`文件托管至服务器，只存在文件的`get`请求
>
> 注册、登录、设置、用户信息等数据都存在于`localStorage`，只能在当前浏览器使用
>

## 数据下载

> 英雄：基础数据，头像，信息，技能列表，技能类型，技能效果，皮肤，皮肤类型，关系
>
> 信息：职业，定位，特长，时期，阵营，种族
>
> 杂项：装备，装备合成表，装备类型，装备效果，铭文，铭文类型，铭文效果

## 主要功能

### 动态路由

> 1、当用户登录后，通过判断用户权限，获取该权限的路由表，再将其转换为真实的路由，通过`addRoute`循环添加路由，并存储路由`name`组
>
> 2、当用户退出后，循环`name`组，调用`removeRoute`删除路由

### 路由权限

> 1、未登录状态访问需要登录的路由，跳转`/403`，提示需要登录访问
>
> 2、未登录状态访问不存在的路由，跳转`/404`，提示访问了不存在的地址
>
> 3、登录状态跳转登录页或无指定的路由地址，自动登录并重定向至主页`(/hero)`
>
> 4、登录状态跳转指定的路由地址，自动登录并跳转该路由
>
> 5、普通权限用户登录后访问需要管理员权限的路由，跳转`/403`，提示需要管理员权限访问
>
> 6、非管理员权限，隐藏系统管理
>
> 7、登录一天后过期并强制退出登录，登录三天后自动清除本地所有数据（避免一些特殊数据无法正常更新）

### 浏览器限制

> 通过获取浏览器的内核版本，当`chrome < 90`、`firefox < 90`、`safari < 15`，则跳转`/400`，提示用户升级或更换浏览器

### 版本更新

> 1、首次访问网页，会将最新版的版本号存入本地
>
> 2、更新分为页面（版本）更新和数据（版本）更新
>
> 3、页面版本更新用于手动对浏览器刷新以清除浏览器缓存
>
> 4、每次访问页面，通过本地版本号与远程版本号进行比对
>
> 5、当版本小于远程版本，如果是文件版本，则直接弹出弹窗显示更新日志，要求重启网页
>
> 6、当版本小于远程版本，如果是数据版本，则后台请求数据接口与本地数据进行比对，收集差异文件，并将差异文件进行更新、生成更新日志并弹出更新弹窗
