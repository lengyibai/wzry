# 王者荣耀图鉴

## 前言

> 为了`2022年3月`打算统一自己的代码风格开发此项目，初期使用的是`Vue2`
>
> `2022年6月`毕业后失业期间，开始学习`Vue3+TS`，借此项目从`Vue2`转`Vue3+TS`来积累项目经验
>
> `2023年3月`后靠内推+此项目免技术面进入游戏公司，年底项目组解散再次失业
>
> 此项目拥有我最干净且保持最新的代码风格，每次风格一变，相关文件都会逐个统一风格
>
> 有最丰富的`TS`类型提示和较多的注释，没有任何冗余代码和文件，可放心浏览
>
> 可用于王者玩家获取一些比较感兴趣英雄、皮肤排名和筛选以及无水印的超清壁纸
>
> 此项目最大的缺点就是英雄的基础信息、技能信息和皮肤价格不能保证实时性，当游戏加强或削弱了某个英雄，本站不会更新
>
> 毕竟此项目更多的是面向开发者，而不是游戏玩家，数据只是为了好看，重点是代码
>
> 所以我更希望的是代码上的反馈与建议，至于页面上我希望收到的`BUG`越多越好

## 技术栈

> [Vue3](https://cn.vuejs.org)、[Typescript](https://www.tslang.cn/index.html)、[Vite4](https://vitejs.cn)、[Pinia2](https://pinia.vuejs.org)、[Vue-Router4](https://router.vuejs.org/zh)、[Axios](https://www.axios-http.cn)、[Less](https://less.bootcss.com)

## 第三方依赖

> 事件总线[mitt](https://github.com/developit/mitt)、时间库[day.js](https://dayjs.fenxianglu.cn)、多语言[vue-i18n](https://vue-i18n.intlify.dev)、工具库[lodash.js](https://www.lodashjs.com)、加密库[js-base64](https://github.com/dankogai/js-base64)

## 素材来源

英雄头像、技能图标、图片素材——[王者荣耀官网](https://pvp.qq.com)

英雄语音——[王者世界观体验站](https://pvp.qq.com/ip)

点击音效——游戏内录制视频、提取音频、截取音频

英雄封面——对`100`多个英雄的海报进行裁剪获取

技能信息——游戏内对每个英雄的详情页进行截图、识字、富文本编辑器对关键文字设置颜色

英雄基础信息——手敲

游戏装备——游戏内截图、抠图、利用深度卷积神经网络进行修复

## 数据介绍

> 此项目无数据库，无后端参与，没有向服务器发送任何增加、修改及删除的请求，一切数据存储于`json`文件中，第一次进入网页时下载`json`获取数据并写入`localStorage`，你所看到的注册登录、资料修改、设置选项，都是在本地操作
>

## 开发时间

> 此项目一直在更新优化，没有开发时间统计
